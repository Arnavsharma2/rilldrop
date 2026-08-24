# Unraid templates

Rilldrop uses two containers. Install `rilldrop-server.xml` first, followed by
`rilldrop-client.xml`.

For direct access on a local network:

1. Give the server a host port (the default is `3001`).
2. Set the server's **Client URL** to the exact client origin that browsers open,
   for example `http://192.168.1.10:3000`.
3. Give the client a Web UI port (the default is `3000`).
4. Set the client's **Signaling Server URL** to `http://<unraid-ip>:<server-port>`,
   for example `http://192.168.1.10:3001`.

Publishing both services through a single HTTPS domain? Leave **Signaling Server
URL** empty and the browser uses the domain it loaded from. On two separate
hostnames, set it to the full public signaling origin.

The templates use multi-architecture images from GitHub Container Registry and do
not require application-data volumes. See the
[Unraid deployment guide](../docs/self-hosting/unraid.mdx) for installation,
reverse proxy, TURN, and troubleshooting details.
