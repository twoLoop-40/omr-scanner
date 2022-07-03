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

export function rgbaAvgDistance(origin: RGBA, pixels: RGBA[]) {
  const rgbaDistance = (pixel1: RGBA, pixel2: RGBA) => {
    const distR = Math.abs(pixel1.r - pixel2.r);
    const distG = Math.abs(pixel1.g - pixel2.g);
    const distB = Math.abs(pixel1.b - pixel2.b);
    const distA = Math.abs(pixel1.a - pixel2.a);
    return Math.sqrt(distR ** 2 + distG ** 2 + distB ** 2 + distA ** 2);
  };
  const rgbaSum = pixels
    .map(cell => rgbaDistance(cell, origin))
    .reduce((total, curr) => total + curr);
  return rgbaSum / pixels.length;
}
