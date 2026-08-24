import React from 'react';
import type { Metadata } from 'next';
import {
    InlineCode,
    LegalCallout,
    LegalList,
    LegalSection,
    LegalShell,
} from '@/components/legal/LegalShell';

export const metadata: Metadata = {
    title: 'Privacy Policy · Rilldrop',
    description:
        'How Rilldrop handles your data: files stream peer to peer and are never stored, and the only tally we keep is one anonymous global byte total.',
    alternates: {
        canonical: '/privacy',
    },
};

const toc = [
    { id: 'transfer', label: 'How the transfer works' },
    { id: 'collect', label: 'Information we collect' },
    { id: 'third-parties', label: 'Third-party services' },
    { id: 'relay', label: 'Relay server' },
    { id: 'errors', label: 'Error monitoring' },
    { id: 'analytics', label: 'Usage analytics' },
    { id: 'desktop', label: 'The desktop app' },
    { id: 'contact', label: 'Contact & abuse reports' },
];

export default function PrivacyPolicy() {
    return (
        <LegalShell
            eyebrow="Legal"
            title="Privacy policy"
            updated="Last updated: August 2026"
            toc={toc}
            intro={
                <LegalCallout label="The short version" tone="positive">
                    <p>
                        Rilldrop is a <strong className="font-semibold text-zinc-200">peer-to-peer</strong>{' '}
                        file transfer service. Your files stream directly from the sender&apos;s device
                        to the receiver&apos;s device whenever possible.
                    </p>
                    <p>
                        <strong className="font-semibold text-zinc-200">
                            We do not store, view, or process your files.
                        </strong>{' '}
                        In direct connections, files never touch the signaling server. In relay connections,
                        encrypted file data passes through the configured TURN server in transit but is never
                        stored or inspected. The only tally we keep is one anonymous number: the
                        running total of bytes transferred across all users, shown by the counter on
                        the deployment&apos;s homepage. You can opt out of contributing to it at any time. The
                        cookieless, aggregate analytics and error monitoring we use are described
                        below.
                    </p>
                </LegalCallout>
            }
        >
            <LegalSection id="transfer" index="01" title="How the transfer works">
                <p>
                    When you send a file, we use{' '}
                    <strong className="font-semibold text-zinc-200">WebRTC</strong> to establish a
                    connection between you and the recipient. Our signaling server introduces the two
                    devices and then steps aside. In most cases, data flows directly between browsers.
                    When a direct path is not available, the deployment&apos;s TURN relay bridges the connection.
                    Even through the relay, files remain encrypted and are never stored.
                </p>
            </LegalSection>

            <LegalSection id="collect" index="02" title="Information we collect">
                <LegalList
                    marker={null}
                    items={[
                        <>
                            <strong className="font-semibold text-zinc-200">Files.</strong> We do not
                            collect or store any files.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">Metadata.</strong>{' '}
                            Filenames and sizes travel directly between the two devices over the
                            encrypted data channel so the receiver can see what is arriving. They
                            never pass through, and are never stored on, the signaling server.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">
                                Aggregate transfer total.
                            </strong>{' '}
                            When a transfer completes, the receiving side reports only the number of
                            bytes it received. We add this to one shared, all-time counter of total
                            bytes transferred, shown on the deployment&apos;s homepage. The sender never reports. Rilldrop does
                            not store file names, file contents, or any link between this number and
                            you. You can opt out of this report: uncheck
                            &quot;Contribute to global stats&quot; on the receiver view in the browser,
                            or use <InlineCode>--no-report</InlineCode> (or set{' '}
                            <InlineCode>RILLDROP_NO_STATS=1</InlineCode>) when using the CLI.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">IP addresses.</strong> Like
                            all web servers, the hosting provider may log connection request IP
                            addresses for security and abuse prevention. We do not link this to your
                            identity.
                        </>,
                    ]}
                />
            </LegalSection>

            <LegalSection id="third-parties" index="03" title="Third-party services">
                <p>
                    Rilldrop uses third-party infrastructure providers for hosting and network relay
                    services. The web app is hosted on Vercel, the signaling server runs on Microsoft
                    Azure, and when a relay is needed, encrypted file data passes through
                    Cloudflare&apos;s TURN network. For usage analytics we use only Umami, which is
                    cookieless and does not track you across sites, and we optionally use Sentry for
                    error monitoring. The link you share carries its room id in the URL fragment (the
                    part after the <InlineCode>#</InlineCode>). Browsers never include the fragment in
                    HTTP requests, so it stays out of hosting logs, referrer headers, and analytics.
                    Our signaling server receives the room id only when your app joins the room to be
                    paired with your peer; it is held in memory for the life of the session and never
                    logged. Please refer to each provider&apos;s privacy policy regarding data
                    handling.
                </p>
            </LegalSection>

            <LegalSection id="relay" index="04" title="Relay server">
                <p>
                    When a direct connection cannot be established, file data can be routed through
                    the TURN relay configured by the operator of your Rilldrop deployment. The relay
                    processes encrypted data packets in transit and does not store, decrypt, or inspect
                    file contents. Relay sessions are limited to 2 GB. The infrastructure provider may
                    log connection metadata such as timestamps and IP addresses.
                </p>
            </LegalSection>

            <LegalSection id="errors" index="05" title="Error monitoring">
                <p>
                    A deployment operator can enable Sentry for web-app error and performance
                    monitoring. Rilldrop Desktop and the CLI contain no Sentry integration. When
                    enabled, Sentry may capture:
                </p>
                <LegalList
                    items={[
                        'Error stack traces and browser metadata (browser version, OS, device type)',
                        'Connection type (direct or relay), transfer progress, file count, and total size at the time of an error',
                    ]}
                />
                <p>
                    Session replay is{' '}
                    <strong className="font-semibold text-zinc-200">not</strong> enabled. Rilldrop used to
                    record a sample of browser sessions. A recording reported the page address, and on
                    a receiver page that address contains the room link, so replay was removed rather
                    than kept: the room link is the only thing protecting a transfer.
                </p>
                <p>
                    Sentry does <strong className="font-semibold text-zinc-200">not</strong> capture
                    file names, file contents, or any personally identifiable information. The room
                    link is stripped from every error report and breadcrumb before it is sent.{' '}
                    <a
                        href="https://sentry.io/privacy/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-rill"
                    >
                        Sentry Privacy Policy
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection id="analytics" index="06" title="Usage analytics">
                <p>
                    A deployment operator can enable Umami, a privacy-focused analytics tool, for the
                    web app. Rilldrop Desktop and the CLI contain no Umami integration. When enabled,
                    Umami collects:
                </p>
                <LegalList
                    items={[
                        'Aggregate transfer metrics: number of files and total bytes transferred per session',
                        'Connection type (direct or relay) and whether a transfer succeeded or failed',
                        'Standard page view data: pages visited, browser type, country (not city)',
                    ]}
                />
                <p>
                    Umami does <strong className="font-semibold text-zinc-200">not</strong> use
                    cookies, does not collect personally identifiable information, and does not track
                    individuals across sessions or websites. File names and file contents are never
                    recorded.{' '}
                    <a
                        href="https://umami.is/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-rill"
                    >
                        Umami Privacy Policy
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection id="desktop" index="07" title="The desktop app">
                <p>
                    Rilldrop Desktop is the same peer-to-peer engine as the web app and the CLI, running
                    as a Windows application. Its network behavior is identical: it contacts the
                    configured signaling server to pair you with your peer, fetches relay credentials, and then
                    streams file data directly between devices. It contains{' '}
                    <strong className="font-semibold text-zinc-200">
                        no analytics, no error monitoring, and no telemetry
                    </strong>
                    . It makes two optional requests, each with its own off switch: the same
                    anonymous byte total described above, which you can turn off with &quot;Contribute
                    to global stats&quot; in Settings, and a once-a-day update check. The update check
                    (GitHub builds 0.2.3 and later) asks GitHub whether a newer release exists; it
                    carries nothing about you beyond what any web request reveals (your IP address
                    and a user agent), nothing about your files or transfers is in it, and nothing
                    downloads or installs by itself. Turn off &quot;Check for updates&quot; in
                    Settings and no request is made at all. Packaged MSIX builds never check because
                    their package manager owns updates.
                </p>
                <p>Everything else it does stays on your device:</p>
                <LegalList
                    marker={null}
                    items={[
                        <>
                            <strong className="font-semibold text-zinc-200">Clipboard.</strong> The
                            app reads your clipboard only when you paste (Ctrl+V) to stage copied
                            files or a screenshot for sending. It never reads the clipboard in the
                            background.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">Files.</strong> Received
                            files are written to the folder you choose (your Downloads folder by
                            default). Nothing is uploaded anywhere.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">Settings.</strong> Your
                            preferences are stored locally in your user profile and are not removed
                            automatically when the app is uninstalled.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">
                                Optional right-click menu.
                            </strong>{' '}
                            The GitHub build can add a &quot;Send with Rilldrop&quot; entry to the File
                            Explorer right-click menu. Turning it on writes one per-user registry
                            entry; turning it off (or uninstalling) removes it. Packaged MSIX builds
                            do not offer this entry.
                        </>,
                        <>
                            <strong className="font-semibold text-zinc-200">Notifications.</strong>{' '}
                            The app shows standard Windows notifications when a transfer completes or
                            fails.
                        </>,
                    ]}
                />
            </LegalSection>

            <LegalSection id="contact" index="08" title="Contact & abuse reports">
                <p>
                    Questions about this policy, bug reports, and abuse reports all go to the public
                    issue tracker:{' '}
                    <a
                        href="https://github.com/Arnavsharma2/rilldrop/issues"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-rill"
                    >
                        github.com/Arnavsharma2/rilldrop/issues
                    </a>
                    .
                </p>
                <p>
                    Because Rilldrop is peer-to-peer, transferred content never reaches the signaling
                    server. Project maintainers cannot see, store, or remove files that users send to
                    each other. Deployment operators can restrict abusive use of their signaling and
                    relay infrastructure. If you receive illegal or harmful content, stop accepting
                    transfers from that sender and contact the operator of the deployment you used.
                </p>
            </LegalSection>
        </LegalShell>
    );
}
