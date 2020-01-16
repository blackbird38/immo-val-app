import {apiKey} from './apiKey';
import React from 'react';
import {
    Map,
    InfoWindow,
    Marker,
    GoogleApiWrapper} from 'google-maps-react';
import axios from "axios";
import './Immoval.css';
import * as immoDummyData from "../assets/data/immo-val-dummy-data.json";

const style = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 45.1598228,
                lng: 5.7325073
            },
            //the data returned by the request when the user drags the map
            markers: [],
            activeMarker: {
                showingInfoWindow: false,
                activeMarker: {},
                selectedPlace: {}
            },
            clickedImmo: {}
        }
        this.centerMoved = this.centerMoved.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    centerMoved(mapProps, map){
        //getting the new center when user drags the map
       // console.log(map.center.lat(), map.center.lng());
        //saving the new center in the state
        this.setState({
            center: {
                lat: map.center.lat(),
                lng: map.center.lng()
                }
        }, ()=> {
            console.log(this.state.center.lat, this.state.center.lng);
        });
        //doing the request
        //e.g: http://api.cquest.org/dvf?lat=48.85&lon=2.35&dist=500
        //
        axios.get(`http://api.cquest.org/dvf?lat=${(this.state.center.lat).toFixed(2)}&lon=${(this.state.center.lng).toFixed(2)}&dist=200`)
            .then(response => {
                console.log(response);
                //if there are results returned, updating the state
                if (response.data.features.length) {
                    const markers = response.data.features.map((marker, index)=>({
                        id: index,
                        date_mutation: marker.properties.date_mutation,
                        nature_mutation: marker.properties.nature_mutation,
                        valeur_fonciere: marker.properties.valeur_fonciere,
                        numero_voie: marker.properties.numero_voie,
                        type_voie: marker.properties.type_voie,
                        code_voie: marker.properties.code_voie,
                        voie: marker.properties.voie,
                        code_postal: marker.properties.code_postal,
                        commune: marker.properties.commune,
                        code_departement: marker.properties.code_departement,
                        code_commune: marker.properties.code_commune,
                        code_type_local: marker.properties.code_type_local,
                        type_local: marker.properties.type_local,
                        surface_relle_bati: marker.properties.surface_relle_bati,
                        nombre_pieces_principales: marker.properties.nombre_pieces_principales,
                        nature_culture: marker.properties.nature_culture,
                        surface_terrain: marker.properties.surface_terrain,
                        lat: marker.properties.lat,
                        lng: marker.properties.lon

                    }));
                   // console.log(markers);
                    this.setState({
                    markers: markers
                    }, ()=>{
                        /*displaying the immo data returned by the request*/
                        console.log(this.state.markers);
                        /* sending the fetched data to the parent component App.js
                         * whereFrom will be center-moved in the parent's function
                         */
                        this.props.callback(this.state.markers, "center-moved");
                    });
                }
            });
    }

    onMouseoverMarker(){
        console.log('mouse over the marker');
    }

    //activating a marker when user is clicking on it
    //can send here the info to parent
    onMarkerClick = (props, marker, e) => {
        console.log('marker clicked', marker.title);

        this.setState({
            activeMarker: {
                selectedPlace: 'props',
                activeMarker: marker,
                showingInfoWindow: true
            },
            clickedImmo: marker.immoData
        }, ()=>{
            /* sending the info related to the clicked pin, to the parent
             * 'click' => following a click
             */
            this.props.callback(this.state.clickedImmo, 'click');
            console.log(this.state.activeMarker.showingInfoWindow)
        })
    };

    //deactivating the active marker when user is clicking on the map
    onMapClicked(props){
        console.log('on map clicked');
        {
            if (this.state.activeMarker.showingInfoWindow) {
                this.setState({
                        activeMarker: {
                            showingInfoWindow: false,
                            activeMarker: null
                        }
                    }, ()=> {
                        console.log(this.state.activeMarker.showingInfoWindow);
                    }
                )
            }
        };
    }

    render() {
        if (!this.props.loaded) return <div>Loading...</div>;
        return (
            <Map google={this.props.google} zoom={13}
                 style={style}
                 initialCenter={this.state.center}
                 onClick={this.onMapClicked}
                 onDragend={this.centerMoved}
            >
                <Marker onClick={this.onMarkerClick}
                        title={'❤'}
                        name={'❤'}
                        label={'❤'}
                        position={{lat: 45.1667, lng: 5.7167}}
                        onMouseover={this.onMouseoverMarker}
                        immoData={{}}
                />

                {
                    this.state.markers &&
                    this.state.markers.map((marker) => {
                        return <Marker onClick={this.onMarkerClick}
                                       key={marker.id}
                                       position={{lat: marker.lat, lng: marker.lng}}
                                       onMouseover={this.onMouseoverMarker}
                                       label={''}
                                       title={marker.valeur_fonciere ? `${marker.valeur_fonciere.toString()} ${marker.type_local}` : ""}
                                       immoData={marker} //maybe not ideal but need to pass the clicked immo info to the parent;
                            >
                            {
                                this.state.activeMarker.showingInfoWindow &&
                                <InfoWindow
                                    className={'google_map_infobox'}
                                    marker={this.state.activeMarker.activeMarker}
                                    visible={this.state.activeMarker.showingInfoWindow}
                                    position={{lat: marker.lat, lng: marker.lng}}
                                >
                                    <div>
                                        <h1>{'coucou'}</h1>
                                    </div>
                                </InfoWindow>
                            }
                            <InfoWindow position={{lat: marker.lat, lng: marker.lng}} visible>
                                <small>
                                    Click on any of the markers to display an additional info.
                                </small>
                            </InfoWindow>
                        </Marker>
                    })
                }

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (apiKey)
})(MapContainer)