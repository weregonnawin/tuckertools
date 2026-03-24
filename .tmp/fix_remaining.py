"""
Fix the remaining 22 broken images that failed due to Walmart 444 blocks.
Replace with Home Depot, Lowe's, Amazon, and blackanddecker.com URLs.
"""

import json
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

PRODUCTS_FILE = r"c:\AI Systems\Websites\tuckertools\src\data\products.json"

# Replacement URLs using non-Walmart sources
FIXES = {
    # Milwaukee
    29: "https://images.thdstatic.com/productImages/f19413d5-3c7a-4111-af94-0c3b8c054324/svn/milwaukee-die-grinders-2784-20-64_600.jpg",

    # CRAFTSMAN
    125: "https://mobileimages.lowes.com/productimages/92e3119e-0e60-4ea4-8697-4ceafb3d59fb/63073853.jpg",  # CMCG400B
    128: "https://mobileimages.lowes.com/productimages/4885633c-976f-4c0a-a201-a53dcff7d0b4/69265523.jpeg",  # CMCD731D2
    140: "https://mobileimages.lowes.com/productimages/68ce5b9f-7bfa-421c-9332-e8ea29dc70bf/65280338.jpg",  # CMCW230B
    397: "https://mobileimages.lowes.com/productimages/4885633c-976f-4c0a-a201-a53dcff7d0b4/69265523.jpeg",  # CMCD731D2 (dup)
    400: "https://mobileimages.lowes.com/productimages/92e3119e-0e60-4ea4-8697-4ceafb3d59fb/63073853.jpg",  # CMCG400B (dup)
    404: "https://mobileimages.lowes.com/productimages/78a09904-2c13-4d2e-ac85-7f9d1b3c942d/70054740.jpeg",  # CMCF910B

    # BLACK+DECKER
    180: "https://images.thdstatic.com/productImages/618f21a3-d527-422a-b8e1-a95e69f48589/svn/black-decker-power-drills-bcd702c1-1f_600.jpg",  # BCD702C1
    181: "https://mobileimages.lowes.com/productimages/438dffb8-9fdc-4324-b126-c2b902938159/11231174.jpg",  # BDCI20C
    182: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/7e95f4ef6debf7b13ef21c865964308eab76e938_91f0fbe9-0d53-4533-9741-a385f05ca539.jpg",  # BDCCS20C
    183: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/31085b32b985176cdb1b085436e91c002c3c0856_ef4db84c-96d6-4e8c-993e-f31de3c5b54e.jpg",  # BDCRO20C
    184: "https://images.thdstatic.com/productImages/4afe2006-1afe-4a8d-9810-dd3b1f8ab9ad/svn/black-decker-cordless-string-trimmers-lst522-4f_600.jpg",  # LST522
    191: "https://images.thdstatic.com/productImages/cb9109d9-7809-4fd0-85ca-cf5fb4555d79/svn/black-decker-cordless-hedge-trimmers-lht2220-40_600.jpg",  # LHT2220
    192: "https://m.media-amazon.com/images/I/717riYLwi3L._AC_UF894,1000_QL80_.jpg",  # LSWV36
    194: "https://images.thdstatic.com/productImages/1c2dec63-04fc-4fa3-9afd-f17fb8dcf061/svn/black-decker-power-drills-bdcdmt120c-64_1000.jpg",  # BDCDMT120IA
    197: "https://mobileimages.lowes.com/productimages/0dd0bc60-79c4-4301-a5ac-9adaf23d86c3/60978523.jpg",  # BD6KITCDCRL
    280: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/7446c18e6421c9a690086a6ba1b4dd227da50183_cf27b675-497a-4870-b407-8e9a935a5fa9.jpg",  # BDECS300C
    284: "https://cdn.shopify.com/s/files/1/0640/1409/0461/files/6a0d57ed7db43f518257b131e49060c42257fa40_92efffe5-15b3-41a6-861b-3a0d2288a960.jpg",  # BDEQS300
    285: "https://mobileimages.lowes.com/productimages/e6c1a286-3f80-4f55-afa7-b6ab84d7046a/00617576.jpg",  # BD3KITCDDI
    286: "https://images.thdstatic.com/productImages/b5be7e6e-18bb-460b-83eb-b38b3927a519/svn/black-decker-cordless-chainsaws-llp120b-a0_600.jpg",  # LLP120B
    462: "https://mobileimages.lowes.com/productimages/e6c1a286-3f80-4f55-afa7-b6ab84d7046a/00617576.jpg",  # BD3KITCDCR

    # DeWalt
    326: "https://images.thdstatic.com/productImages/86df3881-aefa-4558-934d-7ca47206c767/svn/dewalt-cordless-hedge-trimmers-dcht820b-64_1000.jpg",  # DCHT820B
}


def test_url(url, timeout=10):
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
    with open(PRODUCTS_FILE) as f:
        products = json.load(f)

    print(f"Fixing {len(FIXES)} remaining broken URLs...")

    # Test all
    results = {}
    def test_one(idx, url):
        ok, msg = test_url(url)
        return idx, ok, msg

    with ThreadPoolExecutor(max_workers=15) as pool:
        futures = {pool.submit(test_one, idx, url): idx for idx, url in FIXES.items()}
        for f in as_completed(futures):
            idx, ok, msg = f.result()
            results[idx] = (ok, msg)

    working = {idx for idx, (ok, _) in results.items() if ok}
    broken = {idx: msg for idx, (ok, msg) in results.items() if not ok}

    print(f"New URLs: {len(working)} working, {len(broken)} broken")
    if broken:
        for idx, msg in sorted(broken.items()):
            p = products[idx]
            print(f"  [{idx}] {p['brand']} {p['model']}: {msg}")

    # Apply
    applied = 0
    for idx, url in FIXES.items():
        if idx in working:
            products[idx]['image'] = url
            applied += 1

    print(f"\nApplied {applied} fixes")

    with open(PRODUCTS_FILE, 'w') as f:
        json.dump(products, f, indent=2)

    # Final full verification
    print("\n--- Final full verification ---")
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
    print(f"\nFINAL: {len(products) - len(still_broken)} working, {len(still_broken)} broken")

    if still_broken:
        print("\nStill broken:")
        for i, msg in still_broken:
            p = products[i]
            print(f"  [{i}] {p['brand']} {p['model']}: {msg}")
    else:
        print("\nALL 497 IMAGES WORKING!")


if __name__ == "__main__":
    main()
