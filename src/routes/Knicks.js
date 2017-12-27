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
        this.getStats = Observable.fromPromise(fetch('/api/nba/stats'))
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
            ? this.state.stats.results[this.state.activePlayerIndex]
            : null;

        return (
            <div>
                {/*<pre><code>{JSON.stringify(this.state.stats, null, 4)}</code></pre>*/}
                <h3>Assists profile</h3>
                {(activePlayer && this.state.stats)
                    ? <AssistsProfile player={activePlayer} stats={this.state.stats} />
                    : null
                }

                <h3>Assists repartition</h3>
                {(this.state.stats)
                    ? <AssistsTable data={this.state.stats}
                                    updateActivePlayer={this.updateActivePlayer}/>
                    : null
                }
            </div>
        );
    }
}

Knicks.propTypes = {};
Knicks.defaultProps = {};

export default Knicks;
