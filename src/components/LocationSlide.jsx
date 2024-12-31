import { useState } from 'react';

const LocationSlide = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      title: 'We need your location!',
      description: 'Enable location to use map features.',

    },
    {
      title: 'How to enable location',
      description: 'Go to your device settings and turn on location.',

    },
    {
      title: 'Ready to enable?',
      description: 'Click the button below to allow location access.',

    },
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="location-slide">
      <h2>{slides[slideIndex].title}</h2>
      <p>{slides[slideIndex].description}</p>
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default LocationSlide;
