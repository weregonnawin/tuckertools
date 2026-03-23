"""
Batch 3: Update placeholder images for Metabo HPT, BLACK+DECKER, and Kobalt products.
Only updates products where image == "/placeholder-product.svg".
"""

import json
import os

PRODUCTS_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json")

# Map: model number -> image URL (only verified official sources)
IMAGE_UPDATES = {
    # ===== METABO HPT =====
    # WH18DBDL2 - 18V Triple Hammer Impact Driver
    "WH18DBDL2": "https://www.metabo-hpt.com/images/default-source/default-album/b07nmmb7lr-side-no-nc.jpg?sfvrsn=1da1cbc7_3",
    # C18DBAL - 18V Circular Saw
    "C18DBAL": "https://www.metabo-hpt.com/images/default-source/product-images/c18dbalq4---hero-image-angle.jpeg?sfvrsn=e41cf2da_4",
    # G18DBSL - 18V Angle Grinder (using the brushless angle grinder image from metabo-hpt.com)
    "G18DBSL": "https://www.metabo-hpt.com/images/default-source/product-images/metabo-hpt-g18dbalq4-angle-2.jpeg?sfvrsn=57b811ff_2",
    # CR18DAP4 - 18V Reciprocating Saw
    "CR18DAP4": "https://www.metabo-hpt.com/images/default-source/product-images/cr18dbq4-side.jpeg?sfvrsn=f3fce4a5_0",
    # DV18DBXL - 18V Hammer Drill (using DV18DBL2 image - same product line)
    "DV18DBXL": "https://www.metabo-hpt.com/images/default-source/product-images/dv18dbl2-metabo-hpt-angle.jpeg?sfvrsn=d65bf7dd_2",
    # CJ18DBAL - 18V Jig Saw
    "CJ18DBAL": "https://www.metabo-hpt.com/images/default-source/product-images/cordless-jig-saw-kit.jpeg?sfvrsn=db5ce7b4_0",
    # CG18DBAL - 18V String Trimmer - NO official image found, skip
    # KC18DSAL - 18V 4-Tool Combo Kit
    "KC18DSAL": "https://www.metabo-hpt.com/images/default-source/product-images/kc18ddx4s-kit-high-(002).jpeg?sfvrsn=deae1368_2",
    # RB18DSAL - 18V Leaf Blower
    "RB18DSAL": "https://www.metabo-hpt.com/images/default-source/default-album/rb18dcq4.jpg?sfvrsn=d84e6586_1",
    # WR18DBDL2 - 18V Impact Wrench
    "WR18DBDL2": "https://www.metabo-hpt.com/images/default-source/product-images/wr18dbdl2q4-side-opt.jpeg?sfvrsn=38c5535f_0",
    # SV18DAL - 18V Random Orbit Sander
    "SV18DAL": "https://www.metabo-hpt.com/images/default-source/product-images/sv1813daq4-side95d8a38878656e40a3ccff00003019ae.jpeg?sfvrsn=7652f355_2",
    # CV18DAL - 18V Oscillating Multi-Tool
    "CV18DAL": "https://www.metabo-hpt.com/images/default-source/default-album/cv18dblq4-q5-side-high-web.jpg?sfvrsn=8fd8c5f1_3",
    # CS18DAL - 18V Chainsaw - NO official image found, skip
    # KC18DDBL2S - 18V 2-Tool Combo Kit
    "KC18DDBL2S": "https://www.metabo-hpt.com/images/default-source/product-images/impact-and-hammer-drill-kit.jpeg?sfvrsn=5ea2b7bd_2",
    # CH18DAL - 18V Hedge Trimmer - NO official image found, skip
    # CB18DAL - 18V Band Saw
    "CB18DAL": "https://www.metabo-hpt.com/images/default-source/product-images/cb18dblp4-metabo-hpt-angle.jpeg?sfvrsn=7df0d656_2",
    # SB18DAL - 18V Belt Sander
    "SB18DAL": "https://www.metabo-hpt.com/images/default-source/product-images/sb3608daq4-angle.jpeg?sfvrsn=a42e129d_0",
    # KC18DSAL6 - 18V 6-Tool Combo Kit - no exact match found, skip
    # DH18DAL - 18V SDS Plus Rotary Hammer
    "DH18DAL": "https://www.metabo-hpt.com/images/default-source/product-images/dh18dblq4-metabo-hpt-side.jpeg?sfvrsn=bc372deb_4",
    # WR36DC34 - 36V 3/4" Impact Wrench
    "WR36DC34": "https://www.metabo-hpt.com/images/default-source/product-images/wr36daq4_side.jpeg?sfvrsn=b6c7b244_4",

    # ===== BLACK+DECKER =====
    # BDCDD220C - 20V Drill/Driver (using Lowes official product image)
    "BDCDD220C": "https://mobileimages.lowes.com/productimages/227f6cf5-ed83-4364-97bf-7a3d3e7784a4/63058270.jpg",
    # BDCR20B2 - 20V Reciprocating Saw (note: model in data is BDCR20B2, product page is BDCR20B)
    "BDCR20B2": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/026b9ff7d64e61493e74bd57000a1011529af60b_f2631448-f6d7-4f02-b374-f37358918e70.jpg",
    # BDCCS20B - 20V Circular Saw
    "BDCCS20B": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/7e95f4ef6debf7b13ef21c865964308eab76e938_91f0fbe9-0d53-4533-9741-a385f05ca539.jpg",
    # BDCID20B - 20V Impact Driver (actual model on B+D site is BDCI20B)
    "BDCID20B": "https://www.blackanddecker.com/cdn/shop/products/BDCI20B_R1-01.png?v=1675719309",
    # LST300D1 - 20V String Trimmer (LST300 on site)
    "LST300D1": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/a07f2a32897d65011891425fbc41ddcfbcf10967_942a0bc5-e930-4597-996c-5a5d216c9b8d.jpg",
    # BD3KITCDCR - 20V 3-Tool Combo Kit - no exact match found, skip
    # BDCL20B - 20V Work Light - no exact product match found, skip
    # BDCCS30C - 20V Screwdriver - no match found, skip
    # BDCAG4B - 20V Angle Grinder - no exact cordless match found on B+D site, skip
    # LPP120B - 20V Pole Saw
    "LPP120B": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/edc5d3d0c5cca5059e8b107787d0ac2efaf3cc31_962ad681-91c5-4f09-8712-a546ca4fa2b7.jpg",
    # BDPRTOE - 20V Rotary Tool - no exact match, skip
    # CM2043C - 40V Lawn Mower
    "CM2043C": "https://cld.accentuate.io/7827358089437/1679595602446/CM2043C_2B-2ImageFeature.png?v=1679595602446&options=",
    # BDCDHP220C - 20V Hammer Drill - no exact match found, skip
    # BDHG100B - 20V Heat Gun - no exact match found, skip
    # BD5KITCDCR - 20V 5-Tool Combo Kit - no exact match found, skip
    # BDH2000PL - 20V Wet Dry Vacuum
    "BDH2000PL": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/5e390835df504f0a727b96dad9993da52058687d_c0cfde3f-4d96-4ee6-b141-cb337ef34fd3.jpg",
    # BXDS25B - 20V Drain Snake - no match found, skip
    # BDCMT120C1 - 20V Oscillating Multi-Tool Kit
    "BDCMT120C1": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/686a0244306ac179d447174471b9d6cb5fee7a73_fdf2c52e-84b9-4466-8358-9fc09607e9b2.jpg",
    # BDCJS20C1 - 20V Jig Saw Kit
    "BDCJS20C1": "https://www.blackanddecker.com/cdn/shop/files/BDCJS20C_R1-17.jpg?v=1763489032",
    # BDCK400D1 - 20V 4-Tool Outdoor Combo Kit - no exact match found, skip

    # ===== KOBALT =====
    # KDD 0324A-03 - 24V 3/8" Compact Drill/Driver
    "KDD 0324A-03": "https://mobileimages.lowes.com/productimages/bf70530f-1c84-4669-9799-5721fe7f1db5/67851349.jpeg",
    # KJS 1524A-03 - 24V Jig Saw Kit
    "KJS 1524A-03": "https://mobileimages.lowes.com/productimages/0e335762-4517-4b71-a283-401f2f535f67/10032614.jpg",
    # KHT 2040A-06 - 40V Hedge Trimmer 22"
    "KHT 2040A-06": "https://mobileimages.lowes.com/productimages/3fb59669-e037-4b93-9332-5144bfdf74ec/64623887.jpg",
    # KST 1040A-06 - 40V String Trimmer Kit
    "KST 1040A-06": "https://mobileimages.lowes.com/productimages/6c3bf513-e0f9-405d-bac9-65fc1a99acd9/68506761.jpeg",
    # KCS 0124A-03 - 24V Circular Saw 7-1/4"
    "KCS 0124A-03": "https://mobileimages.lowes.com/productimages/8df7d6e3-9fa1-402d-83fe-31fa99923141/62909675.jpg",
    # KID 1524A-03 - 24V 1/4" Impact Driver Kit
    "KID 1524A-03": "https://mobileimages.lowes.com/productimages/630758f2-a085-4fbd-b4a3-5a81dfbe9660/68543301.png",
    # KRS 1524A-03 - 24V Reciprocating Saw Kit
    "KRS 1524A-03": "https://mobileimages.lowes.com/productimages/d3304823-9dd8-42bb-9b0f-d7d1f60efa82/62910082.jpg",
    # KLC 5524A-03 - 24V 5-Tool Combo Kit
    "KLC 5524A-03": "https://mobileimages.lowes.com/productimages/865e21a8-d3dd-4b92-b492-3162aa1c00ec/16260731.png",
    # KST 80A-06 - 80V String Trimmer
    "KST 80A-06": "https://mobileimages.lowes.com/productimages/17983e35-46ab-4f88-bdc0-46392ad1cae7/67359345.jpeg",
    # KHT 80A-06 - 80V Hedge Trimmer 26"
    "KHT 80A-06": "https://mobileimages.lowes.com/productimages/493ee3c4-e25b-4438-aa3f-684758b1e463/67359452.jpeg",
    # KAG 1545A-03 - 24V Angle Grinder Kit
    "KAG 1545A-03": "https://mobileimages.lowes.com/productimages/09075d7b-0b25-40d1-8048-dfe3b7ea137b/62909264.jpg",
    # KRH 0124A-03 - 24V Rotary Hammer
    "KRH 0124A-03": "https://mobileimages.lowes.com/productimages/c3704ff9-526c-4ad7-ba89-f680a16210e0/10967943.jpg",
    # KCS 1640A-06 - 40V Chainsaw 16"
    "KCS 1640A-06": "https://mobileimages.lowes.com/productimages/05711b86-e38e-46b7-818e-3406c07ae9b6/65416418.jpg",
    # KDD 1524A-03 - 24V 1/2" Drill/Driver Kit
    "KDD 1524A-03": "https://mobileimages.lowes.com/productimages/37de2525-9b25-4826-9c2b-48880995dfee/64801743.jpg",
    # KPB 1524A-03 - 24V Blower Kit
    "KPB 1524A-03": "https://mobileimages.lowes.com/productimages/755fae83-3283-4528-822e-4175cad577a8/16501950.jpg",
    # KM 8021-03 - 80V Self-Propelled Lawn Mower 21"
    "KM 8021-03": "https://mobileimages.lowes.com/productimages/ec567c99-ec26-40b9-87f7-8f0c553bafaf/63790868.jpg",
    # KLC 3524A-03 - 24V 3-Tool Combo Kit Pro
    "KLC 3524A-03": "https://mobileimages.lowes.com/productimages/13b98c1a-bcb2-4c25-a997-62ab9c09d1d0/70284707.jpeg",
    # KDS 0124A-03 - 24V Detail Sander
    "KDS 0124A-03": "https://mobileimages.lowes.com/productimages/68710e5c-b345-42a0-b4dc-73c5d0a677a3/64801630.png",
    # KMS 1024A-06 - 24V 10" Miter Saw Kit
    "KMS 1024A-06": "https://mobileimages.lowes.com/productimages/326c7208-de1c-44ed-bb36-9ee317f0b8d9/11399815.jpg",
    # KOMT 1524A-03 - 24V Oscillating Multi-Tool Kit
    "KOMT 1524A-03": "https://mobileimages.lowes.com/productimages/aed77374-217f-435d-a309-b9ee213a72da/65839924.jpg",
}

def main():
    # Read products
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)

    updated_count = 0
    skipped_count = 0
    target_brands = {"Metabo HPT", "BLACK+DECKER", "Kobalt"}

    for product in products:
        brand = product.get("brand", "")
        model = product.get("model", "")
        image = product.get("image", "")

        # Only update products with placeholder AND matching brands
        if brand in target_brands and image == "/placeholder-product.svg":
            if model in IMAGE_UPDATES:
                product["image"] = IMAGE_UPDATES[model]
                updated_count += 1
                print(f"  UPDATED: [{brand}] {product['name']} ({model})")
            else:
                skipped_count += 1
                print(f"  SKIPPED (no image found): [{brand}] {product['name']} ({model})")

    # Write back
    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"\nDone! Updated {updated_count} products, skipped {skipped_count} (no image found).")

if __name__ == "__main__":
    main()
