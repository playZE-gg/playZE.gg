@echo off
REM REQUIRES FFMPEG! NO IM NOT MAKING THESE MORE COMPLICATED TO AUTOMATE INSTALLING IT OR CHECKING FOR IT. MAKE SURE WINDOWS DEFENDER ISNT BLOCKING IT.
REM
REM Convert a recorded .mp4 into a small, looping animated .webp for embedding
REM in map guides with standard Markdown image syntax: ![alt](./clip.webp)
REM
REM Astro's build reads all frames (pages: -1) and re-optimises the webp, so the
REM animation and infinite loop are preserved on the live site.
REM
REM Usage: drag an .mp4 onto this file, or run:  convert-to-720p-webp.bat clip.mp4
REM Output: <same folder as source>\<same name>.webp
REM
REM Knobs: fps (smoothness), scale width (detail), -q:v 0-100 (quality/size).
ffmpeg -i "%~1" -vf "fps=15,scale=720:-1:flags=lanczos" -c:v libwebp -lossless 0 -q:v 70 -loop 0 -an "%~dpn1.webp"
