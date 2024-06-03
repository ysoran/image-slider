import React from 'react';
import ImageSlider from './ImageSlider';
import CanvasSlider from './CanvasSlider';
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import imageLong from "./assets/imageLong.jpeg";
import imageWide from "./assets/imageWide.jpeg";
import imageTiny from "./assets/imageTiny.png";

const images = [
  image5,
  imageLong,
  imageWide,
  image3,
  image4,
  imageTiny,
];


const App = () => {
  return (
    <div className="App">
      <p>Vanilla javascript</p>
      <ImageSlider images={images} />
      <p>Canvas Slider</p>
      <CanvasSlider images={images} />
    </div>
  );
};

export default App;