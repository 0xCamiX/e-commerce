import { describe, expect, test } from 'bun:test';
import {
  landingHeroCopy,
  landingScrubSteps,
  landingTimelineLabels,
} from '@/components/landing/copy';

describe('landing T1 copy', () => {
  test('uses the exact left-hero placeholders', () => {
    expect(landingHeroCopy.h1).toBe(
      'Baja el calor que se siente. Sin gastar un kWh.',
    );
    expect(landingHeroCopy.sub.toLowerCase()).toContain(
      'hogar, bodega y local en colombia',
    );
  });

  test('scrubs timeline labels in the brief order', () => {
    expect(landingTimelineLabels).toEqual([
      'hogar',
      'bodega',
      'tallas',
      'hongo',
      'pintura',
      'indicadores',
      'cita',
      'beneficios',
    ]);
    expect(landingScrubSteps.map(step => step.id)).toEqual(
      landingTimelineLabels,
    );
  });

  test('marks the project quote as a placeholder', () => {
    const cita = landingScrubSteps.find(step => step.id === 'cita');
    expect(cita?.isPlaceholder).toBe(true);
    expect(cita?.body.toLowerCase()).toContain('juan');
  });

  test('does not invent m3/h or prices', () => {
    const blob = landingScrubSteps.map(s => `${s.title} ${s.body}`).join(' ');
    expect(blob).not.toMatch(/m³\/h|m3\/h|\bCOP\b|\$\d/i);
  });
});
