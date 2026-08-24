import React, { memo } from 'react';
import {
    FileImage,
    FileVideo,
    FileAudio,
    FileArchive,
    FileCode,
    FileText,
} from 'lucide-react';

interface FileIconProps {
    fileName: string;
    className?: string;
}

export type FileIconKind =
    | 'image'
    | 'video'
    | 'audio'
    | 'archive'
    | 'code'
    | 'text';

const imageExtensions = new Set([
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'svg',
    'bmp',
]);
const videoExtensions = new Set(['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv']);
const audioExtensions = new Set(['mp3', 'wav', 'ogg', 'm4a', 'flac']);
const archiveExtensions = new Set(['zip', 'rar', '7z', 'tar', 'gz']);
const codeExtensions = new Set([
    'js',
    'ts',
    'tsx',
    'jsx',
    'py',
    'html',
    'css',
    'json',
    'c',
    'cpp',
]);

/** Classifies with module-level sets instead of allocating arrays per row render. */
export function fileIconKind(fileName: string): FileIconKind {
    const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
    if (imageExtensions.has(extension)) return 'image';
    if (videoExtensions.has(extension)) return 'video';
    if (audioExtensions.has(extension)) return 'audio';
    if (archiveExtensions.has(extension)) return 'archive';
    if (codeExtensions.has(extension)) return 'code';
    return 'text';
}

const iconByKind = {
    image: FileImage,
    video: FileVideo,
    audio: FileAudio,
    archive: FileArchive,
    code: FileCode,
    text: FileText,
} satisfies Record<FileIconKind, typeof FileText>;

const FileIconComponent = ({
    fileName,
    className = 'h-4 w-4 text-zinc-200',
}: FileIconProps) => {
    const Icon = iconByKind[fileIconKind(fileName)];
    return <Icon className={className} aria-hidden="true" />;
};

export const FileIcon = memo(FileIconComponent);
FileIcon.displayName = 'FileIcon';
