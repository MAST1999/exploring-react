import { Box, Center } from '@chakra-ui/layout';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ImageCanvas({ photo }) {
  const canvas = useRef(null);

  let dpi = window.devicePixelRatio;
  const fixDPI = () => {
    let styleHeight = +getComputedStyle(canvas.current)
      .getPropertyValue('height')
      .slice(0, -2);
    let styleWidth = +getComputedStyle(canvas.current)
      .getPropertyValue('width')
      .slice(0, -2);
    console.log(styleHeight, styleWidth, dpi);
    canvas.current.setAttribute('height', styleHeight * dpi);
    canvas.current.setAttribute('width', styleWidth * dpi);
  };

  const draw = () => {
    fixDPI();
    let ctx = canvas.current.getContext('2d');
    let image = new Image();
    image.onload = () => {
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );
    };

    image.src = photo;
    console.log(image.src);
  };

  useEffect(() => {
    if (!photo) return;
    draw();
  }, [photo]);

  return (
    <Box flexGrow="1" h="100%" overflow="auto">
      {photo ? (
        <Box as="canvas" ref={canvas} w={900} h={600} />
      ) : (
        <Center h="100%" flexGrow="1">
          Select a photo to start
        </Center>
      )}
    </Box>
  );
}

ImageCanvas.propTypes = {
  photo: PropTypes.string,
};

export default ImageCanvas;
