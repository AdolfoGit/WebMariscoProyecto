import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const CONFIGURATION = {
  ctaTitle: 'Encuentrame',
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 12,
    zoomControl: true,
    maxZoom: 22,
    mapId: '',
  },
  mapsApiKey: 'AIzaSyBMZxb7lHGBmYbaV8uDoiSjenlPxhwgS1M',
  capabilities: {
    addressAutocompleteControl: true,
    mapDisplayControl: true,
    ctaControl: true,
  },
};

const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);
const ADDRESS_COMPONENT_TYPES_IN_FORM = ['location', 'locality', 'administrative_area_level_1', 'postal_code', 'country'];

const RegistrarDireccion = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: CONFIGURATION.mapsApiKey,
    libraries: ['places'],
  });

  const [place, setPlace] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const latitudeRef = useRef();
  const longitudeRef = useRef();

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert(`No details available for input: '${place.name}'`);
      return;
    }
    setPlace(place);
    fillInAddress(place);
  };

  const fillInAddress = (place) => {
    const getComponentName = (componentType) => {
      for (const component of place.address_components || []) {
        if (component.types[0] === componentType) {
          return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
            ? component.short_name
            : component.long_name;
        }
      }
      return '';
    };

    const getComponentText = (componentType) => {
      return componentType === 'location'
        ? `${getComponentName('street_number')} ${getComponentName('route')}`
        : getComponentName(componentType);
    };

    ADDRESS_COMPONENT_TYPES_IN_FORM.forEach((componentType) => {
      const element = document.getElementById(`${componentType}-input`);
      if (element) {
        element.value = getComponentText(componentType);
      }
    });

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    latitudeRef.current.textContent = `Latitud: ${lat}`;
    longitudeRef.current.textContent = `Longitud: ${lng}`;
  };

  useEffect(() => {
    if (place && map) {
      const location = place.geometry.location;
      map.panTo(location);
      marker.setPosition(location);
    }
  }, [place, map, marker]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '500px', width: '600px' }}>
      <div style={{ padding: '20px', background: 'white', boxSizing: 'border-box' }}>

        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Address"
            id="location-input"
            style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginBottom: '10px' }}
          />
        </Autocomplete>
        <input
          type="text"
          placeholder="Apt, Suite, etc (optional)"
          style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="City"
          id="locality-input"
          style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <input
            type="text"
            className="half-input"
            placeholder="State/Province"
            id="administrative_area_level_1-input"
            style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', maxWidth: '120px' }}
          />
          <input
            type="text"
            className="half-input"
            placeholder="Zip/Postal code"
            id="postal_code-input"
            style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', maxWidth: '120px' }}
          />
        </div>
        <input
          type="text"
          placeholder="Country"
          id="country-input"
          style={{ height: '30px', borderBottom: '1px solid black', fontSize: '14px', fontFamily: 'Roboto, sans-serif', marginBottom: '10px' }}
        />
        <p ref={latitudeRef}></p>
        <p ref={longitudeRef}></p>
       
      </div>

    </div>
  );
};

export default RegistrarDireccion;
