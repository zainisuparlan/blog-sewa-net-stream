@echo off
echo ============================================================
echo   NetStream Blog - Copy Gambar ke Folder Assets
echo ============================================================
echo.

set SRC=C:\Users\Asus TUF\.gemini\antigravity-ide\brain\028108f2-f046-4905-a291-e00e898213bc
set DST=D:\blog Sewa Net stream\assets

if not exist "%DST%" (
  mkdir "%DST%"
  echo [OK] Folder assets dibuat.
)

echo Menyalin gambar...

copy /Y "%SRC%\hero_dashboard_1784055944869.png" "%DST%\hero_dashboard.png"
copy /Y "%SRC%\thumbnail_demo_1784055955677.png" "%DST%\thumbnail_demo.png"
copy /Y "%SRC%\auto_upload_demo_1784055973255.png" "%DST%\auto_upload_demo.png"
copy /Y "%SRC%\auto_live_bot_demo_1784055983096.png" "%DST%\auto_live_bot_demo.png"

echo.
echo ============================================================
echo   SELESAI! Buka index.html di browser.
echo ============================================================
pause
