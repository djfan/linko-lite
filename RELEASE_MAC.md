# Mac releases

The Mac app is built in private `djfan/linko-lite-macos` (handbook: `docs/release.md` there) and published here alongside Android, with its own tags and files.

- Tags: `mac-v<version>` (e.g. `mac-v0.1`), independent of Android's `v<version>`. Beta releases are prereleases.
- Approved Release assets: `Linko-Lite.dmg` and `SHA256SUMS-macos` only. Never commit the dmg, the signing certificate or the Sparkle private key here.
- Pages files: `dist/appcast.xml` (Sparkle updates, signed) and `dist/release-macos.json` (website button and in-app fallback). Update both from the same release build, after the dmg is anonymously downloadable with the expected checksum. Android's `dist/release.json` is unchanged.
- Never replace a published dmg under the same version; publish a new version instead.

## 0.1 Beta

首个 Mac 版本：双栏笔记、输入法安全的编辑器、语音转文字、全局快捷键快速记录、与 Android 和 Linko 同步。

The first Mac version: a two-column notebook, an editor that is safe with input methods, voice to text, quick capture from a global shortcut, and sync with Android and Linko.
