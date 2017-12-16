import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../layout/Wrapper';
import Description from '../layout/Description';

import PlaceMap from './PlaceMap';
import Fresque from './Fresque';

import './place.css';

class Place extends Component {
    constructor(props){
        super(props);
        this.onClickIcon = this.onClickIcon.bind(this);
        this.childSelector = {
            JS: <Fresque {...this.props} />,
            MAP: <PlaceMap {...this.props} />
        };
        this.state = {activeTab: 'JS'};
    }

    onClickIcon(tab, ev){
        this.setState((prevState) => {
            return Object.assign({}, prevState, {activeTab : tab});
        });
    }

    render() {
        return (
            <div className="place">
                <Wrapper>
                    {this.childSelector[this.state.activeTab]}
                    {/*<Photo />*/}
                </Wrapper>
                <Description onClickOnIcon={this.onClickIcon}
                             activeTab={this.state.activeTab}
                             {...this.props} />
            </div>
        );
    }
}

Place.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
            type: PropTypes.string,
            coordinates: PropTypes.arrayOf(PropTypes.number)
      }),
    }).isRequired
};
Place.defaultProps = {};

export default Place;
