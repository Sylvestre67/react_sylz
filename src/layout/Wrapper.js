import React from 'react';
import PropTypes from 'prop-types';

import './wrap.css';

function Wrapper(props) {
    return (
        <div className="wrap">
            {props.children}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node,
};
Wrapper.defaultProps = {
    children: '',
};

export default Wrapper;
