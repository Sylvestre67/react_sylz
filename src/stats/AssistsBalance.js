import React, {Component} from 'react';
import PropTypes from 'prop-types';
import max from 'd3-array';

import './assists-balance.css';

class AssistsBalance extends Component {
    constructor(props){
        super(props);
        this.computeWidth = this.computeWidth.bind(this);
    }

    computeWidth(numberOfPass){
        let max = this.props.highest;
        let style =  {width: [(numberOfPass * 100)/max, '%'].join('')};
        return style;
    }

    renderPlayer(){
        return this.props.player.assists.map((pl) => {
            return (this.props.player._name !== pl.name)
                ? (
                    <div key={[this.props.player._name, '_' , pl.name].join('')} //eslint-disable-line
                         className='player'>
                        <div style={{width: '100px'}}>{pl.name}</div>
                        <div className='bar'>
                            <div style={this.computeWidth(pl.pass_to)}>
                                <div />
                            </div>
                        </div>
                        <div className='bar'>
                            <div style={this.computeWidth(pl.pass_from)}>
                                <div />
                            </div>
                        </div>
                    </div>
                )
                : null;
        })
    }

    render() {
        return (
            <div className='assists-balance'>
                {this.renderPlayer()}
            </div>
        );
    }
}

AssistsBalance.propTypes = {

};
AssistsBalance.defaultProps = {};

export default AssistsBalance;
