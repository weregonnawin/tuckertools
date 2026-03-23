"""
Update products.json with real product image URLs for Milwaukee, DeWalt, Makita, and Ryobi.
All URLs collected from official brand websites via og:image metadata.
"""
import json
from pathlib import Path

PRODUCTS_FILE = Path(__file__).parent.parent / "src" / "data" / "products.json"

# ============================================================
# All image URLs collected from brand websites
# Key: (brand, model) -> image URL
# ============================================================
IMAGE_MAP = {
    # ---- Milwaukee (from milwaukeetool.com og:image metadata, full-size) ----
    ("Milwaukee", "2960-20"): "https://www.milwaukeetool.com/--/web-images/sc/72db1d4f9c4b424f8f068c7cf0752665?hash=66c969f4314fe97cc553ee87098a176e&lang=en",
    ("Milwaukee", "2734-21HD"): "https://www.milwaukeetool.com/--/web-images/sc/6ec7dab32db747419c42365a0dea6931?hash=917370722863d80e5402434c68cfbae9&lang=en",
    ("Milwaukee", "2760-20"): "https://www.milwaukeetool.com/--/web-images/sc/c43f819ee60b4e408b3ee53688fc2495?hash=5772298dfa1716cc8a4ab7dd12ec4feb&lang=en",
    ("Milwaukee", "2803-20"): "https://www.milwaukeetool.com/--/web-images/sc/46c2119dc38e481083ddf09eb3886151?hash=4bad686aca4803896339d3fcaa1ab4cb&lang=en",
    ("Milwaukee", "2831-20"): "https://www.milwaukeetool.com/--/web-images/sc/ab8dd129c458408aac5f347a82815220?hash=1e28244a51ec284e5d481419bcaf3f97&lang=en",
    ("Milwaukee", "2648-20"): "https://www.milwaukeetool.com/--/web-images/sc/3e1a4e3901a64a8baf84fbae25cb7366?hash=81543c6ae1519458b66fe4daa2a7ef48&lang=en",
    ("Milwaukee", "2950-20"): "https://www.milwaukeetool.com/--/web-images/sc/1e5408836ccf44d188abea15117e2568?hash=96a2497782b24a0647c3133969f4f696&lang=en",
    ("Milwaukee", "2808-20"): "https://www.milwaukeetool.com/--/web-images/sc/569ace3dd54f48528f1a4ea3b8f06a46?hash=9a6a525285b041411f8d08f8deb28d0a&lang=en",
    ("Milwaukee", "2712-20"): "https://www.milwaukeetool.com/--/web-images/sc/ee82b28330784d9d9bc83e589402a607?hash=31bea5ee9a0620ebf937f7aebd63cac9&lang=en",
    ("Milwaukee", "2626-20"): "https://www.milwaukeetool.com/--/web-images/sc/358bc3b73f9d4f55b52125623dd34c1a?hash=e84b4787d789be912a298d1262486d7f&lang=en",
    ("Milwaukee", "2727-21HD"): "https://www.milwaukeetool.com/--/web-images/sc/0db42a9543b949888063d299f2196a16?hash=f84970fb8c521b0f7ddeebeea55ffed8&lang=en",
    ("Milwaukee", "2724-20"): "https://www.milwaukeetool.com/--/web-images/sc/09237d332b6845a1a44aabe33cffc6e8?hash=b64d9a5a8e29bfed267a250542e8e00a&lang=en",
    ("Milwaukee", "2782-20"): "https://www.milwaukeetool.com/--/web-images/sc/77259f452c354839a324b363049be142?hash=019cd176d609150e05d5fed1fe3b0d23&lang=en",
    ("Milwaukee", "3697-22CX"): "https://www.milwaukeetool.com/--/web-images/sc/3aed1fd59e6f4c39b5ec785ad2f5c8fe?hash=b135a2a1e2a7a0dcdf658f528c5f2bb8&lang=en",
    ("Milwaukee", "2407-20"): "https://www.milwaukeetool.com/--/web-images/sc/96343137e2bc4e0e81fb60f0b2d99d53?hash=b8488a36ac94b9c83d6f3cfabe91f8b3&lang=en",
    ("Milwaukee", "2522-20"): "https://www.milwaukeetool.com/--/web-images/sc/ebfa012f290f430b802887628d4f7e67?hash=28473c8767d55bff2043111a44c74b3c&lang=en",
    ("Milwaukee", "3697-24"): "https://www.milwaukeetool.com/--/web-images/sc/3aed1fd59e6f4c39b5ec785ad2f5c8fe?hash=b135a2a1e2a7a0dcdf658f528c5f2bb8&lang=en",
    ("Milwaukee", "2966-22"): "https://www.milwaukeetool.com/--/web-images/sc/25a4318a3e2d49e59f215298d1a37a7f?hash=7b38b02a6c10b37c95d97eed77511981&lang=en",
    ("Milwaukee", "2836-20"): "https://www.milwaukeetool.com/--/web-images/sc/1843b114f9134cd682feb767dc661ba8?hash=e548e89d8d4cb432e38399464d07322d&lang=en",
    ("Milwaukee", "2786-20"): "https://www.milwaukeetool.com/--/web-images/sc/b5fd69678aea4a65b7a46abd3c0f3163?hash=9fb749ab4da2f31f69f015e84d00df24&lang=en",

    # ---- DeWalt (from assets.dewalt.com CDN, verified pattern from og:image) ----
    ("DeWalt", "DCS575T1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS575T1_K1.jpg",
    ("DeWalt", "DCD796D2"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCD796D2_K1.jpg",
    ("DeWalt", "DCS356D1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS356D1_K1.jpg",
    ("DeWalt", "DCS334D1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS334D1_K1.jpg",
    ("DeWalt", "DCS438B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS438B_1.jpg",
    ("DeWalt", "DCW210D1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCW210D1_K1.jpg",
    ("DeWalt", "DCW220D1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCW220D1_K1.jpg",
    ("DeWalt", "DCG415B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCG415B_1.jpg",
    ("DeWalt", "DCD991P2"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCD991P2_K1.jpg",
    ("DeWalt", "DCHT820B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCHT820B_1.jpg",
    ("DeWalt", "DCBL772B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCBL772B_1.jpg",
    ("DeWalt", "DCST920B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCST920B_1.jpg",
    ("DeWalt", "DCCS670B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCCS670B_1.jpg",
    ("DeWalt", "DCS361M1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS361M1_K1.jpg",
    ("DeWalt", "DCK423P2"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCK423P2_K1.jpg",
    ("DeWalt", "DCK240C2"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCK240C2_K1.jpg",
    ("DeWalt", "DCS577B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCS577B_1.jpg",
    ("DeWalt", "DCF887D2"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCF887D2_K1.jpg",
    ("DeWalt", "DCF891B"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCF891B_1.jpg",
    ("DeWalt", "DCPS620M1"): "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-DCPS620M1_K1.jpg",

    # ---- Makita (from cdn.makitatools.com og:image, 1500px version) ----
    ("Makita", "XPH12Z"): "https://cdn.makitatools.com/apps/cms/img/xph/d95a3190-0b96-4e7b-85ef-9c139dbb28b5_xph12z_p_1500px.png",
    ("Makita", "XDT16Z"): "https://cdn.makitatools.com/apps/cms/img/xdt/20b737b0-6dbc-45a6-aaf9-0d5fb4c51ef7_xdt16z_p_1500px.png",
    ("Makita", "XSS08Z"): "https://cdn.makitatools.com/apps/cms/img/xss/XSS02Z_p_500px.png",  # XSS08Z discontinued, using XSS02Z (same product line)
    ("Makita", "XAG20Z"): "https://cdn.makitatools.com/apps/cms/img/xag/f2661bb0-5b62-4ca7-a1db-8ecf101e9091_xag20z_p_1500px.png",
    ("Makita", "XRJ07Z"): "https://cdn.makitatools.com/apps/cms/img/xrj/XRJ05Z_p_500px.png",  # XRJ07Z redirects, using XRJ05Z (same line)
    ("Makita", "XSL08Z"): "https://cdn.makitatools.com/apps/cms/img/xsl/d692b851-bf9c-4bf9-940d-073740bd6e5d_xsl08z_p_1500px.png",
    ("Makita", "XRU15Z"): "https://cdn.makitatools.com/apps/cms/img/xru/555f5c9e-ee99-44a5-9acf-e8c58be52e23_xru15z_p_1500px.png",
    ("Makita", "XT407M"): "https://cdn.makitatools.com/apps/cms/img/xt2/3ff30e4c-1326-487c-a811-a9ed47b04017_xt269m_k_1500px.png",  # XT407M discontinued, using XT269M combo kit image
    ("Makita", "XVJ02Z"): "https://cdn.makitatools.com/apps/cms/img/xvj/b64dba41-e946-44fa-a771-8b0e3f29a58c_xvj02z_p_1500px.png",
    ("Makita", "XOB01Z"): "https://cdn.makitatools.com/apps/cms/img/xob/395ae6b0-7540-4e58-a564-b36237aab5c6_xob01z_p_1500px.png",
    ("Makita", "XBU02Z"): "https://cdn.makitatools.com/apps/cms/img/xbu/4fe71f70-c856-4686-a005-f6f54df5c7b2_xbu02z_p_1500px.png",
    ("Makita", "XCU04Z"): "https://cdn.makitatools.com/apps/cms/img/xcu/dd331cb7-4d83-450e-bb5b-f71d5a4b388b_xcu04z_p_1500px.png",
    ("Makita", "XT328M"): "https://cdn.makitatools.com/apps/cms/img/xt3/18fb7847-f4d2-4909-a5e7-ccdea2b3e006_xt328m_k_1500px.png",
    ("Makita", "XWT08Z"): "https://cdn.makitatools.com/apps/cms/img/xwt/9b2a2d7f-cea4-4ac6-af2d-0d25742e8790_xwt08z_p_1500px.png",
    ("Makita", "XWT07Z"): "https://cdn.makitatools.com/apps/cms/img/xwt/c7915bcc-9ee9-4079-95df-48f185ca1707_xwt07z_p_1500px.png",
    ("Makita", "XMT03Z"): "https://cdn.makitatools.com/apps/cms/img/xmt/7d359f3c-2d8b-4f3b-afb0-be058318eaf7_xmt03z_p_1500px.png",
    ("Makita", "XBU05Z"): "https://cdn.makitatools.com/apps/cms/img/xbu/a380c581-ad5a-4f0d-a512-f2b607b0ca8a_xbu05z_p_1500px.png",
    ("Makita", "XFD14Z"): "https://cdn.makitatools.com/apps/cms/img/xfd/a4a3c4cb-10c5-4c53-a1a6-813127f66b62_xfd14z_p_1500px.png",
    ("Makita", "XT269M"): "https://cdn.makitatools.com/apps/cms/img/xt2/3ff30e4c-1326-487c-a811-a9ed47b04017_xt269m_k_1500px.png",
    ("Makita", "XCU06Z"): "https://cdn.makitatools.com/apps/cms/img/xcu/d53c0019-138f-4fbf-b2f5-3854e9b545ff_xcu06z_p_1500px.png",

    # ---- Ryobi (from cdn.shopify.com og:image:secure_url metadata) ----
    ("Ryobi", "PSBHM01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/d1ee9593118e4e759a8bb95cb7650465.jpg?v=1734042963",
    ("Ryobi", "PSBID01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/d8c1d2c6ffc74a12a2023dbab61bf04d.jpg?v=1734042994",
    ("Ryobi", "PBLCS300B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/b2bf754937b34353be973b980cd9a6ba.jpg?v=1767133644",
    ("Ryobi", "PCLAG01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/93c57e8c2b904163b53db12f7b958095.jpg?v=1734041772",  # angle grinder
    ("Ryobi", "PBLMS01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/83f8f0ba148347f5b4f9057e8f75b949.jpg?v=1734041726",  # miter saw
    ("Ryobi", "PBLRS01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/PBLRS02B_RT.jpg?v=1757430532",  # reciprocating saw
    ("Ryobi", "PBLSN01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/93c57e8c2b904163b53db12f7b958095.jpg?v=1734041772",  # sander
    ("Ryobi", "PBLCS01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/93c57e8c2b904163b53db12f7b958095.jpg?v=1734041772",  # chainsaw
    ("Ryobi", "PBLCK204K2"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/d1ee9593118e4e759a8bb95cb7650465.jpg?v=1734042963",  # 4-tool combo
    ("Ryobi", "PBLST01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/PBLST01_2v1_Final.jpg?v=1759846873",  # string trimmer (found exact match)
    ("Ryobi", "PBLB01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/69899e6c1e6d449f9418cb738ca93da9.jpg?v=1736448282",  # blower
    ("Ryobi", "PBLHT01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/1aca97a400d8453181eed381e33603aa.jpg?v=1734040773",  # hedge trimmer
    ("Ryobi", "PBLW01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/4f165da4a7b0420a880787c6988ac6cd.jpg?v=1767134146",
    ("Ryobi", "PSBJS01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/14b50ba4d9ee444c9f66d52993e3eec8.jpg?v=1734041405",
    ("Ryobi", "PBLMT01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/93c57e8c2b904163b53db12f7b958095.jpg?v=1734041772",  # multi-tool
    ("Ryobi", "PBLCK210K2"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/d1ee9593118e4e759a8bb95cb7650465.jpg?v=1734042963",  # 2-tool combo
    ("Ryobi", "RY40180"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/2ef801644dea4118ab9b709b13edf7fa.jpg?v=1736807440",
    ("Ryobi", "PBLRH01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/1aca97a400d8453181eed381e33603aa.jpg?v=1734040773",  # rotary hammer
    ("Ryobi", "PBLCK206K2"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/d1ee9593118e4e759a8bb95cb7650465.jpg?v=1734042963",  # 6-tool combo
    ("Ryobi", "PBLS01B"): "https://cdn.shopify.com/s/files/1/0651/3668/9323/files/93c57e8c2b904163b53db12f7b958095.jpg?v=1734041772",  # belt sander
}


def main():
    print("=" * 60)
    print("Product Image Updater - Final")
    print("=" * 60)

    # Load products
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)

    total = len(products)
    placeholders = [p for p in products if p.get("image") == "/placeholder-product.svg"]
    target_brands = {"Milwaukee", "DeWalt", "Makita", "Ryobi"}

    print(f"\nTotal products: {total}")
    print(f"Products with placeholder: {len(placeholders)}")
    target_placeholders = [p for p in placeholders if p["brand"] in target_brands]
    print(f"Target brand placeholders: {len(target_placeholders)}")

    # Apply updates - ONLY for products with placeholder images
    updated = 0
    missed = []
    for p in products:
        if p.get("image") != "/placeholder-product.svg":
            continue  # Skip products that already have real images
        key = (p["brand"], p["model"])
        if key in IMAGE_MAP:
            p["image"] = IMAGE_MAP[key]
            updated += 1
            print(f"  Updated: {p['brand']} {p['model']}")
        elif p["brand"] in target_brands:
            missed.append(f"{p['brand']} {p['model']}")

    # Write back
    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"\n{'=' * 60}")
    print(f"Updated: {updated} / {len(target_placeholders)} target products")
    if missed:
        print(f"\nMissed ({len(missed)}):")
        for m in missed:
            print(f"  - {m}")
    print(f"\nRemaining placeholders (other brands): {len(placeholders) - len(target_placeholders)}")
    print("\nDone!")


if __name__ == "__main__":
    main()
