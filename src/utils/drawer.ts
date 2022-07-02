import { BoxData, RGBA } from './types';

export function drawShape<T>(
  ctx: CanvasRenderingContext2D,
  draw: (ctx: CanvasRenderingContext2D, shapeData: T) => void
) {
  return (shapeData: T) => {
    draw(ctx, shapeData);
  };
}

export function getRGBACells(rgbaData: Uint8ClampedArray): RGBA[] {
  const divideArrayToRGBA = (
    rgbaData: Uint8ClampedArray
  ): Uint8ClampedArray[] => {
    if (rgbaData.length < 4) return [];
    const head = rgbaData.slice(0, 4);
    const tails = [...divideArrayToRGBA(rgbaData.slice(4))];
    return [head, ...tails];
  };
  return divideArrayToRGBA(rgbaData).map(rgba => {
    return {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
    };
  });
}

export function moveBox(box: BoxData, x: number, y: number) {
  return {
    ...box,
    x: box.x + x,
    y: box.y + y,
  };
}
