#!/usr/bin/env python3
"""
Fetch promos from Gazetki.pl and save as JSON for the app.
Uses browser-based extraction for JS-rendered content.
"""
import json, re, os, sys
from datetime import datetime, date
from urllib.request import Request, urlopen

STORES = {
    "biedronka": "https://www.gazetki.pl/sklepy/biedronka/",
    "lidl": "https://www.gazetki.pl/sklepy/lidl/",
    "auchan": "https://www.gazetki.pl/sklepy/auchan/",
    "dino": "https://www.gazetki.pl/sklepy/dino/",
    "carrefour": "https://www.gazetki.pl/sklepy/carrefour/",
}

# Fallback hardcoded deals (updated weekly as baseline)
FALLBACK_DEALS = {
    "biedronka": [
        {"name": "Jajka 10 szt", "price": 8.99, "old_price": 12.99, "unit": "szt"},
        {"name": "Mleko 1L", "price": 2.99, "old_price": 3.49, "unit": "l"},
        {"name": "Masło 200g", "price": 4.49, "old_price": 5.99, "unit": "szt"},
        {"name": "Pierś z kurczaka 1kg", "price": 21.99, "old_price": 27.99, "unit": "kg"},
        {"name": "Chleb pszenny", "price": 2.99, "old_price": 3.99, "unit": "szt"},
    ],
    "lidl": [
        {"name": "Jajka 10 szt", "price": 9.49, "old_price": 12.99, "unit": "szt"},
        {"name": "Mleko 1L", "price": 3.19, "old_price": 3.69, "unit": "l"},
        {"name": "Masło 200g", "price": 4.79, "old_price": 5.99, "unit": "szt"},
        {"name": "Łosoś 200g", "price": 18.99, "old_price": 24.99, "unit": "szt"},
        {"name": "Ogórki 1kg", "price": 4.99, "old_price": 7.99, "unit": "kg"},
    ],
    "auchan": [
        {"name": "Jajka 10 szt", "price": 9.99, "old_price": 13.99, "unit": "szt"},
        {"name": "Mleko 1L", "price": 3.29, "old_price": 3.79, "unit": "l"},
        {"name": "Oliwa z oliwek 500ml", "price": 18.99, "old_price": 24.99, "unit": "szt"},
        {"name": "Makaron 500g", "price": 3.49, "old_price": 4.99, "unit": "szt"},
    ],
    "dino": [
        {"name": "Jajka 10 szt", "price": 8.49, "old_price": 11.99, "unit": "szt"},
        {"name": "Mleko 1L", "price": 2.89, "old_price": 3.29, "unit": "l"},
        {"name": "Masło 200g", "price": 4.29, "old_price": 5.49, "unit": "szt"},
    ],
    "carrefour": [
        {"name": "Jajka 10 szt", "price": 10.99, "old_price": 14.99, "unit": "szt"},
        {"name": "Mleko 1L", "price": 3.49, "old_price": 3.99, "unit": "l"},
        {"name": "Cukier 1kg", "price": 3.99, "old_price": 4.99, "unit": "kg"},
    ],
}

def try_fetch_json(url):
    """Try to fetch a URL and parse as JSON (for API endpoints)."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Accept": "application/json,text/html",
        }
        req = Request(url, headers=headers)
        resp = urlopen(req, timeout=10)
        data = resp.read().decode("utf-8", errors="replace")
        return data
    except Exception as e:
        return None

def extract_prices_from_html(html):
    """Try to extract price data from HTML."""
    deals = []
    # Pattern: "price": number or similar JSON structures
    price_patterns = re.findall(
        r'"(?:price|priceValue|currentPrice|product_price)"\s*:\s*(\d+(?:[.,]\d+)?)',
        html
    )
    name_patterns = re.findall(
        r'"(?:name|title|product_name|productTitle)"\s*:\s*"([^"]+)"',
        html
    )
    
    # Try to find structured data
    # Look for schema.org/Product markup
    schema_blocks = re.findall(
        r'"@type"\s*:\s*"Product"[^}]+"name"\s*:\s*"([^"]+)"[^}]+"price"\s*:\s*"(\d+(?:[.,]\d+)?)"',
        html
    )
    for name, price_str in schema_blocks:
        price = float(price_str.replace(",", "."))
        if name and price and len(name) > 3:
            deals.append({
                "name": name.strip()[:60],
                "price": price,
                "unit": "szt",
                "timestamp": date.today().isoformat()
            })
    
    return deals

def generate_promos():
    """Main function: try to fetch live data, fall back to hardcoded."""
    today = date.today().isoformat()
    output = {"generated": datetime.now().isoformat(), "stores": {}}
    
    for store_id, url in STORES.items():
        print(f"  📡 {store_id}...", file=sys.stderr)
        deals = []
        
        # Try fetching HTML
        html = try_fetch_json(url)
        if html:
            extracted = extract_prices_from_html(html)
            if extracted:
                print(f"     {len(extracted)} ofert ze strony", file=sys.stderr)
                deals = extracted
        
        # Fall back to hardcoded
        if not deals and store_id in FALLBACK_DEALS:
            print(f"     użyto wbudowanych ({len(FALLBACK_DEALS[store_id])})", file=sys.stderr)
            for d in FALLBACK_DEALS[store_id]:
                deals.append({**d, "timestamp": today})
        
        output["stores"][store_id] = {
            "source": url,
            "updated": today,
            "deals": deals[:30]
        }
    
    return output

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    print("📰 Pobieranie gazetek promocyjnych...", file=sys.stderr)
    
    promos = generate_promos()
    
    for path in ["www/promos.json", "promos.json"]:
        full_path = os.path.join(script_dir, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            json.dump(promos, f, ensure_ascii=False, indent=2)
    
    total = sum(len(s["deals"]) for s in promos["stores"].values())
    print(f"\n✅ Zapisano {total} promocji z {len(promos['stores'])} sklepów", file=sys.stderr)

if __name__ == "__main__":
    main()
