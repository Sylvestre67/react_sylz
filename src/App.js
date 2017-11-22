import React, { Component } from 'react';
import './App.css';

import Wrapper from './layout/Wrapper';
import Mask from './layout/Mask';

class App extends Component {
    constructor(props){
        super(props);
        this.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    }

    render() {
        const wrapps = this.list.map((el,index) => {
            return (
                <Wrapper key={[el,index].join('_')}>
                </Wrapper>
            )
        });
        return (
            <div className="app container-fluid">
                <Mask />
                <div className="row">
                    <div className="col-xs-12">
                        {wrapps}
                    </div>
                </div>
                <Mask position="bottom" />
            </div>
        );
    }
}

export default App;
