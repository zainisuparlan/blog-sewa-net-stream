import re, os

SCRIPT_PATH = "script.js"

with open(SCRIPT_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern untuk mencari tag img base64 atau path lama
pattern = re.compile(
    r'<img\s+src="(?:/?assets/qris\.png|data:image/png;base64,[^"]*)"[^>]*/?>',
    re.IGNORECASE
)

# Ganti dengan tag img bersih menggunakan path assets/qris.png dan style yang lebih besar (300px)
clean_tag = '<img src="assets/qris.png" alt="Scan QRIS Netstream Cloud" style="max-width: 300px; width: 100%; display: block; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />'

if pattern.search(content):
    new_content = pattern.sub(clean_tag, content)
    with open(SCRIPT_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESS: script.js cleaned and QRIS image restored to assets/qris.png with 300px width!")
else:
    print("WARNING: Target img tag not found or already cleaned.")
