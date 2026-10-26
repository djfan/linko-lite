# Install

## Android

Download `linko-lite.apk`, open it, and follow Android’s installation prompt. Allow installation from your browser if asked.

Keep the installed app. Future versions install over it and retain your notebook.

If Android reports a signature conflict with an older development build, do not uninstall it: its local notes may be lost. Keep it until a data migration is available.

Beta: emulator checks completed; physical-phone checks remain pending. First use needs a Linko account. Once signed in, capture works offline; sync resumes online. Pending voice processing needs a connection. Uninstalling or clearing storage can lose local notes and pending recordings.

## Mac

macOS 14 or later. Download `Linko-Lite.dmg`, open it and drag Linko Lite into Applications.

Linko Lite is not notarized by Apple, so macOS blocks the first launch. Open it once, then go to System Settings › Privacy & Security and choose Open Anyway. Alternatively, in Terminal:

```bash
xattr -dr com.apple.quarantine "/Applications/Linko Lite.app"
```

Updates arrive inside the app. After each update macOS asks once whether Linko Lite may use its keychain item; choose Always Allow. Your notes and sign-in stay as they are.

Beta: first use needs a Linko account. Capture works offline once signed in; sync resumes online. The global quick-capture shortcut and the menu bar icon can be changed in Settings.
