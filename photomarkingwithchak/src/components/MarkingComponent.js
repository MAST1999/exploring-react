import { Box, Center, Heading, Text, usePrevious } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function MarkingComponent({ photo, label }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [firstCoordinations, setFirstCoordinations] = useState([]);
  const [secondCoordinations, setSecondCoordinations] = useState([]);
  const [dimensionsForCanvas, setDimensionsForCanvas] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.87,
  });
  const [color, setColor] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [drawing, setDrawing] = useState({ isDrawing: false });
  const [paintedPhoto, setPaintedPhoto] = useState([]);

  const prevPhoto = usePrevious({ photo });

  let img = document.createElement("img");
  img.src = photo;

  // DPI fix for canvas
  let dpi = window.devicePixelRatio;
  const fixDPI = () => {
    let styleHeight = +getComputedStyle(canvasRef.current)
      .getPropertyValue("height")
      .slice(0, -2);
    let styleWidth = +getComputedStyle(canvasRef.current)
      .getPropertyValue("width")
      .slice(0, -2);

    canvasRef.current.setAttribute("height", styleHeight * dpi);
    canvasRef.current.setAttribute("width", styleWidth * dpi);
  };

  useEffect(() => {
    if (
      firstCoordinations.length > 0 &&
      secondCoordinations.length > 0 &&
      drawing.isDrawing === false &&
      label.color !== ""
    ) {
      console.log(
        "color",
        color,
        "coordinations",
        firstCoordinations,
        secondCoordinations
      );
      rectangleDrawing(firstCoordinations, secondCoordinations);
    }
    if (label.color === "") {
      setFirstCoordinations([]);
      setSecondCoordinations([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing]);

  const saveFirstCoordinations = (Event) => {
    Event.preventDefault();

    const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
    const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;

    setDrawing({ isDrawing: true });

    setFirstCoordinations([
      ...firstCoordinations,
      { x: imgPixelAddressX, y: imgPixelAddressY },
    ]);
  };

  const saveSecondCoordinations = (Event) => {
    Event.preventDefault();

    const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
    const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;

    setSecondCoordinations([
      ...secondCoordinations,
      { x: imgPixelAddressX, y: imgPixelAddressY },
    ]);
    if (label.color !== "") {
      setColor([...color, label.color]);
    }

    setDrawing({ isDrawing: false });
  };

  const rectangleDrawing = (firstCoords, secondCoords) => {
    for (let i = secondCoords.length; i > 0; i--) {
      const maxHeight = Math.max(secondCoords[i - 1].y, firstCoords[i - 1].y);
      const maxWidth = Math.max(secondCoords[i - 1].x, firstCoords[i - 1].x);
      const minHeight = Math.min(secondCoords[i - 1].y, firstCoords[i - 1].y);
      const minWidth = Math.min(secondCoords[i - 1].x, firstCoords[i - 1].x);

      const widthOfRectangle = maxWidth - minWidth;

      const heightOfRectangle = maxHeight - minHeight;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.rect(minWidth, minHeight, widthOfRectangle, heightOfRectangle);

      ctx.lineWidth = 2;
      ctx.strokeStyle = color[i - 1];
      ctx.stroke();
    }
  };

  // adding the photo to the canvas
  useEffect(() => {
    if (photo === "") {
      return;
    } else {
      if (photo !== prevPhoto.photo) {
        setFirstCoordinations([]);
        setSecondCoordinations([]);
      }
      fixDPI();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth * 0.7;
      canvas.height = window.innerHeight * 0.87;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      img.onload = () => {
        var scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        setDimensionsForCanvas({
          width: img.width * scale,
          height: img.height * scale,
        });
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);

        rectangleDrawing(firstCoordinations, secondCoordinations);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  const resizeCanvas = () => {
    setReRender(!reRender);
  };

  window.onresize = resizeCanvas;

  if (photo === "") {
    return (
      <Center textAlign="center" h="100%">
        <Heading>Select A Photo To Start!</Heading>
      </Center>
    );
  }
  return (
    <Center ref={containerRef} m="0px" p="0px" h="100%">
      <Box
        as="canvas"
        ref={canvasRef}
        onMouseDown={saveFirstCoordinations}
        onMouseUp={saveSecondCoordinations}
        width={dimensionsForCanvas.width}
        height={dimensionsForCanvas.height}
      ></Box>
    </Center>
  );
}

export default MarkingComponent;
