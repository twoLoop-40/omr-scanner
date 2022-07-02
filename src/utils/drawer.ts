export function drawShape<T>(
  ctx: CanvasRenderingContext2D,
  draw: (ctx: CanvasRenderingContext2D, shapeData: T) => void
) {
  return (shapeData: T) => {
    draw(ctx, shapeData);
  };
}
