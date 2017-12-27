import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './mask.css';

function Mask(props) {
    return (
        <div className={[props.position, "mask"].join(' ')}>
            <div className="header">
                <div className="site-name">
                    <p>Sylz.me</p>
                </div>
                <div className="site-nav">
                    <ul>
                        <li>
                            <Link href="/"
                                  to="/">Places</Link>
                        </li>
                        <li>
                            <Link href="/knicks/"
                                  to="/knicks/">Knicks</Link>
                        </li>
                    </ul>
                </div>
            </div>
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
