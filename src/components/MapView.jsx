import { useState,useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import './mapview.css'

const contentview = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 77.1025,
    lng: 28.7041,
}

function MapView(){

    const [userLocation, setUserLocation] = useState(null);
    const [locateMe, setLocateMe] = useState(userLocation)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isSelect, setIsSelect] = useState(false)
    const [apiKey, setApiKey] = useState('');
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [open,setOpen] = useState(false);

    useEffect(() => {
        axios.get('/get-api-key').then((response) => {
            setApiKey(response.data.apiKey)
        })
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            setUserLocation(JSON.parse(savedLocation)); 
        }
        else if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const location=({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setUserLocation(location);
                localStorage.setItem('userLocation', JSON.stringify(location));
            },
            (error) => {
                console.error("Error getting User Location", error);
            }
            );
        }
        else{
            console.error("Geolocation is not supported in this browser!");
        }
    }, []);


    const handleSearch = async () => {
        if (!searchQuery) {
          alert("Please enter an address to search.");
          return;
        }
    
        try {
          const response = await axios.get(`http://localhost:3000/geocode`, {
            params: { address: searchQuery },
          });
    
          const results = response.data.results;
          if (results.length > 0) {
            const location = results[0].geometry.location;
            setSearchResult(location);
          } else {
            alert("No results found for the given address.");
          }
        } catch (error) {
          console.error("Error fetching geocode data:", error);
          alert("Error searching for the address.");
        }
      };



    if(!isLoaded){
        return <div>Loding........</div>
    }

    const handleMapClick = (event) => {
        const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
        setSelectedLocation(newLocation);
        localStorage.setItem('selectedLocation', JSON.stringify(newLocation));
        console.log(newLocation)
        setIsSelect(true)
        setOpen(true)
      };

    const showOrigin = () => {
        setLocateMe(userLocation)
        setSelectedLocation(userLocation);
        console.log(locateMe)
        setIsSelect(false)
        setOpen(true)
    }
    
    const capsuleStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '25px',
        fontSize: '14px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    };

    return(
        <>
            <button onClick={showOrigin}>Locate me</button>
            
            <div className="search-container">
                <input
                type="text"
                placeholder="Search for an address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="map">
                <GoogleMap mapContainerStyle={ contentview } center={ userLocation || center } zoom={16} mapTypeId="roadmap"  onClick={handleMapClick}>
                    {isSelect ? selectedLocation && <Marker position={selectedLocation}/> : locateMe && <Marker position={locateMe}/>}
                    {searchResult && <Marker position={searchResult} />} 
                    {open && (
                        <InfoWindow position={selectedLocation}  onCloseClick={() => setOpen(false)} options={{ pixelOffset: new google.maps.Size(0, -40) }} >
                        <div style={{ ...capsuleStyle, textAlign: 'center' }}>
                            <p>Your order will be deliver here <br /> Move Pin to your exact location</p>
                        </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>


        </>
    )


}

export default MapView;