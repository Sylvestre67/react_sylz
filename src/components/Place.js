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

Place.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
};
Place.defaultProps = {};

export default Place;
