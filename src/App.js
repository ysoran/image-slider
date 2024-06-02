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
      <div><b>Vanilla javascript</b> Optimized for centering the image</div>
      <div>Assuming in case the images are not big enough, we want to render them with their own sizes.</div>
      <div>You can see this case on latest image only.</div>
      <div>If we want images to stretch to the closest full size accoring to aspect ratio 400/600, then we need to remove line 30 on ImageSliderVanilla.js</div>
      <ImageSlider images={images} />

      <div>Canvas Slider</div>
      <div>
      <CanvasSlider images={images} />
      </div>
    </div>
  );
};

export default App;