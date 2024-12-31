import { useEffect, useState } from "react";

export default function Dashboard() {
  function initializeAutocomplete() {
    const inputs = document.getElementsByTagName(
      "input"
    ) as HTMLCollectionOf<HTMLInputElement>;

    let input = null;

    for (const value of inputs) {
      if (value.id === "place-search") {
        input = value;
        break;
      }
    }

    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.log("No details available for input: '" + place.name + "'");
          return;
        }

        // Address
        // Lat
        // Lng
        // Name
        // Phone
        // Website
        // Place ID

        // Log the place details
        console.log("Place:", place);
        console.log("Name:", place.name);
        console.log("Address:", place.formatted_address);
        console.log(
          "Coordinates:",
          place?.geometry?.location?.lat(),
          place?.geometry?.location?.lng()
        );
      });
    }
  }

  // Initialize the autocomplete when the window loads
  window.onload = initializeAutocomplete;

  useEffect(() => {
    initializeAutocomplete();
  }, []);

  return (
    <div>
      <div>Dashboard</div>
      <input id="place-search" type="text" placeholder="Search for places" />
    </div>
  );
}
