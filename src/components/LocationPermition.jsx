import { useState } from 'react';
import './locationperm.css'

const LocationPermission = () => {
  const [isLocationOn, setIsLocationOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationOn(true);
          console.log('Location:', position.coords);
        },
        (error) => {
          setIsLocationOn(false);
          setErrorMessage(getErrorMessage(error));
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access was denied. Please enable it in your device settings.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get location timed out.';
      default:
        return 'An unknown error occurred.';
    }
  };

  return (
    <div className="container">
      <div className="content">
        {isLocationOn ? (
          window.location.reload()
        ) : (
          <div>
            <h2>Enable Location Access</h2>
            <p>{errorMessage}</p>
            <button onClick={checkLocationPermission}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPermission;
