import { useState, useRef } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { VITE_GOOGLE_MAPS_API_KEY } from "../utils/constants";

const libraries: "places"[] = ["places"];
const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 40.712776, lng: -74.005974 };

const Dashboard = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = () => {
    if (!inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current!,
      {
        types: ["restaurant"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.geometry?.location) {
        setSelectedPlace(place);

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(location);
      }
    });
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <>
        <div>
          <input
            type="text"
            ref={inputRef}
            placeholder="Search a place..."
            style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        {selectedPlace && (
          <div style={{ marginTop: "10px" }}>
            <p>
              <b>Selected Place:</b> {selectedPlace.name}
            </p>
            <p>
              <b>Address:</b> {selectedPlace.formatted_address}
            </p>
          </div>
        )}

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={14}
          onLoad={onLoad}
        >
          {selectedPlace?.geometry?.location && (
            <Marker
              position={{
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng(),
              }}
            />
          )}
        </GoogleMap>
      </>
    </LoadScriptNext>
  );
};

export default Dashboard;
