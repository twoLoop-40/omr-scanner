import { useEffect, useRef } from 'react';
import imageSrc from './omr.png';
import { makeAverageRGBA, rgbaAvgDistance } from './utils/calculator';
import { drawShape, getCircleCenter, getRGBACells } from './utils/drawer';
import { smallBox } from './utils/shapeData';
import { BoxData, Point, RGBA } from './utils/types';

const BLACK_PIXEL = 130;
const OmrCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const drawBox = drawShape<BoxData>(ctx, (ctx, shapeData) => {
        ctx.strokeStyle = shapeData.strokeStyle || '#000';
        ctx.strokeRect(
          shapeData.x,
          shapeData.y,
          shapeData.width,
          shapeData.height
        );
      });
      const image = new Image();
      image.src = `${imageSrc}`;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        const offset = { x: 10, y: 10 };
        const rgbaData = ctx.getImageData(
          offset.x,
          offset.y,
          Math.floor(image.width / 4),
          Math.floor(image.height / 4)
        );
        const rgbaCells = getRGBACells(rgbaData, offset);
        const blackPixels = rgbaCells.filter(
          cell => cell.r + cell.g + cell.b < BLACK_PIXEL
        );
        const leftmost = blackPixels.reduce((acc, curr) => {
          return curr.x < acc.x ? curr : acc;
        });
        const uppermost = blackPixels.reduce((acc, curr) => {
          return curr.y < acc.y ? curr : acc;
        });

        const center = getCircleCenter<Point>(uppermost, leftmost);

        drawBox({
          ...center,
          width: 3,
          height: 3,
          strokeStyle: '#7ba956',
        });
        const origin: RGBA = {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        };

        console.log(rgbaAvgDistance(origin, rgbaCells));
        console.log(rgbaCells);
        console.log(makeAverageRGBA(rgbaCells));

        drawBox({
          ...smallBox,
          strokeStyle: '#f5f4f6',
          lineWidth: 1,
        });
      };
    }
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} width="1523px" height="1080px" />
    </>
  );
};

export default OmrCanvas;
