import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Polyline,
    Marker
} from 'react-google-maps';

const Map = () => {
    const [state, setState] = React.useState<any>({
        progress: [],
        path: [
            {lat: 18.566516, lng: -68.435996},
            {lat: 18.5644, lng: -68.423036},
            {lat: 18.563586, lng: -68.418744},
            {lat: 18.562339, lng: -68.410725},
            {lat: 18.560927, lng: -68.402459},
            {lat: 18.559605, lng: -68.394354},
            {lat: 18.559028, lng: -68.391003},
            {lat: 18.558841, lng: -68.390594},
            {lat: 18.558795, lng: -68.390387},
            {lat: 18.558767, lng: -68.390312},
            {lat: 18.558744, lng: -68.390256},
            {lat: 18.558726, lng: -68.390202},
            {lat: 18.55867, lng: -68.390124},
            {lat: 18.558663, lng: -68.390111},
            {lat: 18.558602, lng: -68.389995},
            {lat: 18.5585, lng: -68.389867},

            {lat: 18.558462, lng: -68.389837},
            {lat: 18.558396, lng: -68.389781},
            {lat: 18.55828, lng: -68.389641},
            {lat: 18.558234, lng: -68.389557},
            {lat: 18.558143, lng: -68.389469},
            {lat: 18.558089, lng: -68.389362},
            {lat: 18.558062, lng: -68.389265},
            {lat: 18.558011, lng: -68.389069},
            {lat: 18.557985, lng: -68.388965},
            {lat: 18.557988, lng: -68.38879},
            {lat: 18.558032, lng: -68.388603},
            {lat: 18.55806, lng: -68.388525},
            {lat: 18.558113, lng: -68.388425},
            {lat: 18.558192, lng: -68.388297},
            {lat: 18.558301, lng: -68.388181},
            {lat: 18.558497, lng: -68.388045},
            {lat: 18.558571, lng: -68.388002},
            {lat: 18.558701, lng: -68.387927},
            {lat: 18.558863, lng: -68.387895},
            {lat: 18.559046, lng: -68.387887},
            {lat: 18.559308, lng: -68.387922},
            {lat: 18.559677, lng: -68.388185},
            {lat: 18.559824, lng: -68.388314},
            {lat: 18.559929, lng: -68.388397},
            {lat: 18.560018, lng: -68.388512},
            {lat: 18.560203, lng: -68.388607},
            {lat: 18.560472, lng: -68.388615},
            {lat: 18.560655, lng: -68.388613},
            {lat: 18.560957, lng: -68.388572},
            {lat: 18.561206, lng: -68.388521}

        ]
    });

    // path = [
    //     { lat: 18.566516, lng: -68.435996 },
    //     { lat: 18.5644, lng: -68.423036 },
    //     { lat: 18.563586, lng: -68.418744 },
    //     { lat: 18.562339, lng: -68.410725 },
    //     { lat: 18.560927, lng: -68.402459 },
    //     { lat: 18.559605, lng: -68.394354 },
    //     { lat: 18.559028, lng: -68.391003 },
    //     { lat: 18.558841, lng: -68.390594 },
    //     { lat: 18.558795, lng: -68.390387 },
    //     { lat: 18.558767, lng: -68.390312 },
    //     { lat: 18.558744, lng: -68.390256 },
    //     { lat: 18.558726, lng: -68.390202 },
    //     { lat: 18.55867, lng: -68.390124 },
    //     { lat: 18.558663, lng: -68.390111 },
    //     { lat: 18.558602, lng: -68.389995 },
    //     { lat: 18.5585, lng: -68.389867 },

    //     { lat: 18.558462, lng: -68.389837 },
    //     { lat: 18.558396, lng: -68.389781 },
    //     { lat: 18.55828, lng: -68.389641 },
    //     { lat: 18.558234, lng: -68.389557 },
    //     { lat: 18.558143, lng: -68.389469 },
    //     { lat: 18.558089, lng: -68.389362 },
    //     { lat: 18.558062, lng: -68.389265 },
    //     { lat: 18.558011, lng: -68.389069 },
    //     { lat: 18.557985, lng: -68.388965 },
    //     { lat: 18.557988, lng: -68.38879 },
    //     { lat: 18.558032, lng: -68.388603 },
    //     { lat: 18.55806, lng: -68.388525 },
    //     { lat: 18.558113, lng: -68.388425 },
    //     { lat: 18.558192, lng: -68.388297 },
    //     { lat: 18.558301, lng: -68.388181 },
    //     { lat: 18.558497, lng: -68.388045 },
    //     { lat: 18.558571, lng: -68.388002 },
    //     { lat: 18.558701, lng: -68.387927 },
    //     { lat: 18.558863, lng: -68.387895 },
    //     { lat: 18.559046, lng: -68.387887 },
    //     { lat: 18.559308, lng: -68.387922 },
    //     { lat: 18.559677, lng: -68.388185 },
    //     { lat: 18.559824, lng: -68.388314 },
    //     { lat: 18.559929, lng: -68.388397 },
    //     { lat: 18.560018, lng: -68.388512 },
    //     { lat: 18.560203, lng: -68.388607 },
    //     { lat: 18.560472, lng: -68.388615 },
    //     { lat: 18.560655, lng: -68.388613 },
    //     { lat: 18.560957, lng: -68.388572 },
    //     { lat: 18.561206, lng: -68.388521 }
    // ];

    const velocity = 100;
    const initialDate: any = new Date();

    const getDistance = () => {
        // seconds between when the component loaded and now
        const now: any = new Date();
        const differentInTime = ( now - initialDate ) / 1000; // pass to seconds
        return differentInTime * velocity; // d = v*t -- thanks Newton!
    };

    const moveObject = () => {
        const distance = getDistance();
        if (!distance) {
            return;
        }

        let progress = state.path.filter(
            (coordinates: any) => coordinates.distance < distance
        );

        const nextLine: any = state.path.find(
            (coordinates: any) => coordinates.distance > distance
        );
        if (!nextLine) {
            setState({progress});
            return; // it's the end!
        }
        const lastLine: any = progress[progress.length - 1];

        const lastLineLatLng = new window['google'].maps.LatLng(
            lastLine.lat,
            lastLine.lng
        );

        const nextLineLatLng = new window['google'].maps.LatLng(
            nextLine.lat,
            nextLine.lng
        );

        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance;
        const percentage = (distance - lastLine.distance) / totalDistance;

        const position: any = window['google'].maps.geometry.spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        );

        progress = progress.concat(position);
        setState({progress});
    };

    const componentWillMount = () => {
        state.path = state.path.map((coordinates, i, array) => {
            if (i === 0) {
                return {...coordinates, distance: 0}; // it begins here!
            }
            const {lat: lat1, lng: lng1} = coordinates;
            const latLong1 = new window['google'].maps.LatLng(lat1, lng1);

            const {lat: lat2, lng: lng2} = array[0];
            const latLong2 = new window['google'].maps.LatLng(lat2, lng2);

            // in meters:
            const distance = window['google'].maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            );

            return {...coordinates, distance};
        });

        console.log(state.path);
    };

    const componentDidUpdate = () => {
        const distance = getDistance();
        if (!distance) {
            return;
        }

        let progress = state.path.filter(
            (coordinates: any) => coordinates.distance < distance
        );

        const nextLine = state.path.find(
            (coordinates: any) => coordinates.distance > distance
        );

        let point1, point2;

        if (nextLine) {
            point1 = progress[progress.length - 1];
            point2 = nextLine;
        } else {
            // it's the end, so use the latest 2
            point1 = progress[progress.length - 2];
            point2 = progress[progress.length - 1];
        }

        const point1LatLng = new window['google'].maps.LatLng(point1.lat, point1.lng);
        const point2LatLng = new window['google'].maps.LatLng(point2.lat, point2.lng);

        const angle = window['google'].maps.geometry.spherical.computeHeading(
            point1LatLng,
            point2LatLng
        );
        const actualAngle = angle - 90;

        const markerUrl =
            "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";
        const marker: any = document.querySelector(`[src="${markerUrl}"]`);

        if (marker) {
            // when it hasn't loaded, it's null
            marker.style.transform = `rotate(${actualAngle}deg)`;
        }
    };

    const carIcon: any = {
        url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
        scaledSize: new window['google'].maps.Size(20, 20),
        anchor: {x: 10, y: 10}
    };


    const markerIcon: any = {
        url: "https://static.thenounproject.com/png/2412395-200.png",
        scaledSize: new window['google'].maps.Size(30, 30),
        anchor: {x: 10, y: 30}
    };

    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat: 18.559008, lng: -68.388881}}
        >
            {state.progress && (
                <>
                <Polyline
                    path={state.progress}
                    options={{strokeColor: "#FF0000 "}}
                />

                <Marker
                    icon={markerIcon}
                    position={state.path[0]}
                />

                <Marker
                    icon={markerIcon}
                    position={state.path[state.path.length - 1]}
                />

                <Marker
                    icon={carIcon}
                    position={state.progress[state.progress.length - 1]}
                />
                </>
            )}
        </GoogleMap>
    );
}

const MapComponent: any = withScriptjs(withGoogleMap(Map));

export default () => (
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB_AyQ023yUEar_t9jpGXhPAWuj_Dfar7s&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `100vh`, width: "100%"}}/>}
        mapElement={<div style={{height: `100%`}}/>}
    />
);
