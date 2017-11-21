import React from 'react';
import PropTypes from 'prop-types';

import './mask.css';

function Mask(props) {
    return (
        <div className={[props.position, "mask"].join(' ')}>
        </div>
    );
}

Mask.propTypes = {
    position: PropTypes.string
};

Mask.defaultProps = {
    position: 'top'
};

export default Mask;
