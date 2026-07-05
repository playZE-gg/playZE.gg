@echo off
REM REQUIRES FFMPEG! NO IM NOT MAKING THESE MORE COMPLICATED TO AUTOMATE INSTALLING IT OR CHECKING FOR IT. MAKE SURE WINDOWS DEFENDER ISNT BLOCKING IT.
REM
REM Downscale + convert a raw screenshot (.png / .jpg) into a small .webp for
REM embedding in guides with standard Markdown image syntax: ![alt](./shot.webp)
REM
REM Caps the width at 1920px (never upscales smaller images) and encodes webp q80.
REM Astro re-optimises at build; committing the .webp keeps the multi-MB 4K source
REM out of git (raw .png/.jpg under src/content are gitignored).
REM
REM Usage: drag an image onto this file, or run:  convert-image-to-webp.bat shot.png
REM Output: <same folder as source>\<same name>.webp
REM
REM Knobs: the 1920 width cap (detail vs size) and -q:v 0-100 (quality vs size).
ffmpeg -i "%~1" -vf "scale='min(1920,iw)':-1:flags=lanczos" -c:v libwebp -q:v 80 "%~dpn1.webp"
