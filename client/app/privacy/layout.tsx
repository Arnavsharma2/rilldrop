import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Rilldrop',
    description:
        'Rilldrop privacy policy: peer-to-peer transfers, no file storage, and operator-controlled optional telemetry.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
