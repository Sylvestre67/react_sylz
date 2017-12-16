import React, {Component} from 'react';

import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";

import debounce from 'lodash.debounce';

// import PropTypes from 'prop-types';

import './bowery_houston.css';

class BoweryHouston extends Component {
    constructor(props){
        super(props);
        this.element = undefined;
        this.currentIndex = 0;
        this.lastIndex = 0;
        this.drawMotives = debounce(this.drawMotives.bind(this), 250);
        this.setCircleFill = this.setCircleFill.bind(this);
    }

    componentDidMount() {
        this.drawMotives();
        window.addEventListener("resize", this.drawMotives);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.drawMotives);
    }

    setCircleFill(){
        const circleColors = ['#E8926F','#8589C3','#041545','#A0A144', '#4ABF89','#E06A9D','#BBC3CD','#2D2F2A','#7E8C8C','#7B4C57','#50C18E'];
        while (this.currentIndex === this.lastIndex){
            this.currentIndex = Math.round(Math.random() * 10);
        }
        this.lastIndex = this.currentIndex;

        return circleColors[this.currentIndex];
    }

    drawMotives(){
        const svg = select(this.element);
        const width = (svg.node().parentNode.clientWidth < 900)
            ? 900
            : svg.node().parentNode.clientWidth;
        const height = svg.node().parentNode.clientHeight;
        const blue = '#89A3C1';
        const black = '#0A1016';
        const {setCircleFill} = this;

        svg.attr('class', 'bowery-houston')
            .attr('width', width)
            .attr('height', height);

        const x = scaleLinear()
            .domain([0, 20])
            .range([0, width]);

		const y = scaleLinear()
            .domain([0, 100])
            .range([0, height]);

		const radius = y(22);
		const numberOfCircle = Math.ceil(width/(radius * .2));

        svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', blue);

         /*************/

        const fisrtRow = svg.append('g')
            .attr('transform','translate('+ 0 + ','+ radius * .8 + ')');

        Array(numberOfCircle).fill().map((n,i) => {
            return fisrtRow.append('ellipse')
                .attr('transform','translate('+ x(i) + ','+ 0 + ')')
                .attr('rx', radius * 1.3)
                .attr('ry', radius * 1.1)
                .style('fill', setCircleFill());
        });

        svg.append('g')
            .attr('transform','translate('+ 0 + ','+ radius * 1.8 + ')')
            .append('line')
                .attr('x0',x(0))
                .attr('x1',x(100))
                .attr('y0',y(0))
                .attr('y1',y(0))
                .style('stroke', black)
                .style('stroke-width', y(6));

        /*************/

        const secondRow = svg.append('g')
            .attr('transform','translate('+ 0 + ','+ (height - radius * .8) + ')');

        Array(numberOfCircle).fill()
            .map((n,i) => { return i })
            .reverse()
            .map((n) => {
                return secondRow.append('ellipse')
                    .attr('transform','translate('+ x(n) + ','+ 0 + ')')
                    .attr('rx', radius * 1.3)
                    .attr('ry', radius * 1.1)
                    .style('fill', setCircleFill());
            });

        svg.append('g')
            .attr('transform',['translate(',0,',',(height - (radius * 1.8)),')'].join(''))
            .append('line')
                .attr('x0',x(0))
                .attr('x1',x(100))
                .attr('y0',y(0))
                .attr('y1',y(0))
                .style('stroke',black)
                .style('stroke-width', y(6));
    }

    render() {
        return (
            <svg ref={(element) => { this.element = element }} />
        );
    }
}

// BoweryHouston.propTypes = {};
// BoweryHouston.defaultProps = {};

export default BoweryHouston;
