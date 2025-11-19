
This archive has been prepared for GitHub Actions APK building.

What was added automatically:
- .github/workflows/android-build.yml  (GitHub Actions workflow to build an APK)
- capacitor.config.json (placeholder, adjust appId/appName/webDir if needed)
- README-CI.txt (this file)

Next steps (on your PC or GitHub):
1) Verify package.json contains a "build" script (e.g., react/vite build). If not, add one.
2) Push this project to a GitHub repo named 'CrowdCounterMicrobit' (branch main).
3) The workflow will run automatically on push and produce 'app-debug.zip' artifact
   containing the APK if the build succeeds.
4) If the workflow fails during 'npx cap sync android' or Gradle, you may need to
   open the project locally in Android Studio and run the build there as described in README-CI.

Minimal checklist before GitHub CI:
- package.json exists and 'npm run build' works locally (on your PC)
- Ensure project supports Capacitor (see capacitor.config.json webDir)
- Commit & push to GitHub, then open Actions tab to monitor the run.
