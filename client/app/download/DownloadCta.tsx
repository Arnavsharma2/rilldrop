import React from 'react';
import { Download } from 'lucide-react';
import { DESKTOP_SETUP_URL } from '@/lib/desktopRelease';

/**
 * Primary download action for the GitHub-distributed Windows installer.
 */

// The badge ships at 161x44 and is rendered at 220x60 (same ratio): the hero
// action of the page, so it carries more weight than the pill it replaced.
// `unoptimized` serves the raw SVG vector, so it stays crisp at any size and
// DPI. Opacity lift on hover mirrors the old pill's hover shift without
// recoloring Microsoft's artwork.
const buttonClass =
    'inline-flex items-center gap-2 rounded-full bg-teal-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300';

export function DownloadCta() {
    return (
        <div className="flex items-center justify-center">
            <a
                href={DESKTOP_SETUP_URL}
                data-umami-event="download-desktop"
                data-umami-event-file="installer"
                data-umami-event-source="hero-primary"
                className={buttonClass}
            >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download for Windows
            </a>
        </div>
    );
}
