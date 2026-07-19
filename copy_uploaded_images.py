import shutil, os

src = r"C:\Users\Asus TUF\.gemini\antigravity-ide\brain\028108f2-f046-4905-a291-e00e898213bc"
dst = r"D:\blog Sewa Net stream\assets"

os.makedirs(dst, exist_ok=True)

shutil.copy2(os.path.join(src, "media__1784328575592.png"), os.path.join(dst, "rotator_scheduler.png"))
shutil.copy2(os.path.join(src, "media__1784328575616.png"), os.path.join(dst, "channel_streams.png"))
shutil.copy2(os.path.join(src, "media__1784328575747.png"), os.path.join(dst, "safar_streams.png"))

print("COPY SUCCESSFUL")
