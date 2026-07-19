import shutil, os

src = r"C:\Users\Asus TUF\.gemini\antigravity-ide\brain\028108f2-f046-4905-a291-e00e898213bc"
dst = r"D:\blog Sewa Net stream\assets"

os.makedirs(dst, exist_ok=True)

files = {
    "hero_dashboard_1784055944869.png": "hero_dashboard.png",
    "thumbnail_demo_1784055955677.png": "thumbnail_demo.png",
    "auto_upload_demo_1784055973255.png": "auto_upload_demo.png",
    "auto_live_bot_demo_1784055983096.png": "auto_live_bot_demo.png",
}

for src_name, dst_name in files.items():
    s = os.path.join(src, src_name)
    d = os.path.join(dst, dst_name)
    if os.path.exists(s):
        shutil.copy2(s, d)
        print(f"OK: {dst_name}")
    else:
        print(f"NOT FOUND: {src_name}")

print("SELESAI")
