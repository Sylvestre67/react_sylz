import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, TileLayer } from 'react-leaflet'

import './place_map.css';

function PlaceMap(props) {
    const position = props.place.location.coordinates;
    return (
        <Map center={position} zoom={10} style={{height:'100%'}} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position} />
        </Map>
    );
}

PlaceMap.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
            type: PropTypes.string,
            coordinates: PropTypes.arrayOf(PropTypes.number)
      }),
    }).isRequired
};
PlaceMap.defaultProps = {};

export default PlaceMap;
