import React, { useState } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import Form from '../Form/Form';

const Map = () => {
  
  const [state, setState] = useState<any>({
    progress: [],
    isOpen: false,
    points: [
      { lat: 18.566516, lng: -68.435996 },
      { lat: 18.596516, lng: -68.435996 },
      { lat: 18.579046, lng: -68.387887 },
      { lat: 18.659308, lng: -68.387922 },
    ],
  });

  const handleToggleClick = () => {
    setState({
      isOpen: !state.isOpen,
    });
  };

  const showToast = (value) => {
    if (window['Mobile']) {
      const message = value.username;
      const lengthLong = true;
      window['Mobile'].makeToast(message, lengthLong);
      return false;
    }
  };

  const formStyle: any = {
      position: 'fixed',
      zIndex: '10000',
      top: '150px',
      right: '20px',
      padding: '8px',
    };

    const markerIcon: any = {
      url: 'https://static.thenounproject.com/png/2412395-200.png',
      scaledSize: new window['google'].maps.Size(30, 30),
      anchor: { x: 10, y: 30 },
    };

    const userForm = {
      columns: {
        username: {
          type: 'TextField',
          label: 'Username',
          autoFocus: true,
          initialValue: '',
          gridForm: { xs: 12, sm: 12 },
          variant: 'outlined',
        },
      },
      resetButton: false,
      submitLabel: 'Send Data', // this is optional
      onSubmit: ({ values }) => {
        console.log(values);
        showToast(values);
        // setLoadingScreen(true);
        // handleLogin(values.username, values.password);
      },
    };

    return (
      <>
        <div style={formStyle}>
          {/* Message: <input id="message" name="message" type="text"/><br /> */}
          {/* Long: <input id="length" name="length" type="checkbox" /><br /> */}

          {/* <input type="submit" onClick={this.showToast} value="Make Toast" /> */}

          <Form data={userForm} />
        </div>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
        >
          {state.progress && (
            <>
              {state.points.map((value, index) => {
                return (
                  <Marker
                    key={index}
                    icon={markerIcon}
                    position={value}
                    onClick={() => handleToggleClick()}
                  >
                    {state.isOpen && (
                      <InfoWindow onCloseClick={handleToggleClick}>
                        <span>Something</span>
                      </InfoWindow>
                    )}
                  </Marker>
                );
              })}
            </>
          )}
        </GoogleMap>
      </>
    );
}

// function showToast() {
//     let message = document.getElementById("message").value;
//     let lengthLong = document.getElementById("length").checked;
//     console.log("****************")
//     console.log(window.Mobile)
//     console.log("****************")
//     window.Mobile.makeToast(message, lengthLong);
//     return false;
// }
//
// window.onload = function () {
//     var form = document.getElementById("form");
//     form.onsubmit = showToast;
// }

const MapComponent: any = withScriptjs(withGoogleMap(Map));

export default () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB_AyQ023yUEar_t9jpGXhPAWuj_Dfar7s&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh`, width: '100%' }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
