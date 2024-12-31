import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { VITE_GOOGLE_MAPS_API_KEY } from "../utils/constants";

const libraries: "places"[] = ["places"]; // Ensure "places" is included
const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 40.712776, lng: -74.005974 }; // Example: New York City

const PlacesAutocomplete = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter); // Center of the map
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = () => {
    if (!inputRef.current) return;

    // Initialize Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current!,
      {}
    );

    // Add event listener for place selection
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.geometry?.location) {
        setSelectedPlace(place);

        // Update map center
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(location);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div>
        {/* Input for Autocomplete */}
        <input
          type="text"
          ref={inputRef}
          placeholder="Search a place..."
          style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
        />
      </div>

      {/* Initialize map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
        onLoad={onLoad}
      >
        {/* Marker for selected place */}
        {selectedPlace?.geometry?.location && (
          <Marker
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
          />
        )}
      </GoogleMap>

      {/* Display selected place information */}
      {selectedPlace && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <b>Selected Place:</b> {selectedPlace.name}
          </p>
          <p>
            <b>Address:</b> {selectedPlace.formatted_address}
          </p>
          <div>
            <button>Add this place</button>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default PlacesAutocomplete;
