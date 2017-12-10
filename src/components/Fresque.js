import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './fresque.css';
import BoweryHouston from "../fresques/BoweryHouston";

const fresqueIndex = {
  "bowery_houston": <BoweryHouston />
};

class Fresque extends Component {
    constructor(props){
        super(props);
        this.element = '';
        this.renderFresque = this.renderFresque.bind(this);
    }

    renderFresque(){
        return (fresqueIndex[this.props.place.name])
            ? fresqueIndex[this.props.place.name]
            : null;
    }

    render() {
        return (
            <div ref={(element) => {this.element = element}}
                 className={[this.props.place.name, 'fresque'].join(' ')}>
                {this.renderFresque()}
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
