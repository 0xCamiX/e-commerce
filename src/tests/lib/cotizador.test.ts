import { describe, expect, test } from 'bun:test';
import { siteConfig } from '@/config/site';
import {
  buildQuoteTotals,
  computeCapReal,
  computeVolume,
  paintCuñetesFromArea,
  simulate,
} from '@/lib/cotizador';

describe('cotizador volume simulation', () => {
  test('computes 2-slope volume', () => {
    const volume = computeVolume({
      largo: 20,
      ancho: 12,
      tipoCubierta: '2pend',
      hMin: 3,
      hMax: 6,
      hPared: 3.5,
      hCumbrera: 6.5,
      hMax3: 7,
      numNaves: 2,
      materialValue: 'metalica_simple',
      usoLabel: 'Bodega',
      viento: 4,
      modeloId: 31,
    });
    // L*A*hp + L*A*(hc-hp)/2 = 20*12*3.5 + 20*12*1.5 = 840 + 360 = 1200
    expect(volume).toBe(1200);
  });

  test('cap real equals base at 4 m/s wind', () => {
    expect(computeCapReal(12_500, 4)).toBe(12_500);
  });

  test('simulate returns extractor count from site prices/capacity', () => {
    const result = simulate({
      largo: 20,
      ancho: 12,
      tipoCubierta: '2pend',
      hMin: 3,
      hMax: 6,
      hPared: 3.5,
      hCumbrera: 6.5,
      hMax3: 7,
      numNaves: 2,
      materialValue: 'metalica_simple',
      usoLabel: 'Bodega',
      viento: 4,
      modeloId: 31,
    });

    expect(result.volumen).toBe(1200);
    expect(result.extractor?.price).toBe(
      siteConfig.extractors.find(e => e.id === 31)?.price,
    );
    expect(result.extractorCount).toBeGreaterThan(0);
  });
});

describe('cotizador pricing from siteConfig', () => {
  test('quote totals use extractor prices from siteConfig + IVA', () => {
    const hogar = siteConfig.extractors.find(e => e.id === 24);
    const bodega = siteConfig.extractors.find(e => e.id === 31);
    expect(hogar).toBeDefined();
    expect(bodega).toBeDefined();
    if (!hogar || !bodega) return;

    const totals = buildQuoteTotals(
      [
        { modeloId: 24, cantidad: 1 },
        { modeloId: 31, cantidad: 2 },
      ],
      false,
      0,
    );

    expect(totals.subtotal).toBe(hogar.price + bodega.price * 2);
    expect(totals.iva).toBe(totals.subtotal * siteConfig.taxRate);
    expect(totals.total).toBe(totals.subtotal + totals.iva);
  });

  test('paint cuñetes use site paint coverage/price', () => {
    expect(paintCuñetesFromArea(100)).toBe(2);
    const totals = buildQuoteTotals([], true, 100);
    expect(totals.paintCount).toBe(2);
    expect(totals.paintTotal).toBe(2 * siteConfig.paint.price);
  });
});
