# Rilldrop development guide

Rilldrop is a peer-to-peer file-transfer project with four cooperating surfaces:

- `client/`: Next.js browser client
- `server/`: Node.js signaling and short-code service
- `cli/`: Go CLI plus the shared transfer engine
- `desktop/`: Wails Windows application using the shared Go engine

## Local stack

```sh
docker compose -f docker-compose.yml -f docker-compose.build.yml up --build
```

The browser client runs at `http://localhost:3000`; signaling runs at `http://localhost:3001`.

## Validation

```sh
cd client && pnpm lint && pnpm test && pnpm build
cd ../server && npm test
cd ../cli && go test ./...
cd ../desktop/frontend && npm test && npm run build
cd .. && go test ./...
```

## Protocol compatibility

The browser protocol lives in `client/lib/transfer/protocol.ts`. The Go implementation lives in `cli/engine/transfer/protocol.go`. Keep their protocol ranges aligned. A cosmetic rename does not require a protocol-version bump.

## Brand and configuration

- Display name: `Rilldrop`
- CLI and package stem: `rilldrop`
- Environment prefix: `RILLDROP_`
- Browser storage/event prefix: `rilldrop`
- Repository: `github.com/Arnavsharma2/rilldrop`

Generate bitmap and ICO brand assets from `desktop/build/appicon.svg` after installing `client/` dependencies:

```sh
node scripts/generate-brand-assets.mjs
```

Do not introduce an `rilldrop.one` production assumption. Rilldrop is self-host-first until a real deployment is configured.

## Upstream

The initial source came from [Floe](https://github.com/jannskiee/floe) by Jan Carlo Paredes, at commit `6d1e629`, under the MIT License. Preserve `LICENSE` and the attribution in `README.md`.
