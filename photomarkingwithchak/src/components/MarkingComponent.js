import { Box, Center, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function MarkingComponent({ photo }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [firstCoordinations, setFirstCoordinations] = useState([]);
  const [secondCoordinations, setSecondCoordinations] = useState([]);
  const [dimensionsForCanvas, setDimensionsForCanvas] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.87,
  });
  const [reRender, setReRender] = useState(false);

  let img = document.createElement("img");
  img.src = photo;

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

  const useStateRef = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const ref = useRef(value);
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return [value, setValue, ref];
  };

  const saveFirstCoordinations = (Event) => {
    Event.preventDefault();
    const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
    const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;
    setFirstCoordinations([
      ...firstCoordinations,
      { x: imgPixelAddressX, y: imgPixelAddressY },
    ]);
  };

  const saveSecondCoordinations = (Event) => {
    Event.preventDefault();
    const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
    const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;
    if (secondCoordinations.length === 0) {
      setSecondCoordinations(
        secondCoordinations.push({ x: imgPixelAddressX, y: imgPixelAddressY })
      );
    }
    setSecondCoordinations([
      ...secondCoordinations,
      { x: imgPixelAddressX, y: imgPixelAddressY },
    ]);
    rectangleDrawing();
  };

  const rectangleDrawing = (Event) => {
    console.log(firstCoordinations, secondCoordinations);
    const maxHeight = Math.max(
      secondCoordinations[secondCoordinations.length - 1].y,
      firstCoordinations[firstCoordinations.length - 1].y
    );
    const maxWidth = Math.max(
      secondCoordinations[secondCoordinations.length - 1].x,
      firstCoordinations[firstCoordinations.length - 1].x
    );
    const minHeight = Math.min(
      secondCoordinations[secondCoordinations.length - 1].y,
      firstCoordinations[firstCoordinations.length - 1].y
    );
    const minWidth = Math.min(
      secondCoordinations[secondCoordinations.length - 1].x,
      firstCoordinations[firstCoordinations.length - 1].x
    );

    const widthOfRectangle = maxWidth - minWidth;

    const heightOfRectangle = maxHeight - minHeight;

    console.log(widthOfRectangle, heightOfRectangle);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(minWidth, minHeight, widthOfRectangle, heightOfRectangle);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  useEffect(() => {
    if (photo === "") {
      return;
    } else {
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
      };
    }
  }, [photo]);

  const resizeCanvas = () => {
    setReRender(!reRender);
  };

  window.onresize = resizeCanvas;

  if (photo === "") {
    return (
      <Box>
        <Text>Select A Photo To Start!</Text>
      </Box>
    );
  }
  return (
    <Center ref={containerRef} h="100%">
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
