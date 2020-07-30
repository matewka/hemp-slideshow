import React, { useEffect, useState } from 'react';
import './App.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'

function App() {
  const [images, setImages] = useState(null)
  useEffect(() => {
    async function fetch () {
      const response = await axios.get('http://localhost:8080/api/files')
      setImages(response.data)
    }

    fetch()
  }, [])

  if (!images) {
    return null
  }

  if (images.length === 0) {
    // TODO: show hemp logo or something
  }

  return (
    <div className="App">
      <Carousel className="carousel" autoPlay infiniteLoop showArrows={false} showStatus={false}
                showIndicators={false} showThumbs={false} stopOnHover={false} interval={2000}>
        {images.map((imageUrl, i) => (
          <Slide key={i} src={`http://localhost:8080/api/files/${imageUrl}`} />
        ))}
      </Carousel>
    </div>
  );
}

const Slide = (props) => {
  return <div className="slide" style={{ backgroundImage: `url(${props.src})` }} />
}

export default App;
