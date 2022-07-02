import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { RGBA } from './atoms';
import imageSrc from './omr.png';
import { drawShape } from './utils/drawer';
import { smallBox } from './utils/shapeData';
import { BoxData } from './utils/types';

const OmrCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useRecoilState(RGBA);
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
        console.log(rgbaData.length, rgbaData);

        //small box
        drawBox({
          ...smallBox,
          strokeStyle: '#4c00ff',
          lineWidth: 1,
        });
      };
    }
  }, [canvasRef, result, setResult]);

  return (
    <>
      <canvas ref={canvasRef} width="1523px" height="1080px" />
    </>
  );
};

export default OmrCanvas;
