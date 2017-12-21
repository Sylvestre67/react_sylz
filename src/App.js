import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import './App.css';
import Mask from './layout/Mask';

import Places from './routes/Places';
import NotFound from './routes/NotFound';

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
            <Router>
                <div className="app container-fluid">
                    <Mask />
                    <div className="row">
                        <div className="col-xs-12">
                            <Switch>
                                <Route exact path={"/"}
                                       component={Places} />
                                {/*<Route exact path={"/places/"}*/}
                                       {/*component={Places} />*/}
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                    <Mask position="bottom" />
                </div>
            </Router>
        )
    }
}

export default App;

