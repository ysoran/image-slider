import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  overflow: hidden;
  width: 640px;
  height: 400px;
  position: relative;
  margin: auto;
  border: 1px solid #ccc;
`;

const CanvasSlider = ({ images }) => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 400;

    const loadImages = async () => {
      const imgPromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (error) => reject(error);
          img.src = src;
        });
      });

      try {
        const loadedImagesResult = await Promise.all(imgPromises);
        setLoadedImages(loadedImagesResult);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    loadedImages.forEach((img, index) => {
      if (img.complete) {
        const aspectRatio = img.width / img.height;
        let scaledWidth, scaledHeight;

        if (img.width <= 640 && img.height <= 400) {
          // If the image is smaller than the canvas keep original size
          scaledWidth = img.width;
          scaledHeight = img.height;
        } else {
          // Otherwise fit the image within the canvas while extending to our aspect ratio
          if (aspectRatio > 640 / 400) {
            // Image is wider so scale width to fit
            scaledWidth = 640;
            scaledHeight = scaledWidth / aspectRatio;
          } else {
            // Image is taller so scale height to fit
            scaledHeight = 400;
            scaledWidth = scaledHeight * aspectRatio;
          }
        }

        // horizontally
        const x = (canvas.width - scaledWidth) / 2 + index * 640 + position; 
        const y = (canvas.height - scaledHeight) / 2; // cnter vertically
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      }
    });
  }, [loadedImages, position]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const movementX = e.clientX - startX;
        setStartX(e.clientX);
        setPosition((prevPosition) => {
          const containerWidth = canvasRef.current.clientWidth;
          const imagesWidth = loadedImages.length * 640;
          const minX = Math.min(containerWidth - imagesWidth, 0);
          return Math.max(minX, Math.min(0, prevPosition + movementX));
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, loadedImages]);

  return (
    <SliderContainer>
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    />
    </SliderContainer>
  );
};

export default CanvasSlider;
