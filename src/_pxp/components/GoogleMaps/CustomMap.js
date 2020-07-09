/**
 * CustomMap GoogleMaps Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const CustomMap = withScriptjs(
  withGoogleMap(({ lat, lng, customIconMarker = undefined, zoom = 14 }) => {
    console.log('lat', lat);
    console.log('lng', lng);
    return (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{ lat, lng }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'water',
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: '#0088ff' },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                { hue: '#ff0000' },
                { saturation: -100 },
                { lightness: 99 },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#808080' }, { lightness: 54 }],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ece2d9' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ccdca1' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#767676' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }],
            },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry.fill',
              stylers: [{ visibility: 'on' }, { color: '#b8cb93' }],
            },
            { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.sports_complex',
              stylers: [{ visibility: 'on' }],
            },
            { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }],
            },
          ],
        }}
      >
        <Marker
          {...(customIconMarker && { icon: customIconMarker })}
          position={{ lat, lng }}
        />
      </GoogleMap>
    );
  }),
);

export default CustomMap;
