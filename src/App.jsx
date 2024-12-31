import { useState,useEffect } from 'react';
import MapView from './components/MapView';
import AddressForm from './components/AddressForm';
import LocationPermission from './components/LocationPermition';

function App() {

  const [showSlide, setShowSlide] = useState(false);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    if (!navigator.geolocation) {
      setShowSlide(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setShowSlide(false);
      },
      () => {
        setShowSlide(true);
      }
    );
  }, []);

  const handleForm = () => {
    setShowForm(true)
  }


  return (
    <>
      {showSlide ? <LocationPermission /> : <>
        <MapView/>
        {showForm && <AddressForm/>}
        <button onClick={handleForm}>Address Form</button>
      </>}
    </>
  )
}

export default App
