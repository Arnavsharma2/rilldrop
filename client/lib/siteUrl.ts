/**
 * Resolves the public base URL of THIS deployment, used for canonical links,
 * Open Graph and Twitter images, the JSON-LD block, and the sitemap.
 *
 * Unlike the signaling server address (see lib/socketUrl.ts), this one cannot be
 * resolved at runtime: Next bakes metadata into the prerendered HTML at build
 * time, so a published image genuinely cannot know the domain it will be served
 * from.
 *
 * Resolution order:
 *
 *   1. NEXT_PUBLIC_SITE_URL, when set to a non-empty value. Self-hosters who want
 *      their own domain in share previews set this and build the client
 *      themselves (see docker-compose.build.yml).
 *   2. Undefined for distributable images, which cannot know where they will
 *      eventually be hosted.
 *   3. localhost:3000 for local development.
 */

// Set only by client/Dockerfile, immediately before `pnpm build`.
const isDistributableImage = process.env.RILLDROP_DISTRIBUTABLE_IMAGE === '1';

// Read as this exact expression: Next replaces the literal text
// `process.env.NEXT_PUBLIC_SITE_URL` at build time, so destructuring it or
// computing the key would leave it undefined.
const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/**
 * The public origin of this deployment, or undefined when it is unknowable.
 *
 * Trailing slashes are stripped so callers can append `/sitemap.xml` safely.
 * The check is truthiness-based on purpose: client/Dockerfile declares
 * `ARG NEXT_PUBLIC_SITE_URL=`, so the value that actually arrives is the empty
 * string, and `new URL('')` throws.
 */
export const siteUrl: string | undefined = explicit
    ? explicit.replace(/\/+$/, '')
    : isDistributableImage
      ? undefined
      : 'http://localhost:3000';

/**
 * `metadataBase` for Next's Metadata API, or null when the origin is unknown.
 *
 * null matters: without it Next falls back to http://localhost:3000 and resolves
 * every relative Open Graph image against it, which is worse than no image at all.
 */
export const metadataBase: URL | null = siteUrl ? new URL(siteUrl) : null;
