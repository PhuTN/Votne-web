import React, { useState, useRef, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 21.0285, // Default location (Hanoi, Vietnam)
  lng: 105.8542,
};

const LocationPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: markerPosition,
        zoom: 15,
      });

      // Initialize the marker
      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map: map,
        draggable: true,
      });

      // Initialize the SearchBox
      searchBoxRef.current = new window.google.maps.places.SearchBox(inputRef.current);

      // Listen for place selection in SearchBox
      searchBoxRef.current.addListener('places_changed', () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          const newPosition = { lat: lat(), lng: lng() };
          setMarkerPosition(newPosition);
          setAddress(place.formatted_address);
          map.setCenter(newPosition);

          if (onLocationSelect) {
            const locationInfo = {
              name: place.name,
              des: place.formatted_address,

              locationID: "L0001",
              locationName: place.formatted_address,
              description: place.place_id,
              latitude: lat(),
              longitude: lng(),

              reviews: place.reviews ? place.reviews.map(review => ({
              author_name: review.author_name,
              rating: review.rating,  // Đánh giá sao (từ 1 đến 5 sao)
              text: review.text,  // Nội dung đánh giá
              time: new Date(review.time * 1000).toLocaleDateString(), // Chuyển đổi thời gian
            })) : [],
            photos: place.photos ? place.photos.map(photo => photo.getUrl({ maxWidth: 400, maxHeight: 400 })) : [],
            };
            onLocationSelect(locationInfo);
          }
        }
      });

      // Update marker position when dragged
      marker.addListener('dragend', (event) => {
        const newPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        fetchAddress(newPosition);
      });

      const fetchAddress = (location) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results[0]) {
            setAddress(results[0].formatted_address);
            if (onLocationSelect) {
              const locationInfo = {
                name: results[0].name,
                des: results[0].formatted_address,
                locationID: "L0001",
                locationName: results[0].formatted_address,
                description: results[0].place_id,
                latitude: location.lat,
                longitude: location.lng,
                reviews: results[0].reviews ? results[0].reviews.map(review => ({
              author_name: review.author_name,
              rating: review.rating,  // Đánh giá sao (từ 1 đến 5 sao)
              text: review.text,  // Nội dung đánh giá
              time: new Date(review.time * 1000).toLocaleDateString(), // Chuyển đổi thời gian
            })) : [],
            photos: results[0].photos ? results[0].photos.map(photo => photo.getUrl({ maxWidth: 400, maxHeight: 400 })) : [],
              };
              onLocationSelect(locationInfo);
              
            }
          } else {
            console.error('Geocoder failed due to: ' + status);
          }
        });
      };
    }
  }, [onLocationSelect]);

  const handleGetCurrentLocation = () => {
    const fetchAddress = (location) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          if (onLocationSelect) {
            const locationInfo = {

              name: results[0].name,
              des: results[0].formatted_address,
              locationID: "L0001",
              locationName: results[0].formatted_address,
              description: results[0].place_id,
              latitude: location.lat,
              longitude: location.lng,

reviews: results[0].reviews ? results[0].reviews.map(review => ({
              author_name: review.author_name,
              rating: review.rating,  // Đánh giá sao (từ 1 đến 5 sao)
              text: review.text,  // Nội dung đánh giá
              time: new Date(review.time * 1000).toLocaleDateString(), // Chuyển đổi thời gian
            })) : [],
            photos: results[0].photos ? results[0].photos.map(photo => photo.getUrl({ maxWidth: 400, maxHeight: 400 })) : [],
            
            };
            onLocationSelect(locationInfo);
          }
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(currentLocation);
          fetchAddress(currentLocation);
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div>
      <div ref={mapRef} style={containerStyle} />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a place"
          style={{
            width: '80%',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleGetCurrentLocation}
          style={{
            width: '30%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Lấy vị trí hiện tại
        </button>
      </div>
      <div>
        <h4>Địa điểm chọn:</h4>
        <p>{address}</p>
      </div>
      
    </div>
    
  );
};

export default LocationPicker;
