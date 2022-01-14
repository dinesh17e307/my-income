import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends React.Component {
  render() {
    return (
      <CarouselProvider
      playDirection='forward'
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
        isPlaying={true}
      >
        <Slider>
          <Slide index={0}><img src="/sampanki.jpg" width="100%"/></Slide>
          <Slide index={2}><img src="/tablogo.png" width="100%" /></Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}