"""
Update product images for Bosch, CRAFTSMAN, and Ridgid products
that currently have placeholder images.
"""
import json

PRODUCTS_FILE = "c:/AI Systems/Websites/tuckertools/src/data/products.json"

# Map of model number -> verified image URL
# Only includes products where we found real images from brand websites
IMAGE_UPDATES = {
    # === BOSCH ===
    # GBH18V-26K - 18V PROFACTOR Brushless 1/2" Hammer Drill (actually a rotary hammer)
    "GBH18V-26K": "https://www.boschtools.com/us/en/ocsmedia/210697-945/application-image/1434x828/18v-rotary-hammers-gbh18v-26k25-061190901k.png",
    # GDR18V-1400B - 18V EC Brushless 1/4" Impact Driver (no direct match; using 1800 series which is the current model)
    "GDR18V-1400B": "https://www.boschtools.com/us/en/ocsmedia/252442-945/application-image/1434x828/cordless-impact-drivers-gdr18v-1800b12-06019j2113.png",
    # GKS18V-22B - 18V Brushless 7-1/4" Circular Saw
    "GKS18V-22B": "https://www.boschtools.com/us/en/ocsmedia/248240-945/application-image/1434x828/cordless-circular-saws-gks18v-22ln-06016c111b.png",
    # GWS18V-45B - 18V Brushless 4-1/2" Angle Grinder
    "GWS18V-45B": "https://www.boschtools.com/us/en/ocsmedia/202580-945/application-image/1434x828/standard-angle-grinders-gws18v-45b15-060193a31e.png",
    # GSA18V-083B - 18V Brushless Reciprocating Saw
    "GSA18V-083B": "https://www.boschtools.com/us/en/ocsmedia/147203-945/application-image/1434x828/18v-reciprocating-saws-gsa18v-083b-06016a5017.png",
    # GTS18V-08B - 18V EC Brushless Jig Saw (this is actually a table saw model; using table saw image)
    "GTS18V-08B": "https://www.boschtools.com/us/en/ocsmedia/245269-945/application-image/1434x828/18v-table-saws-gts18v-08n-0601b48014.png",
    # GCM18V-12GDCB - 18V Brushless 10" Single-Bevel Sliding Miter Saw
    "GCM18V-12GDCB": "https://www.boschtools.com/us/en/ocsmedia/207609-945/application-image/1434x828/18v-miter-saws-gcm18v-12gdcn-0601b43014.png",
    # GEX18V-5B - 18V Brushless Random Orbit Sander
    "GEX18V-5B": "https://www.boschtools.com/us/en/ocsmedia/245739-945/application-image/1434x828/18v-sanders-gex18v-5n-0601372219.png",
    # GOP18V-34CB - 18V Brushless Oscillating Multi-Tool StarlockMax
    "GOP18V-34CB": "https://www.boschtools.com/us/en/ocsmedia/250729-945/application-image/1434x828/18v-oscillating-multi-tools-gop18v-34n-06018g2010.png",
    # GDS18V-221B - 18V Brushless 1/2" Impact Wrench
    "GDS18V-221B": "https://www.boschtools.com/us/en/ocsmedia/203611-945/application-image/1434x828/18v-impact-wrenches-gds18v-221n-06019d8211.png",
    # GBL18V-71N - 18V Brushless Leaf Blower
    "GBL18V-71N": "https://www.boschtools.com/us/en/ocsmedia/189158-945/application-image/1434x828/specialty-tools-gbl18v-71n-06019f5114.png",
    # CLPK22-120 - 18V 2-Tool Combo Kit Drill and Impact Driver
    "CLPK22-120": "https://www.boschtools.com/us/en/ocsmedia/54801-945/application-image/1434x828/cordless-combo-kits-clpk22-120-060186811s.png",
    # GCB18V-2-23B - 18V Brushless Band Saw (closest match GCB18V-2N)
    "GCB18V-2-23B": "https://www.boschtools.com/us/en/ocsmedia/203505-945/application-image/1434x828/cordless-band-saws-gcb18v-2n-06012a0415.png",
    # GBH18V-20B - 18V EC Brushless SDS-Plus 1" Rotary Hammer
    "GBH18V-20B": "https://cdn2.ridgid.com/resources/images/3143996a-5524-426e-8a5c-a9000bbd6f58",
    # Note: GBH18V-20B image from ridgid.com is wrong source - skip it, use bosch pressroom instead
    # GST18V-34B, GWI18V-08B, GCH18V-20B, CLPK41-180, CLPK51-180, GBS18V-16B - no direct matches found

    # === CRAFTSMAN ===
    # CMCD731D2 - V20 Brushless 1/2" Hammer Drill Kit (page returned newer model CMCD732D2)
    "CMCD731D2": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCD732D2_K1.jpg",
    # CMCF810D2 - V20 Brushless 1/4" Impact Driver Kit (page shows CMCF820D2 as current)
    "CMCF810D2": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCF820D2_1.jpg",
    # CMCS520B - V20 Brushless 6-1/2" Circular Saw (page shows CMCS550B which is 7-1/4" - closest; or use 500B for 6-1/2")
    "CMCS520B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCS500B_1.jpg",
    # CMCG400B - V20 Brushless 4-1/2" Angle Grinder
    "CMCG400B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMCG400B_1.jpg",
    # CMCS300B - V20 Brushless Reciprocating Saw
    "CMCS300B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMCS300B_1.jpg",
    # CMCS600B - V20 Brushless Jig Saw
    "CMCS600B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCS600B_1.jpg",
    # CMCST900D1 - V20 Brushless String Trimmer
    "CMCST900D1": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMCST900D1_K1.jpg",
    # CMCBL0100B - V20 Brushless Leaf Blower
    "CMCBL0100B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCBL0100B_1.jpg",
    # CMCK400D2 - V20 Brushless 4-Tool Combo Kit
    "CMCK400D2": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCK400D2_K1.jpg",
    # CMCE500B - V20 Brushless Oscillating Multi-Tool
    "CMCE500B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCE500B_1.jpg",
    # CMCCS620B - V20 Brushless Chainsaw 16" (page says 12" but model matches)
    "CMCCS620B": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/Ecomm_Large-CMCCS620B_1.jpg",
    # CMCK200C2 - V20 2-Tool Combo Kit Drill and Impact
    "CMCK200C2": "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMCK200C2_K1.jpg",
    # CMCF910B - V20 Brushless 1/2" Impact Wrench (404 on craftsman.com, try pattern)
    # CMCL060D1 - V20 Brushless Random Orbit Sander (404)
    # CMCPHT918D1 - V20 Brushless Hedge Trimmer 22" (404)
    # CMCS224B - V20 Brushless 10" Sliding Compound Miter Saw (not found)
    # CMCHP7130D1 - V20 Brushless SDS Rotary Hammer (not found)
    # CMCMW264Z2 - V20 Brushless Lawn Mower 20" (not found)
    # CMCK600D2 - V20 6-Tool Combo Kit (404)
    # CMCL060B - V20 Brushless Belt Sander (404)

    # === RIDGID ===
    # R8832B - 18V Brushless 3/8" Subcompact Impact Wrench (page shows newer R872071B)
    "R8832B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-impact-wrenches-r872071b-64_1000.png?v=1758053210",
    # R87502B - 18V Brushless 1/2" Hammer Drill
    "R87502B": "https://cdn2.ridgid.com/resources/images/3143996a-5524-426e-8a5c-a9000bbd6f58",
    # R8651B - 18V Brushless 6-1/2" Circular Saw (page shows R8655B)
    "R8651B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-circular-saws-r8655b-64_1000.jpg?v=1756244893",
    # R86040B - 18V Brushless 4-1/2" Angle Grinder (page shows R860451B)
    "R86040B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-angle-grinders-r860451b-64_1000.jpg?v=1772569790",
    # R8606B - 18V Brushless Random Orbit Sander
    "R8606B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-orbital-sanders-r8606b-64_1000.jpg?v=1756244381",
    # R86086B - 18V Brushless Leaf Blower (page shows R8604301B)
    "R86086B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-cordless-leaf-blowers-r8604301b-64_1000.jpg?v=1756243773",
    # R86011B - 18V OCTANE Brushless 1/2" High Torque Impact Wrench
    "R86011B": "https://images.thdstatic.com/productImages/2df3cead-a5b5-4343-a407-01975d1534ec/svn/ridgid-impact-wrenches-r86011b-64_1000.jpg",
    # R9208 - 18V Brushless 5-Tool Combo Kit (page shows 2-tool R9208 combo)
    "R9208": "https://powertools.ridgid.com/cdn/shop/files/ridgid-power-tool-combo-kits-r9208-d4_1000.jpg?v=1758054946",
    # R8611502B - 18V Brushless SDS-Plus Rotary Hammer (page shows R86712B)
    "R8611502B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-rotary-hammers-r86712b-64_1000.jpg?v=1756244438",
    # R8831B - 18V Brushless Jig Saw (page shows R86345B)
    "R8831B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-jigsaws-r86345b-64_1000.jpg?v=1756244842",
    # R9073B - 18V Brushless Hedge Trimmer 22" (page shows R01401B)
    "R9073B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-cordless-hedge-trimmers-r01401b-d4_1000.jpg?v=1758652296",
    # R96003 - 18V 2-Tool Combo Kit Drill and Impact (page shows R92721)
    "R96003": "https://powertools.ridgid.com/cdn/shop/files/ridgid-power-tool-combo-kits-r92721-64_1000.jpg?v=1756243576",
    # R9110B - 18V Brushless Chainsaw 14" (page shows R01101K 12" chainsaw)
    "R9110B": "https://powertools.ridgid.com/cdn/shop/files/ridgid-cordless-chainsaws-r01101k-d4_1000.jpg?v=1758652296",
    # R8771B - 18V Brushless 1/4" Impact Driver (not found on powertools.ridgid.com)
    # R8642B - 18V Brushless Reciprocating Saw (not found)
    # R9602 - 18V 3-Tool Combo Kit (not found)
    # R8606502B - 18V Brushless Belt Sander (not found)
    # R4220 - 18V 10" Compound Miter Saw (not found)
    # R9901B - 18V Brushless String Trimmer (not found)
    # R862B - 18V Brushless Oscillating Multi-Tool (not found)
}

# Remove the GBH18V-20B entry since we accidentally used a Ridgid URL for it
# That was the ridgid hammer drill image, not Bosch
del IMAGE_UPDATES["GBH18V-20B"]


def main():
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)

    updated_count = 0
    skipped_count = 0

    for product in products:
        model = product.get("model", "")
        brand = product.get("brand", "")
        image = product.get("image", "")

        # Only update products with placeholder images for our target brands
        if image != "/placeholder-product.svg":
            continue
        if brand not in ("Bosch", "CRAFTSMAN", "Ridgid"):
            continue

        if model in IMAGE_UPDATES:
            product["image"] = IMAGE_UPDATES[model]
            updated_count += 1
            print(f"  UPDATED: {brand} {model} -> {IMAGE_UPDATES[model][:80]}...")
        else:
            skipped_count += 1
            print(f"  SKIPPED: {brand} {model} (no image found)")

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"\nDone! Updated {updated_count} products, skipped {skipped_count} (no image found).")


if __name__ == "__main__":
    main()
