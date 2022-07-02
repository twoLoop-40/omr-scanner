import { RGBA } from './types';

export function makeAverageRGBA(rgbaCells: RGBA[]): RGBA {
  const rgbaSum = rgbaCells.reduce(
    (sum, cell) => {
      sum.r += cell.r;
      sum.g += cell.g;
      sum.b += cell.b;
      sum.a += cell.a;
      return sum;
    },
    { r: 0, g: 0, b: 0, a: 0 } as RGBA
  );
  const length = rgbaCells.length;
  rgbaSum.r = rgbaSum.r / length;
  rgbaSum.g = rgbaSum.g / length;
  rgbaSum.b = rgbaSum.b / length;
  rgbaSum.a = rgbaSum.a / length;

  return rgbaSum;
}
