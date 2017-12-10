import React, {Component} from 'react';

import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";
import {transition} from "d3-transition";

import PropTypes from 'prop-types';

import './winewood.css';

class Winewood extends Component {
    constructor(props){
        super(props);
        this.element = undefined;
        this.drawMotives = this.drawMotives.bind(this);
    }

    componentDidMount() {
        this.drawMotives();
    }

    drawMotives(){
        const svg = select(this.element);
        const width = svg.node().parentNode.clientWidth;
        const height = svg.node().parentNode.clientHeight;
        const blue = '#89A3C1';
        const black = '#0A1016';
        const circleColors = ['#E8926F','#8589C3','#041545','#A0A144','#4ABF89','#E06A9D','#BBC3CD','#2D2F2A'];

        svg.attr('class', 'winewood')
            .attr('width', width)
            .attr('height', height);

        const x = scaleLinear()
            .domain([0, 20])
            .range([0, width]);

		const y = scaleLinear()
            .domain([0, 100])
            .range([0, height]);

		const radius = y(22);
		const numberOfCircle = Math.ceil(width/radius);

        svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', blue);

        const fisrtRow = svg.append('g')
            .attr('transform','translate('+ 0 + ','+ radius + ')');

        fisrtRow.append('circle')
            .style('fill', black)
            .attr('r', radius);

        Array(numberOfCircle).fill().map((n,i) => {
            return fisrtRow.append('circle')
                .attr('transform','translate('+ x(i) + ','+ 0 + ')')
                .style('fill', black)
                .attr('r', radius);
        });

        svg.append('g')
            .attr('transform','translate('+ 0 + ','+ radius * 2 + ')')
            .append('line')
                .attr('x0',x(0))
                .attr('x1',x(100))
                .attr('y0',y(0))
                .attr('y1',y(0))
                .style('stroke', black)
                .style('stroke-width', y(5));

        const secondRow = svg.append('g')
             .attr('transform','translate('+ 0 + ','+ (height - radius) + ')');

        secondRow.append('circle')
            .style('fill', 'red')
            .attr('r', radius);

        svg.append('g')
            .attr('transform',['translate(',0,',',(height - (radius * 2)),')'].join(''))
            .append('line')
                .attr('x0',x(0))
                .attr('x1',x(100))
                .attr('y0',y(0))
                .attr('y1',y(0))
                .style('stroke',black)
                .style('stroke-width', y(5));


    }

    render() {
        return (
            <svg ref={(element) => { this.element = element }} />
        );
    }
}

Winewood.propTypes = {};
Winewood.defaultProps = {};

export default Winewood;
