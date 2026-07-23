"""
embed_qris.py
Konversi assets/qris.png → base64 data URL, lalu patch script.js secara otomatis.
Jalankan: python embed_qris.py
"""
import base64, re, os, sys

QRIS_PATH  = os.path.join(os.path.dirname(__file__), "assets", "qris.png")
SCRIPT_PATH = os.path.join(os.path.dirname(__file__), "script.js")

# --- 1. Baca & encode gambar ---
if not os.path.exists(QRIS_PATH):
    sys.exit(f"[ERROR] File tidak ditemukan: {QRIS_PATH}")

with open(QRIS_PATH, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

data_url = f"data:image/png;base64,{b64}"
print(f"[OK] qris.png di-encode ({len(b64):,} chars)")

# --- 2. Baca script.js ---
with open(SCRIPT_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# --- 3. Ganti baris <img src="...qris..." ---
old_pattern = re.compile(
    r'<img\s+src="(?:/?assets/qris\.png|data:image/png;base64,[^"]*)"[^>]*/?>',
    re.IGNORECASE
)

new_tag = (
    f'<img src="{data_url}" '
    f'alt="Scan QRIS Netstream Cloud" '
    f'style="max-width:220px;width:100%;display:block;border-radius:8px;" />'
)

if old_pattern.search(content):
    new_content = old_pattern.sub(new_tag, content)
    print("[OK] Tag <img> lama ditemukan dan diganti.")
else:
    sys.exit("[ERROR] Tag <img src=qris> tidak ditemukan di script.js. Cek manual.")

# --- 4. Simpan script.js ---
with open(SCRIPT_PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"[DONE] script.js berhasil diupdate!")
print(f"       QRIS sekarang embed langsung sebagai base64 — tidak butuh file server.")
print(f"\nSelanjutnya: git add script.js && git commit -m 'embed qris base64' && git push")
