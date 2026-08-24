# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Rilldrop, please report it privately. Do not open a public issue, as that may expose the vulnerability before a fix is available.

Use **GitHub Security Advisories**: open the [Security tab](https://github.com/Arnavsharma2/rilldrop/security/advisories/new) and select "Report a vulnerability". This keeps the report private until a fix is released.

Please include as much of the following as possible:

- A description of the vulnerability and its impact
- Steps to reproduce it
- The affected component (web client, signaling server, CLI, or desktop app)
- Any relevant logs, screenshots, or proof of concept

## What to Expect

- We will acknowledge your report as soon as possible.
- We will investigate and keep you informed of our progress.
- Once a fix is ready, we will release it and credit you in the advisory, unless you prefer to remain anonymous.

## Scope

This policy covers the Rilldrop web client, signaling server, CLI, and desktop app in this repository. The signaling server brokers connection setup only. File data travels peer-to-peer over end-to-end encrypted WebRTC data channels, directly when possible or through an encrypted TURN relay that cannot read it, and is never stored or inspected by Rilldrop infrastructure.

## Supported Versions

Rilldrop is pre-1.0 software. Security fixes land on `main`; tagged fixes ship on the CLI `v*` or desktop `desktop-v*` release line as appropriate. Reports should identify the exact commit or tag tested.
