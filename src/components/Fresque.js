import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Fresque extends Component {
    constructor(props){
        super(props);
        this.element = '';
    }

    render() {
        return (
            <div ref={(element) => {this.element = element}}
                 className={[this.props.place.name, 'fresque'].join(' ')}>
            </div>
        );
    }
}

Fresque.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired
};
Fresque.defaultProps = {};

export default Fresque;
