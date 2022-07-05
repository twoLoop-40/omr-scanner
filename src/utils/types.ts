export interface BoxData {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeStyle?: string;
  lineWidth?: number;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RGBAPosition extends RGBA {
  x: number;
  y: number;
}
