# Mac releases

The Mac app is built in private `djfan/linko-lite-macos` (handbook: `docs/release.md` there) and published here alongside Android, with its own tags and files.

- Tags: `mac-v<version>` (e.g. `mac-v0.1`), independent of Android's `v<version>`. Beta releases are prereleases.
- Approved Release assets: `Linko-Lite.dmg` and `SHA256SUMS-macos` only. Never commit the dmg, the signing certificate or the Sparkle private key here.
- Pages files: `dist/appcast.xml` (Sparkle updates, signed) and `dist/release-macos.json` (website button and in-app fallback). Update both from the same release build, after the dmg is anonymously downloadable with the expected checksum. Android's `dist/release.json` is unchanged.
- Never replace a published dmg under the same version; publish a new version instead.
- Each release also updates the default Mac download link in `dist/index.html` and `README.md`.

## 0.4 Beta

主窗口在前台时，⌃⌥⌘R 直接在主窗口录音页录音，不再弹出小窗。

With the main window in front, ⌃⌥⌘R records on its recording page instead of opening the floating window.

## 0.3 Beta

录音时可以「放弃」，不保存也不留音频。登录过期时，打开或回到应用会自动弹出登录窗口，可选「稍后」。

Discard a recording without keeping anything. When the login has expired, the sign-in window opens by itself on launch or return, with Not now.

## 0.2 Beta

语音速记：在任何应用里按 ⌃⌥⌘R 开始录音，再按一次保存。新的 macOS 26 风格图标；开始与 Android 相同口径的匿名使用统计。

Voice notes from anywhere with ⌃⌥⌘R; a new macOS 26-style icon; the same anonymous usage statistics as Android.

## 0.1 Beta

首个 Mac 版本：双栏笔记、输入法安全的编辑器、语音转文字、全局快捷键快速记录、与 Android 和 Linko 同步。

The first Mac version: a two-column notebook, an editor that is safe with input methods, voice to text, quick capture from a global shortcut, and sync with Android and Linko.
