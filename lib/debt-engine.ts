import type { DebtResult } from '../app/[locale]/tools/types';

// Entrada ya parseada y filtrada (balance > 0) en el borde. `apr` es el % anual.
export interface DebtInput {
  nombre: string;
  balance: number;
  apr: number;
  pmt: number;
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
  let activeAce = copia().sort((a, b) => b.r - a.r);
  let mesesAcelerado = 0, totalInteresesAcelerado = 0;
  let pagosLiberadosAce = 0;
  while (activeAce.length > 0 && mesesAcelerado < 360) {
    mesesAcelerado++;
    let bolsa = inyeccionMensualFija + pagosLiberadosAce + (mesesAcelerado === 1 ? pagoUnicoDisponible : 0);
    activeAce.forEach(d => { const im = d.balance * d.r; totalInteresesAcelerado += im; d.balance += im; });
    activeAce.forEach(d => { const p = Math.min(d.pmt, d.balance); d.balance -= p; });
    for (const d of activeAce) { if (d.balance > 0 && bolsa > 0) { const extra = Math.min(bolsa, d.balance); d.balance -= extra; bolsa -= extra; } }
    const eliminadasAce = activeAce.filter(d => d.balance <= 0.01);
    if (aplicarPagosLiberados) pagosLiberadosAce += eliminadasAce.reduce((sum, d) => sum + d.pmt, 0);
    activeAce = activeAce.filter(d => d.balance > 0.01);
  }
  const capAcelerado = activeAce.length > 0;

  const ordenSnowball = [...deudas].sort((a, b) => a.balance - b.balance).map(d => d.nombre);
  let activeSnow = copia().sort((a, b) => a.balance - b.balance);
  let mesesSnowball = 0, totalInteresesSnowball = 0;
  let pagosLiberadosSnow = 0;
  while (activeSnow.length > 0 && mesesSnowball < 360) {
    mesesSnowball++;
    let bolsa = inyeccionMensualFija + pagosLiberadosSnow + (mesesSnowball === 1 ? pagoUnicoDisponible : 0);
    activeSnow.forEach(d => { const im = d.balance * d.r; totalInteresesSnowball += im; d.balance += im; });
    activeSnow.forEach(d => { const p = Math.min(d.pmt, d.balance); d.balance -= p; });
    for (const d of activeSnow) { if (d.balance > 0 && bolsa > 0) { const extra = Math.min(bolsa, d.balance); d.balance -= extra; bolsa -= extra; } }
    const eliminadasSnow = activeSnow.filter(d => d.balance <= 0.01);
    if (aplicarPagosLiberados) pagosLiberadosSnow += eliminadasSnow.reduce((sum, d) => sum + d.pmt, 0);
    activeSnow = activeSnow.filter(d => d.balance > 0.01);
  }
  const capSnowball = activeSnow.length > 0;

  return {
    mesesRegular, interesesRegular: Math.max(0, totalInteresesRegular),
    mesesAcelerado, interesesAcelerado: Math.max(0, totalInteresesAcelerado),
    mesesAhorrados: Math.max(0, mesesRegular - mesesAcelerado),
    dineroAhorrado: Math.max(0, totalInteresesRegular - totalInteresesAcelerado),
    mesesSnowball, interesesSnowball: Math.max(0, totalInteresesSnowball),
    dineroAhorradoSnowball: Math.max(0, totalInteresesRegular - totalInteresesSnowball),
    ordenAvalanche, ordenSnowball,
    capAlcanzado: capRegular || capAcelerado || capSnowball,
  };
}
