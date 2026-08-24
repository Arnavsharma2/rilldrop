import { describe, expect, it } from 'vitest';
import { fileIconKind } from '../components/FileIcon';

describe('fileIconKind', () => {
    it.each([
        ['photo.JPG', 'image'],
        ['movie.webm', 'video'],
        ['voice.flac', 'audio'],
        ['backup.tar', 'archive'],
        ['component.tsx', 'code'],
        ['README', 'text'],
        ['archive.unknown', 'text'],
    ] as const)('classifies %s as %s', (fileName, kind) => {
        expect(fileIconKind(fileName)).toBe(kind);
    });
});
