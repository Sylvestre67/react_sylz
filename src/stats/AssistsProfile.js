import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AssistsChart from './AssistsChart';

import './assists-profile.css';
import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {scaleLinear, scalePoint} from 'd3-scale';
import {axisTop, axisLeft} from 'd3-axis';
import {max} from 'd3-array';

class AssistsProfile extends Component {
    constructor(props){
        super(props);
        this.computeChart = this.computeChart.bind(this);
        this.state = {chart: undefined};
    }

    componentDidMount(){
        // this.computeChart();
        this.drawHeatMap();
    }

    getSvgDimensions(element){
         const svg = select(element);
         return {svg:svg, width: svg.node().clientWidth, height: svg.node().clientHeight}
    }

    drawHeatMap(){
        const {svg, width, height} = this.getSvgDimensions(this.heatMapElement);
        const margin = {left: 100, top: 40, bottom: 40, right: 40};
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        let players = this.props.player.assists.map((player) => {
            return player.pass_to
        });

        players = ['', this.props.player.name].concat(players);

        const numberOfAssists = this.props.stats.results
            .map((p) => { return max(p.assists, (d) => { return d.assists }) });

        const colorScale = scaleLinear()
            .domain([0, max(numberOfAssists, (d) => { return d})])
            .range(["#FFFFDD", "#3E9583", "#1F2D86"]);

        const xPlayersScale = scalePoint()
            .domain(players)
            .range([0, chartWidth]);

        const yPlayersScale = scalePoint()
            .domain(players)
            .range([0, chartHeight]);

        const topAxis = axisTop()
            .scale(xPlayersScale);

        const leftAxis = axisLeft()
            .scale(yPlayersScale);

        const g = svg.append('g')
            .attr('transform',['translate(',margin.left, ',', margin.top, ')'].join(''));

        g.append('g').attr('class','axis y')
            .call(leftAxis);

        g.append('g').attr('class','axis x')
            .call(topAxis);

        const player = g.selectAll('.assists')
            .data(this.props.stats.results)
            .enter().append('g')
            .attr('class','assists')
            .attr('transform',(d) => { return ['translate(',
                xPlayersScale(d.name), ',',
                0,')'].join('')
            });

        player
            .append('rect')
            .attr('transform',(d) => { return ['translate(', 0, ',', yPlayersScale(d.name),')'].join('') })
            .attr('width',10).attr('height',10).style('fill','#eeeeee');

        player._groups[0].forEach((es, index) => {
            console.log(player.data()[index].assists);

            let assists = select(es).selectAll(['.heated-point'].join(''))
                .data(player.data()[index].assists)
                .enter().append('g')
                .attr('class', ['.heated-point'].join(''));

            assists.append('rect')
                .attr('transform', (d,i) => { return ['translate(', 0 ,',', yPlayersScale(d.pass_to) ,')'].join('') })
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', (d) => { return colorScale(d.assists) });
        })

         // point.selectAll(['.heated-point ', '.', player.name].join(''))
         //        .data(player.assists)
         //        .enter().append('rect')
         //            .attr('transform',(d,i) => { return ['translate(', 0 ,',', yPlayersScale(d.pass_to) ,')'].join('') })
         //            .attr('width',10)
         //            .attr('height',10)
         //            .style('fill','#eeeeee');

    };

    computeChart(){
        /* Here, d3 is computing all attributes values. */
        const svg = select(this.element);
        const svgWidth = svg.node().clientWidth;
        const width = (svg.node().clientWidth < 900)
            ? 900
            : svg.node().clientWidth;

        const height = svg.node().clientHeight;
        const radius = height* .5;

        const {assists} = this.props.player;
        let nodes = [];

        const angleScale = scaleLinear()
            .domain([0, assists.length])
            .range([0,360]);

        const pieData = pie()
            .value((d,i) => { return i + 1; })
            (assists);

        pieData.forEach((assist, index) => {
            const _arc = arc()
                .innerRadius(0)
                .outerRadius(radius * 2)
                .startAngle(assist.startAngle)
                .endAngle(assist.endAngle);

            nodes.push(Object.assign({}, assist, {
                centroid: _arc.centroid(),
                rotate: angleScale(index)
            }))
        });

        this.setState((prevState) => {
            return Object.assign({}, prevState, {
                chart:{
                    radius: radius,
                    center: {
                        transform: ['translate(', svgWidth * .5 ,',', height * .5 ,')'].join('')
                    },
                    circle: {
                        r: radius,
                        style:{
                            stroke:'none',
                            strokeWidth: '1px',
                            fill: 'none',
                        }
                    },
                    nodes: nodes
                }
            })
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <svg ref={(element) => { this.heatMapElement = element }} className="assists-heatmap">
                        {(this.state.chart)
                            ? <AssistsChart {...this.state.chart} {...this.props} />
                            : null}
                    </svg>
                </div>
                <div className="col-xs-6">
                    {/*<svg ref={(element) => { this.element = element }} className="assists-profile">*/}
                        {/*{(this.state.chart) ? <AssistsChart {...this.state.chart} {...this.props} /> : null}*/}
                    {/*</svg>*/}
                </div>
            </div>
        );
    }
}

AssistsProfile.propTypes = {
    player: PropTypes.shape({
        name:PropTypes.string,
        assists:PropTypes.arrayOf(PropTypes.shape({
            pass_to: PropTypes.string,
            assists: PropTypes.number
        }))
    }).isRequired,
    stats: PropTypes.shape().isRequired
};
AssistsProfile.defaultProps = {};

export default AssistsProfile;
