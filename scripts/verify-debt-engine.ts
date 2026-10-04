// Uso: npx tsx scripts/verify-debt-engine.ts
// Valores esperados independientes del motor; sale con código 1 si algo difiere.
import { calcularEstrategia, type DebtInput } from '../lib/debt-engine';

let fallos = 0;
function chk(nombre: string, real: unknown, esperado: unknown) {
  const ok = real === esperado;
  if (!ok) fallos++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${nombre}: real=${String(real)} esperado=${String(esperado)}`);
}

const deuda = (nombre: string, balance: number, apr: number, pmt: number): DebtInput => ({ nombre, balance, apr, pmt });
const deudasB = [deuda('Debt A', 5000, 20, 150), deuda('Debt B', 3000, 18, 100), deuda('Debt C', 11230, 6, 560)];

function tres(caso: string, r: ReturnType<typeof calcularEstrategia>, reg?: [number, number], ava?: [number, number], nie?: [number, number]) {
  if (reg) { chk(`${caso} regular meses`, r.mesesRegular, reg[0]); chk(`${caso} regular interés`, Math.round(r.interesesRegular), reg[1]); }
  if (ava) { chk(`${caso} avalancha meses`, r.mesesAcelerado, ava[0]); chk(`${caso} avalancha interés`, Math.round(r.interesesAcelerado), ava[1]); }
  if (nie) { chk(`${caso} nieve meses`, r.mesesSnowball, nie[0]); chk(`${caso} nieve interés`, Math.round(r.interesesSnowball), nie[1]); }
}

// A
tres('A', calcularEstrategia([deuda('Debt A', 5000, 20, 150)], 0, 0, true), [50, 2359], [50, 2359], [50, 2359]);

// B1
const b1 = calcularEstrategia(deudasB, 100, 0, true);
tres('B1', b1, [50, 4008], [25, 2587], [25, 2648]);
chk('B1 mesesAhorrados', b1.mesesAhorrados, 25);

// B2
tres('B2', calcularEstrategia(deudasB, 100, 0, false), undefined, [32, 2685], [35, 2895]);

// C
tres('C', calcularEstrategia(deudasB, 100, 500, false), undefined, [30, 2421], [33, 2666]);

// D
tres('D', calcularEstrategia([deuda('Debt D', 10000, 25, 210)], 0, 0, true), [235, 39256], [235, 39256], [235, 39256]);

// E: el pago mínimo apenas cubre el interés → se alcanza el tope de 360 meses
const e = calcularEstrategia([deuda('Debt E', 10000, 25, 200)], 0, 0, true);
chk('E capAlcanzado', e.capAlcanzado, true);

if (fallos > 0) { console.error(`\n${fallos} comprobación(es) fallaron`); process.exit(1); }
console.log('\nTodo OK');
