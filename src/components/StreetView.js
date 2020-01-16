import React from 'react';
import ReactStreetview from 'react-streetview';
import {apiKey} from './apiKey'

class StreetView extends React.Component {

    render() {
        const googleMapsApiKey = apiKey;
        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
        const streetViewPanoramaOptions = {
            position: {lat: this.props.lat, lng: this.props.lng},
            pov: {heading: 100, pitch: 0},
            zoom: 1
        };
        return (
            <>
                <div style={{
                    width: '450px',
                    height: '450px',
                    backgroundColor: '#eeeeee'
                }}>
                    <ReactStreetview
                        apiKey={googleMapsApiKey}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                </div>
            </>
        )
    }
}

export default StreetView;