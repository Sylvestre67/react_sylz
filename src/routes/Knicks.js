import React from 'react';
import {Observable} from "rxjs/Observable";
import PropTypes from 'prop-types';

import AssistsTable from '../stats/AssistsTable';
import AssistsProfile from '../stats/AssistsProfile';

class Knicks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activePlayerIndex: 0,
            stats: undefined
        };
        this.updateActivePlayer = this.updateActivePlayer.bind(this);
    }

    componentWillMount() {
        this.getStats = Observable.fromPromise(fetch('/api/nba/assists.json'))
            .map(response => {return response.json()})
            .subscribe(json => json.then((stats) => {
                this.setState({stats: stats});
            }));
    }

    componentWillUnmount(){
        this.getStats.unsubscribe();
    }

    updateActivePlayer(playerIndex){
        this.setState({ activePlayerIndex : playerIndex })
    }

    render(){

        const activePlayer = (this.state.stats)
            ? this.state.stats[this.state.activePlayerIndex]
            : null;

        return (
            <div>
                <h3>Assists Profile</h3>
                {/* eslint-disable */}
                <p>Two different approach to Data-viz. The Interactions Map is done the <a href="https://d3js.org/"
                       rel="noopener noreferrer"
                       target="_blank">D3.js</a> way,
                    the Assists Balance is made with <a href="https://reactjs.org/"
                       rel="noopener noreferrer"
                       target="_blank">React</a>.
                </p>
                {(activePlayer && this.state.stats) ? <AssistsProfile player={activePlayer} stats={this.state.stats} /> : null}
                <p style={{fontSize: '80%', textAlign:'right'}}>Dataset courtesy of <a href="http://stats.nba.com/"
                                       target="_blank"
                                       rel="noreferrer noopener">stats.nba.com</a>.
                    Click <a href="http://stats.nba.com/stats/playbyplayv2?EndPeriod=10&EndRange=55800&GameID=0021700509&RangeType=2&Season=2017-18&SeasonType=Regular+Season&StartPeriod=1&StartRange=0"
                             target="_blank"
                             rel="noreferrer noopener">here</a> to
                    download original data.
                </p>
                {/* eslint-enable */}
            </div>
        );
    }
}

Knicks.propTypes = {};
Knicks.defaultProps = {};

export default Knicks;
