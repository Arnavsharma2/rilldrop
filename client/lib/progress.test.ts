import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Progress } from '../components/ui/progress';

describe('Progress', () => {
    it('exposes its value and accessible name', () => {
        const markup = renderToStaticMarkup(
            createElement(Progress, {
                value: 42,
                'aria-label': 'File upload progress',
            })
        );

        expect(markup).toContain('role="progressbar"');
        expect(markup).toContain('aria-valuenow="42"');
        expect(markup).toContain('aria-label="File upload progress"');
    });
});
