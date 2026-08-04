export interface Debt {
  id: number;
  nombre: string;
  balance: string;
  interesAnual: string;
  pagoMensual: string;
}

export interface ScoreReport {
  scoreTradicional: number;
  score10T: number;
  dictamenTradicional: string;
  dictamen10T: string;
  consejos: { titulo: string; detalle: string }[];
  desglose: { nombre: string; trad: number; tend: number; max: number }[];
}

export interface DebtResult {
  mesesRegular: number;
  interesesRegular: number;
  mesesAcelerado: number;
  interesesAcelerado: number;
  mesesAhorrados: number;
  dineroAhorrado: number;
  mesesSnowball: number;
  interesesSnowball: number;
  dineroAhorradoSnowball: number;
  ordenAvalanche: string[];
  ordenSnowball: string[];
  capAlcanzado: boolean;
}