import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../layout/Wrapper';
import Description from '../layout/Description';

import Fresque from './Fresque';

import './place.css';

class Place extends Component {
    constructor(props){
        super(props);
        this.onClickIcon = this.onClickIcon.bind(this);
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
                    <Fresque {...this.props} />
                    {/*<Map />*/}
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
        name: PropTypes.string
    }).isRequired
};
Place.defaultProps = {};

export default Place;
