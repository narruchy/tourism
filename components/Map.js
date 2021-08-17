import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});
// Transform the search result into the latitude and longitude
    const coordinate = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinate);
    const [viewport, setViewport] = React.useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });
    
    return (
        <ReactMapGL
            mapStyle="mapbox://styles/narruchy/cksg8yscheozm18qqi2z22v3h"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
        >
            {searchResults?.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={ result.long }
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p role="img" className="text-gray-100 button bg-red-500" onClick={() => setSelectedLocation(result)} aria-label="push-pin">{ result.title}</p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}                            
                            latitude={result.lat}
                            longitude={result.long}>{ result.title}</Popup>
                    ): (
                        false
                    )}
                </div>

        ))}
        </ReactMapGL>
    )
}

export default Map
