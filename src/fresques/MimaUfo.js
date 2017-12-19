import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";
import {area, line, curveCatmullRom} from "d3-shape";

import './mima_ufo.css';

class MimaUfo extends Component {
    constructor(props){
        super(props);
        this.element= undefined;
        this.state = {
            path: {}
        }
    }

    componentDidMount() {
        this.drawMotives();
    }

    drawMotives(){
        const svg = select(this.element);
        const svgWidth = svg.node().clientWidth;
        const width = (svg.node().clientWidth < 900)
            ? 900
            : svg.node().clientWidth;
        const height = svg.node().clientHeight;
        const data = [
            {x:0,y:100},
            {x:3,y:50},
            {x:5,y:25},
            {x:10,y:50},
            {x:13,y:20},
            {x:15,y:70},
            {x:20,y:0}
        ];

        svg.attr('width', svgWidth);

        const x = scaleLinear()
            .domain([0, 20])
            .range([0, width]);

        const y = scaleLinear()
            .domain([0, 100])
            .range([0, height]);

        const greenArea = area()
            .x(function(d) { return x(d.x); })
            .y1(function(d) { return y(d.y); });

        greenArea.y0(y(0));

        const bigLine = line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); })
            .curve(curveCatmullRom.alpha(0.5));

        this.setState((prevState) => {
            return Object.assign({}, prevState, {
                path: {
                    greenArea: {
                        d: greenArea(data),
                        className: 'green-area'
                    },
                    whiteLine: {
                        d: bigLine(data),
                        className: 'white-line'
                    },
                    blackLine: {
                        d: bigLine(data),
                        className: 'black-line'
                    }
                }
            })
        });
    }

    renderMotives(){
        return Object.keys(this.state.path).map((path,index) => {
            return <path key={[path,index].join('_')}
                         {...this.state.path[path]} />
        })
    }

    render() {
        return (
            <svg ref={(element) => { this.element = element }} className="mima-ufo">
                {this.renderMotives()}
            </svg>
        );
    }
}

// MimaUfo.propTypes = {};
// MimaUfo.defaultProps = {};

export default MimaUfo;
