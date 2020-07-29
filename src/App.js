import React from 'react';
import './App.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel'

function App() {
  return (
    <div className="App">
      <Carousel className="carousel" autoPlay infiniteLoop showArrows={false} showStatus={false}
                showIndicators={false} showThumbs={false} stopOnHover={false} interval={6000}>
        <Slide src="https://picsum.photos/200/300"/>
        <Slide src="https://picsum.photos/300/200"/>
        <Slide src="https://picsum.photos/200/500"/>
        <Slide src="https://picsum.photos/200/450"/>
        <Slide src="https://picsum.photos/400/500"/>
        <Slide src="https://picsum.photos/400/700"/>
      </Carousel>
    </div>
  );
}

const Slide = (props) => {
  return <div className="slide" style={{ backgroundImage: `url(${props.src})` }} />
}

export default App;
