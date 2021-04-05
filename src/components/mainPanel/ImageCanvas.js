import { Box, Center } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Stage } from 'react-konva';
import LoadedImage from './LoadedImage';

function ImageCanvas({ photo, currentRegion }) {
  const [size, setSize] = useState({ width: 600, height: 1560 });

  const prevPhoto = useRef(null);
  const [rectAnnotations, setRectAnnotations] = useState([]);
  const [newRectAnnotation, setNewRectAnnotation] = useState([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (photo !== prevPhoto.current) setRectAnnotations([]);
    prevPhoto.current = photo;
  }, [photo]);

  const handleDragStart = event => {
    const id = event.target.id();
    setRectAnnotations(
      rectAnnotations.map(rect => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );
  };

  const handleDragEnd = () => {
    setDragging(false);
    setRectAnnotations(
      rectAnnotations.map(rect => {
        return {
          ...rect,
          isDragging: false,
        };
      })
    );
  };

  const handleDragMove = () => {
    setNewRectAnnotation([]);
  };

  const handleMouseDown = event => {
    console.log(newRectAnnotation.length, !dragging);
    if (newRectAnnotation.length === 0 && !dragging) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectAnnotation([
        { x, y, width: 0, height: 0, key: '0', color: currentRegion.color },
      ]);
    }
  };

  const handleMouseUp = event => {
    if (newRectAnnotation.length === 1) {
      const sx = newRectAnnotation[0].x;
      const sy = newRectAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: rectAnnotations.length + 1,
        isDragging: false,
        color: currentRegion.color,
      };
      rectAnnotations.push(annotationToAdd);
      setNewRectAnnotation([]);
      setRectAnnotations(rectAnnotations);
    }
  };

  const handleMouseMove = event => {
    if (newRectAnnotation.length === 1) {
      const sx = newRectAnnotation[0].x;
      const sy = newRectAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: '0',
          isDragging: false,
          color: currentRegion.color,
        },
      ]);
    }
  };

  console.log(currentRegion.color);

  const rectAnnotationsToDraw = [...rectAnnotations, ...newRectAnnotation];
  return (
    <Box flexGrow="1" h="100%" overflow="auto">
      {photo ? (
        <Stage
          width={size.width}
          height={size.height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            <LoadedImage photo={photo} setSize={setSize} size={size} />
          </Layer>
          <Layer>
            {rectAnnotationsToDraw.map((value, i) => {
              return (
                <Rect
                  draggable
                  key={i}
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke={value.color}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragMove={handleDragMove}
                />
              );
            })}
          </Layer>
        </Stage>
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
  currentRegion: PropTypes.object,
};

export default ImageCanvas;
