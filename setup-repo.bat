@echo off
echo 🚀 Open GitHub to create the repository...
start "" "https://github.com/new?name=ada-scanner&visibility=private"

echo.
echo ========================================================
echo [STEP 1] In the browser window that just opened:
echo    1. Click the green "Create repository" button.
echo    2. Copy the URL of the new repo (e.g. https://github.com/YOUR_USER/ada-scanner.git)
echo ========================================================
echo.

set /p REPO_URL="[STEP 2] Paste the Repo URL here and press ENTER: "

echo.
echo 🔗 Linking local folder to %REPO_URL%...
git remote remove origin
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ✅ Done! Now go back to AWS App Runner and refresh the page.
pause
