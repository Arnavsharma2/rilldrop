<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/rilldrop-mark-dark.svg">
    <img src=".github/assets/rilldrop-mark-light.svg" alt="Rilldrop" width="112" height="112" />
  </picture>
</p>

<h1 align="center">Rilldrop</h1>

<p align="center">
  <strong>Private peer-to-peer file transfer, wherever you work.</strong>
</p>

<p align="center">
  <a href="https://github.com/Arnavsharma2/rilldrop/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/Arnavsharma2/rilldrop/ci.yml?branch=main&label=build" alt="Build status" /></a>
  <a href="https://github.com/Arnavsharma2/rilldrop/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-2dd4bf.svg" alt="MIT License" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="docs/introduction.mdx">Documentation</a> ·
  <a href="SELF_HOSTING.md">Self-hosting</a> ·
  <a href="#upstream-credit">Upstream credit</a>
</p>

## About

Rilldrop streams files directly between devices over WebRTC. A small signaling server introduces peers but never stores, inspects, or decrypts file contents. If a direct route is unavailable, an optional TURN relay forwards the same end-to-end encrypted traffic.

The project includes a Next.js web client, a Windows desktop client, a Go command-line client, and a Node.js signaling server. They share one transfer protocol, so a sender and receiver can use different clients.

Rilldrop is currently a self-host-first development project. It does not claim an official hosted service, app-store listing, or package-manager release yet; configure your own public client and signaling URLs when deploying it.

## Quick start

Build and run the full stack locally:

```sh
git clone https://github.com/Arnavsharma2/rilldrop.git
cd rilldrop
cp .env.docker.example .env
docker compose -f docker-compose.yml -f docker-compose.build.yml up --build
```

Then open `http://localhost:3000` on both devices. For use across networks, follow [SELF_HOSTING.md](SELF_HOSTING.md) and configure HTTPS plus a public signaling address.

### Web development

```sh
cd server
npm install
npm run dev
```

In another terminal:

```sh
cd client
pnpm install
pnpm dev
```

### CLI development

```sh
go build -o rilldrop ./cli/cmd/rilldrop
./rilldrop send photo.jpg --server http://localhost:3001
./rilldrop receive olive-tiger-castle --server http://localhost:3001
```

Set `RILLDROP_SERVER` and, for split deployments, `RILLDROP_WEB` to avoid repeating those flags.

## What changed

- New Rilldrop product identity, logo, executable names, package coordinates, configuration keys, and distribution metadata.
- Local and self-hosted endpoints replace assumptions about an upstream hosted service.
- Transfer lists, progress, and icon-only controls expose clearer semantics to assistive technology.
- The original Git history is intentionally not included; this repository starts with a credited source-import commit and continues with Rilldrop-specific work.

## Documentation

- [Introduction](docs/introduction.mdx)
- [Quickstart](docs/quickstart.mdx)
- [How the transfer works](docs/reference/architecture.mdx)
- [Security and privacy](docs/security-privacy.mdx)
- [Self-hosting](SELF_HOSTING.md)
- [Contributing](CONTRIBUTING.md)

## Upstream credit

Rilldrop is derived from [Floe](https://github.com/jannskiee/floe).

## License

MIT License. Copyright © 2026 Jan Carlo Paredes. See [LICENSE](LICENSE).
