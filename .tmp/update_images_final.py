"""
Update placeholder product images in products.json with real product image URLs.
Only updates products where image == "/placeholder-product.svg".
"""
import json
import os

PRODUCTS_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json")

# Map: model number -> new image URL
IMAGE_MAP = {
    # === BOSCH ===
    "GST18V-34B": "https://www.boschtools.com/us/en/ocsmedia/275986-945/application-image/full/new-products-grt18v-40n18x-06008d0111.png",
    "CLPK41-180": "https://m.media-amazon.com/images/I/91QZF9HyviL._AC_UF894,1000_QL80_.jpg",
    "GBH18V-20B": "https://pressroom.boschtools.com/file.php/178686/GBH18V-20_hero_core.jpg?thumbnail=asset",
    "GWI18V-08B": "https://images.homedepot.ca/productimages/p_1001022735.jpg?product-images=l",
    "GCH18V-20B": "https://m.media-amazon.com/images/I/51wzDbVnB9L.jpg",
    "CLPK51-180": "https://mobileimages.lowes.com/productimages/b4faa973-662f-4ced-a124-a8db62ef282a/12061459.jpg?size=pdhism",
    "GBS18V-16B": "https://khmtools.com.ph/cdn/shop/files/bsander1.jpg?v=1772258589&width=720",

    # === CRAFTSMAN ===
    "CMCL060D1": "https://mobileimages.lowes.com/productimages/35ab25f8-8eff-4043-9e20-075b3a3f3955/70403202.jpeg",
    "CMCF910B": "https://i5.walmartimages.com/asr/4091cdfc-31e5-4a4b-98f2-2f565a9ebb97.fd8c9f595f82dea33fca33af8fb64e39.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    "CMCPHT918D1": "https://m.media-amazon.com/images/I/61+0x5OnWDL._AC_UF894,1000_QL80_.jpg",
    "CMCS224B": "https://i.ebayimg.com/images/g/x3wAAOSw4-ZjRbCm/s-l1200.jpg",
    "CMCHP7130D1": "https://mobileimages.lowes.com/productimages/736dfff4-fcea-4586-ad4c-57528fc31041/70403176.jpeg",
    "CMCMW264Z2": "https://products.blains.com/600/144/1448279-2.jpg",
    "CMCK600D2": "https://mobileimages.lowes.com/productimages/d38115bd-6077-44b2-8ab7-46b1f2cf7969/63073404.jpg",
    "CMCL060B": "https://mobileimages.lowes.com/productimages/12021f4c-6536-4821-8fcf-10ac14ade060/66277286.jpeg?size=pdhism",

    # === RIDGID ===
    "R8642B": "https://i.ebayimg.com/images/g/P1YAAOSwdhNf6c3h/s-l640.jpg",
    "R9901B": "https://images.thdstatic.com/productImages/2aa6c9be-5f2a-4ea1-92ea-7c0f6b5c8a4c/svn/ridgid-cordless-string-trimmers-r01201b-64_145.jpg",
    "R862B": "https://i.ebayimg.com/images/g/pQ0AAOSwmiFkLGkM/s-l1200.jpg",
    "R9602": "https://images.thdstatic.com/productImages/6858ac39-10b7-4c90-af74-53d653c448ff/svn/ridgid-power-tool-combo-kits-r96233-64_600.jpg",
    "R8771B": "https://images.thdstatic.com/productImages/636b80d5-b12f-485c-a70b-dbf5303deb8c/svn/ridgid-impact-drivers-r8723b-64_600.jpg",
    "R8606502B": "https://images.thdstatic.com/productImages/1d77b0d6-4e8f-4f22-95c3-22d8e5846234/svn/ridgid-belt-sanders-r86065ksbn-1f_600.jpg",
    "R4220": "https://images.thdstatic.com/productImages/8fd9aa9f-1f18-4bdd-80b6-8b3c6d548440/svn/ridgid-reciprocating-saws-r8648b-64_600.jpg",

    # === METABO HPT ===
    "CG18DBAL": "https://mobileimages.lowes.com/product/converted/717709/717709017092.jpg?size=pdhism",
    "CS18DAL": "https://www.toolnation.com/media/catalog/product/b/o/bosch_blauw_4053423352443_image_1_1.jpg?width=265&height=265&store=toolnation_en&image-type=image",
    "CH18DAL": "https://cdn11.bigcommerce.com/s-xsnp47c4d3/images/stencil/1000w/products/11263/1127/0171900d_03_1__67503.1698674314.jpg",
    "KC18DSAL6": "https://www.metabo-hpt.com/images/default-source/product-images/kc18dbfl2qf-hero844c9f8878656e40a3ccff00003019ae.jpeg?sfvrsn=5108cddc_2",

    # === BLACK+DECKER ===
    "BD3KITCDCR": "https://i5.walmartimages.com/asr/d1996fc2-3b3d-413b-8bc9-ebd700eb8fa5.65311dcf8fb882e5464846b2bcdbed10.jpeg",
    "BDCL20B": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/eff47c85f8a40cef3fc8fcb9b6733290dea0fd5d.jpg",
    "BDCCS30C": "https://www.blackanddecker.com/cdn/shop/products/BDCS30C_R1-19.png?v=1667307033",
    "BDCAG4B": "https://m.media-amazon.com/images/I/612-D4ptikL.jpg",
    "BDPRTOE": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/12ba84cf41b20c423c15c78fdbe1f819fd8d6ab5_6fb40da9-827b-49b4-9df4-e4326c2db5f9.jpg",
    "BDCDHP220C": "https://mobileimages.lowes.com/productimages/65c396ad-a59e-4845-a115-710f323c9e56/15392771.jpg?size=pdhism",
    "BDHG100B": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/03569e6b141d37ec7f57f366d13e7225eb1b3c72_65f4adba-383d-4e68-a148-99230c636066.jpg",
    "BD5KITCDCR": "https://mobileimages.lowes.com/productimages/c11d9d56-8ddd-455e-9e4f-8ed10b4c6326/15607557.jpg",
    "BXDS25B": "https://mobileimages.lowes.com/productimages/943e646f-650b-4e47-956e-825f05751f88/42337577.jpg",
    "BDCK400D1": "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/7703eb1e244d1f7f3580d3bc88cea305d43bc01b.jpg",
}


def main():
    with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
        products = json.load(f)

    updated = 0
    skipped_real = 0
    not_found = 0

    for product in products:
        model = product.get("model", "")
        current_image = product.get("image", "")

        # Only update placeholders
        if current_image != "/placeholder-product.svg":
            if model in IMAGE_MAP:
                skipped_real += 1
                print(f"  SKIP (already has real image): {model} - {product['name']}")
            continue

        if model in IMAGE_MAP:
            product["image"] = IMAGE_MAP[model]
            updated += 1
            print(f"  UPDATED: {model} - {product['name']}")
        else:
            not_found += 1
            print(f"  NOT FOUND: {model} - {product['name']}")

    with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"\n--- Summary ---")
    print(f"Updated: {updated}")
    print(f"Skipped (already real): {skipped_real}")
    print(f"Not found in map: {not_found}")

    # Verify no placeholders remain
    remaining = [p for p in products if p.get("image") == "/placeholder-product.svg"]
    print(f"Remaining placeholders: {len(remaining)}")
    if remaining:
        for p in remaining:
            print(f"  STILL PLACEHOLDER: {p['model']} - {p['name']}")


if __name__ == "__main__":
    main()
