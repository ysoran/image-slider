import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-use-gesture';

const SliderContainer = styled.div`
  overflow: hidden;
  width: 640px;
  height: 400px;
  position: relative;
  margin: auto;
  border: 1px solid #ccc; 
`;

const Canvas = styled.div`
  display: flex;
  cursor: grab;
  user-select: none;
  height: 100%;
  will-change: transform;
  transform: ${({ x }) => `translate3d(${x}px, 0, 0)`};
`;

const Image = styled.img`
  height: 400px;
  flex-shrink: 0;
`;

const slidingRatio = 20/640; // Adjust the sliding ratio as needed, I did not optimize

const ImageSlider = ({ images }) => {
  const containerRef = useRef();
  const [position, setPosition] = useState(0);

  const bind = useDrag(
    ({ active, movement: [mx] }) => {
      if (active) {
        const containerWidth = containerRef.current.clientWidth;
        const imagesWidth = images.length * 640;
        const minX = Math.min(containerWidth - imagesWidth, 0);

        let newPosition = position + mx * slidingRatio;

        if (newPosition > 0) {
          newPosition = 0;
        } else if (newPosition < minX) {
          newPosition = minX;
        }

        setPosition(newPosition);
      }
    },
    { axis: 'x' }
  );

  return (
    <SliderContainer ref={containerRef}>
      <Canvas {...bind()} x={position}>
        {images.map((src, index) => (
          <Image key={index} src={src} draggable={false} />
        ))}
      </Canvas>
    </SliderContainer>
  );
};

export default ImageSlider;
