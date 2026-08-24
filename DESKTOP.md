# Rilldrop Desktop

Rilldrop Desktop is the Windows client for the shared Rilldrop transfer protocol. It uses Wails, React, and the Go transfer engine from `cli/engine`.

## Current status

- Development version: `0.1.0`
- Target: Windows 10 version 2004 or later, x64
- Distribution: GitHub Releases when tagged
- Package formats: NSIS installer, portable ZIP, and unsigned MSIX build artifact
- Hosted service: none; configure a public signaling server for use across networks

The repository does not claim an existing Microsoft Store listing. The MSIX pipeline remains available for future signing and package-manager integration, but its identity and publisher values must be replaced with production credentials before publication.

## Development

```sh
cd desktop/frontend
npm ci
npm test
npm run build

cd ..
go test ./...
wails dev
```

Build a production executable:

```sh
cd desktop
wails build
```

The executable is written to `desktop/build/bin/rilldrop-desktop.exe`.

## Configuration

An empty server setting uses the local development stack:

- Signaling server: `http://localhost:3001`
- Browser share links: `http://localhost:3000`

For a deployed instance, set the server address in Settings. Set a separate web address only when the signaling API and browser client use different origins.

Desktop settings are stored under the operating system user configuration directory in `rilldrop/desktop.json`. The CLI and desktop app intentionally share the `rilldrop` configuration namespace.

## Release tags

Desktop releases use `desktop-vX.Y.Z`. CLI releases use `vX.Y.Z`. They are separate release lines but continue to share the same wire protocol.
