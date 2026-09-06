import { describe, expect, test } from 'bun:test';
import {
  catalogProducts,
  getActiveCatalog,
  getCatalogProduct,
} from '@/lib/catalog';

describe('catalog', () => {
  test('includes eólico and pintura products', () => {
    const categories = new Set(
      catalogProducts.map(product => product.category),
    );
    expect(categories.has('eolico')).toBe(true);
    expect(categories.has('pintura')).toBe(true);
  });

  test('resolves slug for extractor 31', () => {
    const product = getCatalogProduct('extractor-eolico-31');
    expect(product?.name).toContain('31');
    expect(product?.price).toBeGreaterThan(0);
  });

  test('active catalog is non-empty', () => {
    expect(getActiveCatalog().length).toBeGreaterThan(3);
  });
});
