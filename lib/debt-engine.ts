import type { DebtResult } from '../app/[locale]/tools/types';

// Entrada ya parseada y filtrada (balance > 0) en el borde. `apr` es el % anual.
export interface DebtInput {
  nombre: string;
  balance: number;
  apr: number;
  pmt: number;
}

interface DeudaSim { nombre: string; balance: number; r: number; pmt: number }

// Simulación acelerada: la `bolsa` (extra + pagos liberados + pago único en el
// mes 1) se aplica a las deudas en el orden dado por `criterio`, que se fija
// una sola vez al inicio. Avalancha y Bola de Nieve solo difieren en él.
function simularAcelerada(
  deudas: DeudaSim[],
  criterio: (a: DeudaSim, b: DeudaSim) => number,
  inyeccionMensualFija: number,
  pagoUnicoDisponible: number,
  aplicarPagosLiberados: boolean,
): { meses: number; intereses: number; cap: boolean } {
  let active = [...deudas].sort(criterio);
  let meses = 0, totalIntereses = 0;
  let pagosLiberados = 0;
  while (active.length > 0 && meses < 360) {
    meses++;
    let bolsa = inyeccionMensualFija + pagosLiberados + (meses === 1 ? pagoUnicoDisponible : 0);
    active.forEach(d => { const im = d.balance * d.r; totalIntereses += im; d.balance += im; });
    active.forEach(d => { const p = Math.min(d.pmt, d.balance); d.balance -= p; });
    for (const d of active) { if (d.balance > 0 && bolsa > 0) { const extra = Math.min(bolsa, d.balance); d.balance -= extra; bolsa -= extra; } }
    const eliminadas = active.filter(d => d.balance <= 0.01);
    if (aplicarPagosLiberados) pagosLiberados += eliminadas.reduce((sum, d) => sum + d.pmt, 0);
    active = active.filter(d => d.balance > 0.01);
  }
  return { meses, intereses: totalIntereses, cap: active.length > 0 };
}

export function calcularEstrategia(
  deudas: DebtInput[],
  pagoExtra: number,
  pagoUnico: number,
  aplicarPagosLiberados: boolean,
): DebtResult {
  const inyeccionMensualFija = pagoExtra;
  const pagoUnicoDisponible = pagoUnico;
  const copia = () => deudas.map(d => ({ nombre: d.nombre, balance: d.balance, r: (d.apr / 100) / 12, pmt: d.pmt }));

  let activeReg = copia();
  let mesesRegular = 0, totalInteresesRegular = 0;
  while (activeReg.length > 0 && mesesRegular < 360) {
    mesesRegular++;
    activeReg = activeReg.filter(d => { const im = d.balance * d.r; totalInteresesRegular += im; const pe = Math.min(d.pmt, d.balance + im); d.balance = (d.balance + im) - pe; return d.balance > 0.01; });
  }
  const capRegular = activeReg.length > 0;

  const ordenAvalanche = [...deudas].sort((a, b) => b.apr - a.apr).map(d => d.nombre);
  const avalancha = simularAcelerada(copia(), (a, b) => b.r - a.r, inyeccionMensualFija, pagoUnicoDisponible, aplicarPagosLiberados);

  const ordenSnowball = [...deudas].sort((a, b) => a.balance - b.balance).map(d => d.nombre);
  const nieve = simularAcelerada(copia(), (a, b) => a.balance - b.balance, inyeccionMensualFija, pagoUnicoDisponible, aplicarPagosLiberados);

  return {
    mesesRegular, interesesRegular: Math.max(0, totalInteresesRegular),
    mesesAcelerado: avalancha.meses, interesesAcelerado: Math.max(0, avalancha.intereses),
    mesesAhorrados: Math.max(0, mesesRegular - avalancha.meses),
    dineroAhorrado: Math.max(0, totalInteresesRegular - avalancha.intereses),
    mesesSnowball: nieve.meses, interesesSnowball: Math.max(0, nieve.intereses),
    dineroAhorradoSnowball: Math.max(0, totalInteresesRegular - nieve.intereses),
    ordenAvalanche, ordenSnowball,
    capAlcanzado: capRegular || avalancha.cap || nieve.cap,
  };
}
