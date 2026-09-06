<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/rilldrop-mark-dark.svg">
    <img src=".github/assets/rilldrop-mark-light.svg" alt="Rilldrop" width="112" height="112" />
  </picture>
</p>

<h1 align="center">Rilldrop</h1>

<p align="center">
  <strong>Self-hosted file transfer across web, desktop, and CLI.</strong>
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

Rilldrop transfers files between devices over WebRTC. A small signaling server connects peers; file payloads travel directly between them when possible, with an optional TURN relay for networks that require it.

The project includes a Next.js web client, a Windows desktop client, a Go command-line client, and a Node.js signaling server. They share one transfer protocol, so a sender and receiver can use different clients.

Rilldrop is derived from [Floe](https://github.com/jannskiee/floe). This repository develops the self-hosting setup, accessibility, and focused client/server optimizations. See [upstream credit](#upstream-credit).

## My contributions

- **Accessible transfer state:** labeled file queues and icon-only controls, exposed progress values to assistive technology, and added a rendering regression test. [Change](https://github.com/Arnavsharma2/rilldrop/commit/bcf163fef0730c29786c2a2667af8e9c26aff6ef)
- **Lower allocation overhead:** reused sliding-window rate-limit buffers across signaling endpoints, with tests for in-place pruning. [Change](https://github.com/Arnavsharma2/rilldrop/commit/cf4844153e17eaddeaf670120e53ab680b12a451)
- **Independent deployment:** updated client and CLI configuration, branding, and self-hosting documentation for Rilldrop.

## Quick start

Build and run the full stack locally:

```sh
git clone https://github.com/Arnavsharma2/rilldrop.git
cd rilldrop
cp .env.docker.example .env
docker compose -f docker-compose.yml -f docker-compose.build.yml up --build
```

Open `http://localhost:3000` in two browser tabs for a local send/receive demo. To connect another device or use different networks, follow [SELF_HOSTING.md](SELF_HOSTING.md) and configure reachable client/signaling addresses and HTTPS.

The instructions below run your own deployment; they do not depend on a hosted Rilldrop service.

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

## Documentation

- [Introduction](docs/introduction.mdx)
- [Quickstart](docs/quickstart.mdx)
- [How the transfer works](docs/reference/architecture.mdx)
- [Security and privacy](docs/security-privacy.mdx)
- [Self-hosting](SELF_HOSTING.md)
- [Contributing](CONTRIBUTING.md)

## Upstream credit

The transfer protocol and initial web, desktop, CLI, and signaling implementation come from [Floe](https://github.com/jannskiee/floe), created by Jan Carlo Paredes and its contributors. Rilldrop-specific work continues in this repository's [commit history](https://github.com/Arnavsharma2/rilldrop/commits/main/).

## License

MIT License. Copyright © 2026 Jan Carlo Paredes. See [LICENSE](LICENSE).
