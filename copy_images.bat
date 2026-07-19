@echo off
echo ============================================================
echo   NetStream Blog - Menyalin Screenshot Asli Canva ke Assets
echo ============================================================
echo.

set SRC=C:\Users\Asus TUF\.gemini\antigravity-ide\brain\028108f2-f046-4905-a291-e00e898213bc
set DST=D:\blog Sewa Net stream\assets

if not exist "%DST%" (
  mkdir "%DST%"
  echo [OK] Folder assets dibuat.
)

echo Menyalin screenshot asli...

copy /Y "%SRC%\media__1784328575592.png" "%DST%\rotator_scheduler.png"
copy /Y "%SRC%\media__1784328575616.png" "%DST%\channel_streams.png"
copy /Y "%SRC%\media__1784328575747.png" "%DST%\safar_streams.png"

echo.
echo ============================================================
echo   SELESAI! Silakan refresh browser.
echo ============================================================
pause
