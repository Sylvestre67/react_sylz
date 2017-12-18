import React from 'react';
import PropTypes from 'prop-types';

function Photo(props) {
    const image = ['url("',props.place.instagram_url,'")'].join('');
    return (
        <div className="photo" style={{backgroundImage:image}} />
    );
}

Photo.propTypes = {
     place: PropTypes.shape({
        name: PropTypes.string,
        instagram_url: PropTypes.string
    }).isRequired
};
Photo.defaultProps = {};

export default Photo;
