import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  overflow: hidden;
  width: 640px;
  height: 400px;
  position: relative;
  margin: auto;
  border: 1px solid #ccc;
`;

const Canvas = styled.div.attrs(({ x }) => ({
  style: {
    transform: `translate3d(${x}px, 0, 0)`,
  },
}))`
  display: flex;
  cursor: grab;
  user-select: none;
  height: 100%;
  will-change: transform;
`;

const ImageElement = styled.img`
  max-height: 400px;
  max-width: 640px;
  aspectRatio: 400 / 640;
  flex-shrink: 0;
  align-self: center; // Assuming we want images to show up on their real sizes, remove in case its not wanted.
`;

const ImageWrapper = styled.div`
    min-width:640px;
    display:flex;
    background: #eee;
    aspectRatio: 400 / 640;
    justify-content:center;
    align-content:center;
    overflow:hidden;
    border-right: "1px solid black";
`;

const Image = React.memo(({ src }) => (
    <ImageWrapper>
        <ImageElement src={src} draggable={false} />
    </ImageWrapper>
));

const ImageSlider = ({ images }) => {
  const containerRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [position, setPosition] = useState(0);

  const handleMouseDown = useCallback((event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!isDragging) return;

    const movementX = event.clientX - startX;
    setPosition((prevPosition) => {
      const newPosition = prevPosition + movementX;
      const containerWidth = containerRef.current.clientWidth;
      const imagesWidth = images.length * 640;
      const minX = Math.min(containerWidth - imagesWidth, 0);
      return Math.max(minX, Math.min(0, newPosition));
    });
    setStartX(event.clientX);
  }, [isDragging, startX, images]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      handleMouseMove(event);
    };
    const onMouseUp = () => {
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <SliderContainer>
      <Canvas
        ref={containerRef}
        onMouseDown={handleMouseDown}
        x={position}
      >
        {images.map((src, index) => (
          <Image key={index} src={src} />
        ))}
      </Canvas>
    </SliderContainer>
  );
};

export default ImageSlider;
