import { BoxData, RGBAPosition } from './types';

export function drawShape<T>(
  ctx: CanvasRenderingContext2D,
  draw: (ctx: CanvasRenderingContext2D, shapeData: T) => void
) {
  return (shapeData: T) => {
    draw(ctx, shapeData);
  };
}
interface Offset {
  x: number;
  y: number;
}
export function getRGBACells(
  imageData: ImageData,
  offset: Offset
): RGBAPosition[] {
  const divideArrayToRGBA = (
    rgbaData: Uint8ClampedArray
  ): Uint8ClampedArray[] => {
    const rgbaArray = [];
    for (let i = 0; i < rgbaData.length; i += 4) {
      rgbaArray.push(rgbaData.slice(i, i + 4));
    }
    return rgbaArray;
  };
  const { width } = imageData;
  return divideArrayToRGBA(imageData.data).map((rgba, idx) => {
    const x = (idx % width) + offset.x;
    const y = Math.floor(idx / width) + offset.y;
    return {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
      x,
      y,
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
