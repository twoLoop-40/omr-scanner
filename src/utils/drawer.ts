export function drawShape<T>(
  ctx: CanvasRenderingContext2D,
  draw: (ctx: CanvasRenderingContext2D, shapeData: T) => void
) {
  return (shapeData: T) => {
    draw(ctx, shapeData);
  };
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
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
