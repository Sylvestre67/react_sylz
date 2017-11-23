import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../layout/Wrapper';
import Fresque from './Fresque';

class Place extends Component {
    render() {
        return (
            <Wrapper>
                <Fresque {...this.props} />
            </Wrapper>
        );
    }
}

Place.propTypes = {};
Place.defaultProps = {};

export default Place;
