import React, { Component } from 'react';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import './App.css';
import Mask from './layout/Mask';
import Place from './components/Place';

const state = Observable.fromPromise(fetch('/api/places'));

class App extends Component {
    constructor(props){
        super(props);
        this.state = {places: []};
    }

    componentWillMount() {
        this.places = state
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
        return (
            <div className="app container-fluid">
                <Mask />
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.places.map((place,index) =>
                            <Place key={[place.id, index].join('_')}
                                   place={place}></Place>
                        )}
                    </div>
                </div>
                <Mask position="bottom" />
            </div>
        );
    }
}

export default App;
