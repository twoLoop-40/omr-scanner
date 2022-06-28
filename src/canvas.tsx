import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { RGBA } from "./atoms";
import imageSrc from "./omr.png";

const OmrCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useRecoilState(RGBA);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    if (ctx) {
      const image = new Image();
      image.src = `${imageSrc}`;
      image.onload = () => {
        ctx!.drawImage(image, 0, 0);

        //small box
        ctx.strokeStyle = "#4c00ff";
        const smallBoxWidth = 11;
        const smallBoxHeigh = 17;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.strokeRect(185, 512.5, smallBoxWidth, smallBoxHeigh);
        const data = ctx?.getImageData(
          185,
          512.5,
          smallBoxWidth,
          smallBoxHeigh
        ).data;
        for (let i = 0; i < data.length; i += 4)
          setResult((result: any) => [...result, data.slice(i, i + 4)]);
        console.log(result);

        //기준
        ctx.beginPath();
        ctx.moveTo(151, 73);
        ctx.lineTo(191, 73);
        ctx.strokeStyle = "#22ff00";
        ctx.stroke();

        //bigbox
        ctx.strokeStyle = "#ff3c00";
        const bigBoxWidth = 165;
        const bigBoxHight = 15;
        const bigBoxGap = 24;
        ctx.strokeRect(590, 183, bigBoxWidth, bigBoxHight);
        ctx.strokeRect(
          590,
          183 + bigBoxHight * 1 + bigBoxGap * 1,
          bigBoxWidth,
          bigBoxHight
        );
        ctx.strokeRect(
          590,
          183 + bigBoxHight * 2 + bigBoxGap * 2,
          bigBoxWidth,
          bigBoxHight
        );
        ctx.strokeRect(
          590,
          183 + bigBoxHight * 3 + bigBoxGap * 3,
          bigBoxWidth,
          bigBoxHight
        );
        ctx.strokeRect(
          590,
          183 + bigBoxHight * 4 + bigBoxGap * 4,
          bigBoxWidth,
          bigBoxHight
        );

        //gap measure - 11
        ctx.strokeStyle = "#ff00f7";
        ctx.beginPath();
        ctx.moveTo(755, 183);
        ctx.lineTo(766, 183);
        ctx.stroke();
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
