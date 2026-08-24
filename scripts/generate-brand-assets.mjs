import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const pnpmModules = join(repositoryRoot, 'client', 'node_modules', '.pnpm');
const sharpPackage = (await readdir(pnpmModules)).find((name) => name.startsWith('sharp@'));

if (!sharpPackage) {
    throw new Error('Sharp is unavailable. Run `pnpm install` in client/ first.');
}

const sharpEntry = join(pnpmModules, sharpPackage, 'node_modules', 'sharp', 'dist', 'index.mjs');
const { default: sharp } = await import(pathToFileURL(sharpEntry).href);
const sourcePath = join(repositoryRoot, 'desktop', 'build', 'appicon.svg');
const sourceSvg = await readFile(sourcePath);
const sourcePng = await sharp(sourceSvg, { density: 192 }).resize(1024, 1024).png().toBuffer();
const croppedPng = await sharp(sourcePng).extract({ left: 40, top: 40, width: 944, height: 944 }).png().toBuffer();

async function square(size, output, { cropped = false } = {}) {
    const input = cropped ? croppedPng : sourcePng;
    await sharp(input).resize(size, size, { fit: 'fill' }).png().toFile(join(repositoryRoot, output));
}

await writeFile(join(repositoryRoot, 'desktop', 'build', 'appicon.png'), sourcePng);
await square(180, 'client/app/apple-icon.png');
await square(192, 'client/public/icon-192.png');
await square(512, 'client/public/icon-512.png');
await square(512, 'client/public/icon-maskable-512.png', { cropped: true });

const scales = [100, 125, 150, 200, 400];
const squareFamilies = new Map([
    ['Square44x44Logo', 44],
    ['Square150x150Logo', 150],
    ['StoreLogo', 50],
]);
const msixAssets = join(repositoryRoot, 'desktop', 'build', 'msix', 'assets');

for (const [name, base] of squareFamilies) {
    for (const scale of scales) {
        const size = Math.ceil((base * scale) / 100);
        const suffix = scale === 100 ? '' : `.scale-${scale}`;
        await sharp(sourcePng).resize(size, size).png().toFile(join(msixAssets, `${name}${suffix}.png`));
    }
}

for (const scale of scales) {
    const width = Math.ceil((310 * scale) / 100);
    const height = Math.ceil((150 * scale) / 100);
    const icon = await sharp(sourcePng).resize(height, height).png().toBuffer();
    const left = Math.round((width - height) / 2);
    const suffix = scale === 100 ? '' : `.scale-${scale}`;
    await sharp(icon)
        .extend({ left, right: width - height - left, top: 0, bottom: 0, background: '#00000000' })
        .png()
        .toFile(join(msixAssets, `Wide310x150Logo${suffix}.png`));
}

const targetSizes = [16, 20, 24, 30, 32, 36, 40, 48, 60, 64, 72, 80, 96, 256];
const targetForms = ['', '_altform-unplated', '_altform-lightunplated'];

for (const size of targetSizes) {
    const png = await sharp(croppedPng).resize(size, size).png().toBuffer();
    for (const form of targetForms) {
        await writeFile(join(msixAssets, `Square44x44Logo.targetsize-${size}${form}.png`), png);
    }
}

function encodeIco(images) {
    const directorySize = 6 + images.length * 16;
    const header = Buffer.alloc(directorySize);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(images.length, 4);

    let offset = directorySize;
    images.forEach(({ size, data }, index) => {
        const entry = 6 + index * 16;
        header.writeUInt8(size === 256 ? 0 : size, entry);
        header.writeUInt8(size === 256 ? 0 : size, entry + 1);
        header.writeUInt8(0, entry + 2);
        header.writeUInt8(0, entry + 3);
        header.writeUInt16LE(1, entry + 4);
        header.writeUInt16LE(32, entry + 6);
        header.writeUInt32LE(data.length, entry + 8);
        header.writeUInt32LE(offset, entry + 12);
        offset += data.length;
    });

    return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const faviconImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({
        size,
        data: await sharp(croppedPng).resize(size, size).png().toBuffer(),
    }))
);
await writeFile(join(repositoryRoot, 'client', 'app', 'favicon.ico'), encodeIco(faviconImages));

const desktopIconImages = await Promise.all(
    [16, 24, 32, 48, 64, 128, 256].map(async (size) => ({
        size,
        data: await sharp(croppedPng).resize(size, size).png().toBuffer(),
    }))
);
await writeFile(
    join(repositoryRoot, 'desktop', 'build', 'windows', 'icon.ico'),
    encodeIco(desktopIconImages)
);

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="80" y1="40" x2="1120" y2="590" gradientUnits="userSpaceOnUse">
      <stop stop-color="#020617"/>
      <stop offset="0.55" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#042f2e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" rx="40" fill="url(#bg)"/>
  <circle cx="1020" cy="80" r="250" fill="#14b8a6" opacity="0.10"/>
  <circle cx="1090" cy="610" r="330" fill="#2563eb" opacity="0.10"/>
  <path d="M235 142c-31 69-129 145-129 253a129 129 0 0 0 258 0c0-108-98-184-129-253Z" fill="#5eead4"/>
  <path d="M145 401c53-45 128-45 181 0M160 446c43-30 109-30 151 0" fill="none" stroke="#0f766e" stroke-width="25" stroke-linecap="round"/>
  <text x="430" y="300" fill="#f8fafc" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="108" font-weight="760">Rilldrop</text>
  <text x="435" y="375" fill="#99f6e4" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="35" font-weight="520">Private peer-to-peer file transfer</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(repositoryRoot, 'client', 'public', 'og.png'));

console.log('Generated Rilldrop web, desktop, Store, and social brand assets.');
