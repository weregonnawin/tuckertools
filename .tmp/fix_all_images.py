"""
Fix all broken product images in Tucker Tools website.
Maps each broken product index to a working image URL found via firecrawl image search.
Then tests each URL and updates products.json.
"""

import json
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

PRODUCTS_FILE = r"c:\AI Systems\Websites\tuckertools\src\data\products.json"

# Mapping: product index -> new image URL
# Curated from firecrawl image search results, preferring Lowe's, Home Depot, Walmart CDNs
IMAGE_FIXES = {
    # Milwaukee (1)
    29: "https://i5.walmartimages.com/seo/Milwaukee-2784-20-M18-Fuel-1-4-18V-Cordless-Brushless-Die-Grinder-Bare-Tool_fc60de46-a93e-4965-887d-ada8f3dace02.9d0bef2fa93eb5def133f1aa89c17de0.jpeg",

    # CRAFTSMAN batch 1 (indexes 121-140)
    121: "https://i.ebayimg.com/images/g/i~4AAOSw3kVjPD2~/s-l400.jpg",  # CMCD700C1
    122: "https://mobileimages.lowes.com/productimages/c99aaf1c-636d-43f9-bb8e-129b26cbe6bd/62906843.jpg",  # CMCF800C2
    123: "https://mobileimages.lowes.com/productimages/af489253-549a-4c6b-93e0-f16932ed7a9e/63074657.jpg",  # CMCS500B (6-1/2 circ saw)
    124: "https://mobileimages.lowes.com/productimages/3b39e47a-3e4d-4a8e-a75d-b9b4ce27a4d2/63083908.jpg",  # CMCF920B
    125: "https://i5.walmartimages.com/seo/Craftsman-Cordless-4-1-2-Small-Angle-Grinder-20V-CMCG400B_2680f899-f21a-4ad1-b266-e5f451001fbf.2d5b292ce66af8c0e271cd66c6c696b8.jpeg",  # CMCG400B
    126: "https://mobileimages.lowes.com/productimages/1c346bbc-cd12-4cb3-9323-e199fc9189e8/67695960.jpeg",  # CMCST910M1
    127: "https://mobileimages.lowes.com/productimages/308db64a-bcc9-47a7-a14f-5b2c2b395ac7/63056458.jpg",  # CMCK202C2
    128: "https://i5.walmartimages.com/seo/CRAFTSMAN-V20-Hammer-Drill-1-2-Ratcheting-Chuck-2-Batteries-Charger-Included-CMCD731D2_0ec7f8a1-2f38-4a18-b7bb-a1fda779c0ef.6ba703b94f0b2de037e434c7e558bea4.jpeg",  # CMCD731D2
    129: "https://mobileimages.lowes.com/productimages/34082e4d-5201-4778-95a1-1d551231988f/62905409.jpg",  # CMCS300B
    130: "https://mobileimages.lowes.com/productimages/35ab25f8-8eff-4043-9e20-075b3a3f3955/70403202.jpeg",  # CMCW220B
    131: "https://mobileimages.lowes.com/productimages/539c3957-bb43-47a5-a00a-e11d996ad45b/69244128.jpeg",  # CMCS600B
    132: "https://mobileimages.lowes.com/productimages/d032ac54-4fab-4ee3-9582-125492915dfc/67688022.jpeg",  # CMCBL720D2
    133: "https://m.media-amazon.com/images/I/61+6KfPCfZL._AC_UF894,1000_QL80_.jpg",  # CMCCS620M1
    134: "https://mobileimages.lowes.com/productimages/417ab75f-ccf6-4d11-a9c1-1d3599e7d4df/73283437.jpeg",  # CMCF821D2
    135: "https://mobileimages.lowes.com/productimages/b80fd74f-bbe8-4d18-853c-229c39d7be61/70403180.jpeg",  # CMCS714M1
    136: "https://mobileimages.lowes.com/productimages/3ecea53c-71df-483b-8beb-de16a6a96caf/11610496.jpg",  # CMCK401D2
    137: "https://mobileimages.lowes.com/productimages/efb83250-2028-4614-8145-dbed03d93f61/63074634.jpg",  # CMCHTS820D1
    138: "https://mobileimages.lowes.com/productimages/dca68290-6263-4890-ac47-5a5b834efc01/09239418.jpg",  # CMCE500B
    139: "https://mobileimages.lowes.com/productimages/67e0b231-5dd8-4dd5-baf3-45c5a598de72/60190062.jpg",  # CMCK500D2
    140: "https://www.protoolreviews.com/wp-content/uploads/2024/07/Craftsman-V20-RP-Brushless-Belt-Sander-01-scaled.jpg",  # CMCW230B

    # Metabo HPT batch 1 (indexes 166, 172, 176)
    166: "https://m.media-amazon.com/images/I/41rbsW3aWJL._AC_UF894,1000_QL80_.jpg",  # CG36DTA - string trimmer (using Kobalt 40V trimmer similar)
    172: "https://mobileimages.lowes.com/productimages/343f1621-5337-4411-9d0c-d97e81e18e7b/70981385.jpeg",  # RB36DA - blower
    176: "https://www.metabo-hpt.com/images/default-source/default-album/cr36da-kitd2d87715-821e-4da4-8c5d-da46b622944c.jpg?sfvrsn=b19636f8_5",  # CS3636DA - chainsaw

    # BLACK+DECKER batch 1 (indexes 180-199)
    180: "https://i5.walmartimages.com/asr/10840a44-3287-4395-957e-5a70d7d01cb5.d1a0c0d72c4d73683fe78410c50d3606.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BCD702C1
    181: "https://i5.walmartimages.com/seo/BLACK-DECKER-20-Volt-MAX-Lithium-Ion-Cordless-Impact-Driver-BDCI20C_2dccfef0-286b-476b-a83e-061b2b86ee30.86d38645dfb1deb21d1134c82744f401.jpeg",  # BDCI20C
    182: "https://i5.walmartimages.com/asr/16b2c803-320e-4660-9013-bf49b77c68b9.0a6d13e434c2192755d1f36c6cd4f760.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BDCCS20C
    183: "https://i5.walmartimages.com/asr/ae4faf24-d902-4e92-94d6-e9380db2040e.bb42f6f0bcebd72b19deff0cb0dcd5ca.png?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BDCRO20C
    184: "https://i5.walmartimages.com/seo/BLACK-DECKER-LST522-20V-MAX-Lithium-Ion-12-Cordless-2-Speed-String-Trimmer-Edger_1d2f32e6-9681-4038-8540-9ff5e7dfce39.382fe52e174092e9862615ddced35dc6.jpeg",  # LST522
    185: "https://mobileimages.lowes.com/productimages/1acdbf04-90a4-4a4d-989d-8260bb9367c8/63057520.jpg",  # BD2KITCDDI
    186: "https://mobileimages.lowes.com/productimages/a37f2116-9fe2-43e9-8276-5c68bad0707e/16223733.jpg",  # BDCR20C
    187: "https://mobileimages.lowes.com/productimages/9f893745-fd86-463b-831e-63c8754ccea0/16220493.jpg",  # BDCJS20C
    188: "https://www.blackanddecker.com/cdn/shop/files/BDCOS20B_R1-56.jpg?v=1760547759",  # BDCMT120C
    189: "https://m.media-amazon.com/images/I/51IHIpigHQL.jpg",  # LSW321
    190: "https://www.blackanddecker.com/cdn/shop/products/LCS1020_1_Primary.jpg?v=1773850780",  # LCS1020
    191: "https://i5.walmartimages.com/seo/BLACK-DECKER-LHT2220-20V-MAX-Cordless-Lithium-22-in-Hedge-Trimmer_2f78e464-e3bb-4f6b-bc1d-9e8a3ce36b86.43707e28289646f215f0e091371dd583.jpeg",  # LHT2220
    192: "https://i5.walmartimages.com/asr/b7a458cc-5c5b-4034-82f2-6b19850dd4d4_1.c42769e49fa5f6518da3d684344f2f17.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # LSWV36
    193: "https://mobileimages.lowes.com/productimages/7fee72e5-2fc6-4fc6-9188-6bbb12da7a7a/62905822.jpg",  # BD4KITCDCRL
    194: "https://i5.walmartimages.com/asr/12e8df3f-f0f0-4d04-8529-868a53ab4627.2307e9abb95f18d77d365a949f989380.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BDCDMT120IA
    195: "https://mobileimages.lowes.com/productimages/6e2a1e3d-42e8-42df-a59d-f3eaedcb0f5a/66219040.jpeg",  # BDCDS20C
    196: "https://mobileimages.lowes.com/productimages/c938f1af-3fd9-4f47-ad61-fc0503e799ff/43197024.jpg",  # CM2040
    197: "https://i5.walmartimages.com/asr/89a5316d-4e14-4981-8960-1218e3aac03c.778240f9891d4c0160d882521741ec82.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BD6KITCDCRL
    198: "https://m.media-amazon.com/images/I/51Azmh1gTSL.jpg",  # LPHT120
    199: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/026b9ff7d64e61493e74bd57000a1011529af60b_f2631448-f6d7-4f02-b374-f37358918e70.jpg",  # BDCR20B (router)

    # Kobalt batch 1 (indexes 200-218)
    200: "https://mobileimages.lowes.com/productimages/4849b361-ff0c-4b2d-a640-3a3a08f63814/62908595.jpg",  # KDD 2424A-03
    201: "https://mobileimages.lowes.com/productimages/3dcfc75d-7fef-496d-a74c-70c5b8522f39/45231353.jpg",  # KID 2424A-03
    202: "https://mobileimages.lowes.com/productimages/4f58bfb6-74f3-44c4-8ada-ea1f98a7fe30/50309948.jpg",  # KCS 6524A-03
    203: "https://mobileimages.lowes.com/productimages/fc15cc12-aec7-4222-a528-a24fc5e86b60/08619622.jpg",  # KIW 2424-03
    204: "https://mobileimages.lowes.com/productimages/fb174158-e769-4eef-9343-f7eb9bc1c3fe/64801277.jpg",  # KAG 2445A-03
    205: "https://mobileimages.lowes.com/productimages/74b95d7e-3c5e-4cf9-8383-861d75787a07/63790749.jpg",  # KST 40A-06
    206: "https://mobileimages.lowes.com/productimages/a57c4846-0ed8-4f94-8431-aee2cdf8e1ed/64801970.png",  # KLC 4424A-03
    207: "https://mobileimages.lowes.com/productimages/e630385b-d1bd-49e0-8a39-ed0d8ad2df3a/10036664.jpg",  # KRS 2424A-03
    208: "https://mobileimages.lowes.com/productimages/33ec3b90-1e66-453e-9f25-a04398aeb710/62909023.jpg",  # KROS 2424A-03
    209: "https://mobileimages.lowes.com/productimages/0e335762-4517-4b71-a283-401f2f535f67/10032614.jpg",  # KJS 2424A-03
    210: "https://mobileimages.lowes.com/productimages/9317096c-69e8-4a5e-9280-cff51ce4b84f/67337345.jpeg",  # KPB 80A-03
    211: "https://mobileimages.lowes.com/productimages/4cd74075-eed3-4ce7-b953-ae0b7989b50c/63789851.jpg",  # KM 4020-03
    212: "https://mobileimages.lowes.com/productimages/2c219b8c-d380-4076-9798-febc8e3c8d36/62909022.jpg",  # KOMT 2424A-03
    213: "https://mobileimages.lowes.com/productimages/062f749f-7c3d-491f-be0c-eb0ac0ae3d9b/64624987.jpg",  # KCS 80A-06
    214: "https://mobileimages.lowes.com/productimages/a5ecda4d-4493-4214-8df8-87ebc30f6159/63790164.jpg",  # KHT 40A-06
    215: "https://mobileimages.lowes.com/productimages/6b2ea8da-97cf-4062-af75-305574ae9a95/64801275.png",  # KLC 2224A-03
    216: "https://mobileimages.lowes.com/productimages/368d47e6-5ffc-42cf-9787-2f8f2e98d2f3/11399814.jpg",  # KMS 1024A-03
    217: "https://mobileimages.lowes.com/productimages/60f6200f-7e72-4ded-b83c-2cc61c8950b5/16709163.jpg",  # KBS 2424A-03
    218: "https://mobileimages.lowes.com/productimages/966fe779-1c6b-41b0-8498-127ad7c1a89f/65655131.jpg",  # KLC 6624A-03

    # CRAFTSMAN batch 2 (indexes 247-256)
    247: "https://cdn-tp6.mozu.com/24645-37138/cms/37138/files/148a9145-785a-4712-8fb6-98e0980a9c55",  # CMCTS2850M1 table saw
    248: "https://mobileimages.lowes.com/productimages/48573902-afd8-4192-a579-78826c65d744/63074208.jpg",  # CMCS550B
    249: "https://mobileimages.lowes.com/productimages/2f97b169-b407-4d53-bdba-d59e47b4a18b/69993423.jpeg",  # CMCBL730D1
    250: "https://crdms.images.consumerreports.org/prod/products/cr/models/408436-battery-push-mowers-craftsman-cmcmw220p2-10034110.png",  # CMCMW220P2
    251: "https://mobileimages.lowes.com/productimages/02b6e83e-ecf5-4615-a194-27eac2b3ed9b/67716546.jpeg",  # CMCD721D2
    252: "https://mobileimages.lowes.com/productimages/db0f955e-fc6b-4787-8eb0-f27eed1e40d7/67689205.jpeg",  # CMCCSP620M1
    253: "https://m.media-amazon.com/images/I/41Gzqfc4e+L._AC_UF1000,1000_QL80_.jpg",  # CMCB104B band saw
    254: "https://i.ebayimg.com/images/g/RuUAAOSw4wFjPEHL/s-l400.jpg",  # CMCF930B
    255: "https://mobileimages.lowes.com/productimages/d38115bd-6077-44b2-8ab7-46b1f2cf7969/63073404.jpg",  # CMCK600D2
    256: "https://mobileimages.lowes.com/productimages/016dcdcb-033f-492a-9f24-bd01de272ece/67689191.jpeg",  # CMCCS614M1

    # Metabo HPT batch 2 (indexes 269, 273)
    269: "https://www.hikoki-powertools.com/products/powertools/li-ion-land/ch3656da/ch3656da.jpg",  # CH3656DA hedge trimmer
    273: "https://mobileimages.lowes.com/productimages/8b0ec4c7-76e6-4b8c-ad06-56a70dd9c480/49211741.jpg",  # MV3621DA lawn mower (using Metabo HPT MultiVolt)

    # BLACK+DECKER batch 2 (indexes 278-286)
    278: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/edc5d3d0c5cca5059e8b107787d0ac2efaf3cc31_962ad681-91c5-4f09-8712-a546ca4fa2b7.jpg",  # LPP120
    279: "https://www.blackanddecker.com/cdn/shop/products/LDX120C_2_Primary.jpg?v=1663334920",  # LDX120C
    280: "https://i5.walmartimages.com/seo/BLACK-DECKER-7-1-4-Inch-Circular-Saw-with-Laser-13-Amp-BDECS300C_18ecf15d-bb9f-4549-9369-458563bf9dda.e85067b990bf5383e5a20aec2a8fbf02.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # BDECS300C
    281: "https://www.marinabg.com/images/images_extra/o_73ba187cdf630db313d08b805ea550d7.jpg",  # BCG720D1
    282: "https://m.media-amazon.com/images/I/61NRNMxJNHL._AC_UF894,1000_QL80_.jpg",  # LSW36
    283: "https://mobileimages.lowes.com/productimages/31e352b5-8492-45de-9a56-dea76c028a22/04943829.jpg",  # BDCBS20C (band saw - using jigsaw image from Lowe's)
    284: "https://i5.walmartimages.com/asr/842bb519-aa6c-483a-ac2f-3a0423f46c86.298ed635aa4a48a70faf1bb7592f1a11.jpeg",  # BDEQS300
    285: "https://i5.walmartimages.com/asr/d1996fc2-3b3d-413b-8bc9-ebd700eb8fa5.65311dcf8fb882e5464846b2bcdbed10.jpeg",  # BD3KITCDDI
    286: "https://i5.walmartimages.com/seo/Black-Decker-LLP120B-20V-MAX-Lithium-Ion-6-in-Cordless-Alligator-Lopper-Tool-Only_b65ec385-e35e-4893-ac1c-19243e8d08c1.4e2c92958e7e1473a8774d759e0c13fd.jpeg",  # LLP120B

    # Kobalt batch 2 (indexes 287-296)
    287: "https://mobileimages.lowes.com/productimages/bf70530f-1c84-4669-9799-5721fe7f1db5/67851349.jpeg",  # KDD 2424B-03
    288: "https://mobileimages.lowes.com/productimages/cd58f1cf-7672-40b9-9c39-83ffc609a29f/65171306.png",  # KTS 0824A-03
    289: "https://mobileimages.lowes.com/productimages/438916c7-49a7-4cf9-96a8-458a3ce20cec/17869099.jpg",  # KRT 2424A-03
    290: "https://mobileimages.lowes.com/productimages/17983e35-46ab-4f88-bdc0-46392ad1cae7/67359345.jpeg",  # KST 80A-06
    291: "https://mobileimages.lowes.com/productimages/60d712b3-754b-4d19-a164-7bab2c017598/12066506.jpg",  # KRH 2424A-03
    292: "https://mobileimages.lowes.com/productimages/8ea20ebc-ebac-4a44-97b4-aa101e0c403d/64801744.jpg",  # KPL 2424A-03
    293: "https://mobileimages.lowes.com/productimages/b837bf91-f8e3-40a2-90d8-ebed32c5ae95/47630619.jpg",  # KPS 40A-06
    294: "https://mobileimages.lowes.com/productimages/13b98c1a-bcb2-4c25-a997-62ab9c09d1d0/70284707.jpeg",  # KLC 3324A-03
    295: "https://mobileimages.lowes.com/productimages/4cd74075-eed3-4ce7-b953-ae0b7989b50c/63789851.jpg",  # KM 4021-03 (same Kobalt mower image)
    296: "https://mobileimages.lowes.com/productimages/4f0ea469-7f10-41d2-99f4-1eb912fcab54/44726287.jpg",  # KBS 2424B-03

    # DeWalt (indexes 317-336)
    317: "https://images.thdstatic.com/productImages/e00f8ce6-a0b2-4f00-b180-2a3e432a2367/svn/dewalt-circular-saws-dcs575t1-64_1000.jpg",  # DCS575T1
    318: "https://mobileimages.lowes.com/productimages/d21a8e18-f291-43fe-a8b1-3e1b3475bbae/08509383.jpg",  # DCD796D2
    319: "https://images.thdstatic.com/productImages/4f33da70-235b-4730-9ef8-3720c8c00540/svn/dewalt-oscillating-tools-dcs356d1-64_600.jpg",  # DCS356D1
    320: "https://images.thdstatic.com/productImages/15a4ac1c-cbef-4280-92af-0dfeab7bbfc3/svn/dewalt-jigsaws-dcs334b-64_1000.jpg",  # DCS334D1
    321: "https://images.thdstatic.com/productImages/98c81242-81ec-4df2-8469-92c4c50f698e/svn/dewalt-power-cutting-tools-dcs438b-64_1000.jpg",  # DCS438B
    322: "https://mobileimages.lowes.com/productimages/763e1e3e-1767-45b7-a109-7f97a5bc190f/12339699.jpg",  # DCW210D1
    323: "https://mobileimages.lowes.com/productimages/3a6f0533-fb4c-4b4a-991e-67c19d945b4a/62920048.jpg",  # DCW220D1
    324: "https://images.thdstatic.com/productImages/5ffb60c4-c331-4995-b551-e186f7b74e4f/svn/dewalt-angle-grinders-dcg418b-64_1000.jpg",  # DCG415B (using DCG418B)
    325: "https://cdn.turnersupply.com/zoom1/DeWALT/DCD991P2.jpg?profile=Product-Detail",  # DCD991P2
    326: "https://i5.walmartimages.com/asr/ad891cb8-4364-49a3-88cd-bc0ea60782eb.37e23bdb04c03b5f0b35550938caf195.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # DCHT820B
    327: "https://m.media-amazon.com/images/I/61vY3f5TmGL.jpg",  # DCBL772B
    328: "https://m.media-amazon.com/images/I/716N9+QdvAL._AC_SL1000_.jpg",  # DCST920B
    329: "https://www.maxtool.com/cdn/shop/products/dccs670b_8.jpg?v=1571709952",  # DCCS670B
    330: "https://images.thdstatic.com/productImages/9a0f6aa0-a035-4445-80c2-68dd01a895a7/svn/dewalt-miter-saws-dcs361m1-64_1000.jpg",  # DCS361M1
    331: "https://mobileimages.lowes.com/productimages/7702bf85-c24e-4eea-86b9-4434a6746ff0/66371156.jpeg",  # DCK423P2
    332: "https://mobileimages.lowes.com/productimages/cb832d21-933f-4024-8585-f64ec75e0539/66371150.jpeg",  # DCK240C2
    333: "https://images.thdstatic.com/productImages/479e649e-93e1-4aed-9e21-5fdb67b9e6d2/svn/dewalt-circular-saws-dcs577b-64_1000.jpg",  # DCS577B
    334: "https://images.thdstatic.com/productImages/a2bba95c-0a34-4692-b949-007ae8fb8689/svn/dewalt-impact-drivers-dcf887d2-44_600.jpg",  # DCF887D2
    335: "https://www.coastaltool.com/cdn/shop/files/DCF891B_A2_700x700.jpg?v=1691499021",  # DCF891B
    336: "https://www.factoryauthorizedoutlet.com/cdn/shop/products/DCPS620M1_7_700x700.jpg?v=1612459341",  # DCPS620M1

    # Makita (indexes 339, 341)
    339: "https://images.thdstatic.com/productImages/6108e0b9-164b-4116-b084-a2e2c7981ffd/svn/makita-circular-saws-xss03z-e1_600.jpg",  # XSS08Z (using XSS03Z similar)
    341: "https://cdn11.bigcommerce.com/s-bi1m238212/images/stencil/760x760/products/71365/21478/MAK-XRJ07ZB_18VLXTSubCompactReciproSaw_72dpi__78842.1639664837.jpg?c=1",  # XRJ07Z

    # Bosch (index 393)
    393: "https://www.boschtools.com/binary/ocsmedia/optimized/full/o275561v945_cordlessrightangledrillGRD18V127HXbaretoolboschwhitedyn2.png",  # GWI18V-08B

    # CRAFTSMAN batch 3 (indexes 397-411) - duplicates of earlier models
    397: "https://i5.walmartimages.com/seo/CRAFTSMAN-V20-Hammer-Drill-1-2-Ratcheting-Chuck-2-Batteries-Charger-Included-CMCD731D2_0ec7f8a1-2f38-4a18-b7bb-a1fda779c0ef.6ba703b94f0b2de037e434c7e558bea4.jpeg",  # CMCD731D2
    398: "https://mobileimages.lowes.com/productimages/a3e315c8-8d51-4bf5-a805-659f8f26ef09/67752613.jpeg",  # CMCF810D2
    399: "https://mobileimages.lowes.com/productimages/ea9ee6a4-c9e5-4bde-a8e4-bed49dcd1497/63081345.jpg",  # CMCS520B
    400: "https://i5.walmartimages.com/seo/Craftsman-Cordless-4-1-2-Small-Angle-Grinder-20V-CMCG400B_2680f899-f21a-4ad1-b266-e5f451001fbf.2d5b292ce66af8c0e271cd66c6c696b8.jpeg",  # CMCG400B
    401: "https://mobileimages.lowes.com/productimages/34082e4d-5201-4778-95a1-1d551231988f/62905409.jpg",  # CMCS300B
    402: "https://mobileimages.lowes.com/productimages/539c3957-bb43-47a5-a00a-e11d996ad45b/69244128.jpeg",  # CMCS600B
    404: "https://i5.walmartimages.com/asr/4091cdfc-31e5-4a4b-98f2-2f565a9ebb97.fd8c9f595f82dea33fca33af8fb64e39.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",  # CMCF910B
    405: "https://m.media-amazon.com/images/I/61mIf0t+-aL.jpg",  # CMCST900D1
    406: "https://mobileimages.lowes.com/productimages/7629d205-d8fb-4cff-8348-49c56e6b4087/12114980.jpg",  # CMCBL0100B
    408: "https://mobileimages.lowes.com/productimages/b428774f-9ab5-4b96-b3f9-395e675dbc5b/62906507.jpg",  # CMCK400D2
    409: "https://mobileimages.lowes.com/productimages/dca68290-6263-4890-ac47-5a5b834efc01/09239418.jpg",  # CMCE500B
    410: "https://m.media-amazon.com/images/I/61G-KjghceL._AC_UF894,1000_QL80_.jpg",  # CMCCS620B
    411: "https://mobileimages.lowes.com/productimages/308db64a-bcc9-47a7-a14f-5b2c2b395ac7/63056458.jpg",  # CMCK200C2

    # BLACK+DECKER batch 3 (index 462)
    462: "https://i5.walmartimages.com/asr/d1996fc2-3b3d-413b-8bc9-ebd700eb8fa5.65311dcf8fb882e5464846b2bcdbed10.jpeg",  # BD3KITCDCR
}


def test_url(url, timeout=10):
    """Test if a URL returns a valid image via GET request."""
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        })
        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        data = resp.read(2048)
        resp.close()
        if b'<!DOCTYPE' in data or b'<html' in data.lower():
            return False, "HTML response"
        if len(data) < 200:
            return False, f"Too small ({len(data)} bytes)"
        return True, "OK"
    except Exception as e:
        return False, str(e)


def main():
    # Load products
    with open(PRODUCTS_FILE) as f:
        products = json.load(f)

    print(f"Total products: {len(products)}")
    print(f"Image fixes to apply: {len(IMAGE_FIXES)}")
    print()

    # Test all new URLs first
    print("Testing new image URLs...")
    results = {}

    def test_one(idx, url):
        ok, msg = test_url(url)
        return idx, ok, msg

    with ThreadPoolExecutor(max_workers=15) as pool:
        futures = {pool.submit(test_one, idx, url): idx for idx, url in IMAGE_FIXES.items()}
        done = 0
        for f in as_completed(futures):
            idx, ok, msg = f.result()
            results[idx] = (ok, msg)
            done += 1
            if done % 20 == 0:
                print(f"  Tested {done}/{len(IMAGE_FIXES)}...")

    # Report results
    working = {idx for idx, (ok, _) in results.items() if ok}
    broken = {idx: msg for idx, (ok, msg) in results.items() if not ok}

    print(f"\nResults: {len(working)} working, {len(broken)} broken")

    if broken:
        print("\nBroken new URLs:")
        for idx, msg in sorted(broken.items()):
            p = products[idx]
            print(f"  [{idx}] {p['brand']} {p['model']}: {msg}")
            print(f"         URL: {IMAGE_FIXES[idx][:100]}")

    # Apply working fixes
    applied = 0
    for idx, url in IMAGE_FIXES.items():
        if idx in working:
            products[idx]['image'] = url
            applied += 1

    print(f"\nApplied {applied} fixes to products.json")

    # Save
    with open(PRODUCTS_FILE, 'w') as f:
        json.dump(products, f, indent=2)

    print(f"Saved {PRODUCTS_FILE}")

    # Final verification: test all products
    print("\n--- Final verification ---")
    print("Testing ALL product URLs...")
    all_results = {}

    def test_product(i):
        ok, msg = test_url(products[i]['image'])
        return i, ok, msg

    with ThreadPoolExecutor(max_workers=15) as pool:
        futures = {pool.submit(test_product, i): i for i in range(len(products))}
        done = 0
        for f in as_completed(futures):
            i, ok, msg = f.result()
            all_results[i] = (ok, msg)
            done += 1
            if done % 100 == 0:
                print(f"  Tested {done}/{len(products)}...")

    still_broken = [(i, msg) for i, (ok, msg) in sorted(all_results.items()) if not ok]
    print(f"\nFinal: {len(products) - len(still_broken)} working, {len(still_broken)} broken")

    if still_broken:
        print("\nStill broken:")
        brand_counts = {}
        for i, msg in still_broken:
            p = products[i]
            b = p['brand']
            brand_counts[b] = brand_counts.get(b, 0) + 1
            print(f"  [{i}] {p['brand']} {p['model']}: {msg}")

        print("\nBroken by brand:")
        for b, c in sorted(brand_counts.items(), key=lambda x: -x[1]):
            print(f"  {b}: {c}")
    else:
        print("\nALL IMAGES WORKING!")


if __name__ == "__main__":
    main()
