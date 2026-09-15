import { describe, expect, test } from 'bun:test';
import {
  landingChapters,
  landingGallery,
  landingMetrics,
  landingQuote,
} from '@/components/landing/copy';

describe('landing proposal copy', () => {
  test('covers the brief narrative blocks in order', () => {
    expect(landingChapters.map(chapter => chapter.id)).toEqual([
      'calor',
      'kwh',
      'hogar',
      'bodega',
      'tallas',
      'hongo',
      'pintura',
      'cotizar',
    ]);
  });

  test('exposes catalog sizes 24, 31 and 39', () => {
    const sizes = new Set(landingChapters.flatMap(c => c.highlightSizes));
    expect(sizes.has(24)).toBe(true);
    expect(sizes.has(31)).toBe(true);
    expect(sizes.has(39)).toBe(true);
  });

  test('marks gallery shots and the project quote as placeholders', () => {
    expect(landingGallery.every(shot => shot.placeholder)).toBe(true);
    expect(landingQuote.isPlaceholder).toBe(true);
    expect(landingQuote.meta.toLowerCase()).toContain('testimonio');
  });

  test('includes 0 kWh as a metric', () => {
    expect(landingMetrics.some(metric => metric.value === '0 kWh')).toBe(true);
  });
});
