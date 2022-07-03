import { useEffect, useRef } from 'react';
import imageSrc from './omr.png';
import { makeAverageRGBA, rgbaAvgDistance } from './utils/calculator';
import { drawShape, getRGBACells } from './utils/drawer';
import { smallBox } from './utils/shapeData';
import { BoxData, RGBA } from './utils/types';

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

        const rgbaData = ctx.getImageData(
          smallBox.x,
          smallBox.y,
          smallBox.width,
          smallBox.height
        ).data;
        const rgbaCells = getRGBACells(rgbaData);
        const origin: RGBA = {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        };

        console.log(rgbaAvgDistance(origin, rgbaCells));
        console.log(rgbaCells);
        console.log(makeAverageRGBA(rgbaCells));

        //small box
        drawBox({
          ...smallBox,
          strokeStyle: '#4c00ff',
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
