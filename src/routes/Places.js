import React, {Component} from 'react';
import {Observable} from "rxjs/Observable";
import PropTypes from 'prop-types';

import Place from '../components/Place';

class Places extends Component {

    constructor(props){
        super(props);
        this.state = {places: []};
    }

    componentWillMount() {

        this.places = Observable.fromPromise(fetch('/api/places'))
            .map(response => {return response.json()})
            .subscribe(json => json.then((places) => {
                places.results.forEach((point,index, points) => {
                    // TODO: Set this up server side.
                    point.location.coordinates.reverse();
                    if(index === points.length -1){
                        this.setState({places: places.results});
                    }
                });
            }));
    }

    componentWillUnmount() {
        this.places.unsubscribe();
    }

    render() {
        return this.state.places.map((place,index) =>
            <Place key={[place.id, index].join('_')}
                   place={place} />);
    }
}

Places.propTypes = {};
Places.defaultProps = {};

export default Places;
