import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findIndex from 'lodash.findindex';

import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisTop, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

import AssistsBalance from './AssistsBalance';

import './assists-profile.css';

class AssistsProfile extends Component {
    constructor(props) {
        super(props);
        this.handleSelectNewPlayer = this.handleSelectNewPlayer.bind(this);
        this.state = {
            balancePlayer: props.player,
            highestAssists: max(
                props.player.assists.map((pl) => {
                    return (pl.pass_to > pl.pass_from)
                        ? pl.pass_to
                        : pl.pass_from;
                }))
        };
    }

    componentDidMount() {
        this.drawHeatMap();
    }
    /* eslint-disable class-methods-use-this */
    getSvgDimensions(element) {
        const svg = select(element);
        return { svg, width: svg.node().clientWidth, height: svg.node().clientHeight };
    }
    /* eslint-enable */

    drawHeatMap() {
        const { svg, width } = this.getSvgDimensions(this.heatMapElement);
        const margin = {
            left: 100, top: 40, bottom: -40, right: 40,
        };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = chartWidth;

        const players = this.props.player.assists.map(player => player.name);

        const assistsNumber = this.props.stats
            .map(player => max(player.assists.map(assist => ((assist.pass_from > assist.pass_to)
                ? assist.pass_from
                : assist.pass_to))));

        const colorScale = scaleLinear()
            .domain([0, max(assistsNumber) * 2])
            .range(['#FFFFDD', '#3E9583', '#1F2D86']);

        const xPlayersScale = scaleBand()
            .domain(players)
            .range([0, chartWidth]);

        const yPlayersScale = scaleBand()
            .domain(players)
            .range([0, chartHeight]);

        const rectHeight = yPlayersScale.bandwidth();
        const rectWidth = xPlayersScale.bandwidth();

        const topAxis = axisTop()
            .scale(xPlayersScale);

        const leftAxis = axisLeft()
            .scale(yPlayersScale);

        const g = svg.append('g')
            .attr('transform', ['translate(', margin.left, ',', margin.top, ')'].join(''));

        g.append('g').attr('class', 'axis y')
            .call(leftAxis);

        g.append('g').attr('class', 'axis x')
            .call(topAxis);

        const player = g.selectAll('.assists')
            .data(this.props.stats)
            .enter().append('g')
            .attr('class', 'assists')
            .attr('transform', d => ['translate(',
                xPlayersScale(d._name), ',',
                0, ')'].join(''));

        player._groups[0].forEach((es, index) => { // eslint-disable-line no-underscore-dangle
            const playerName = select(es).data()[0]._name; // eslint-disable-line no-underscore-dangle

            const assists = select(es).selectAll(['.heated-point'].join(''))
                .data(player.data()[index].assists)
                .enter()
                .append('g')
                .attr('class', ['.heated-point'].join(''));

            assists.append('rect')
                .attr('transform', d => ['translate(', 0, ',', yPlayersScale(d.name), ')'].join(''))
                .attr('width', rectWidth)
                .attr('height', rectHeight)
                .style('fill', d => ((d.name === playerName)
                    ? 'rgba(238, 238, 238, 0.3)'
                    : colorScale(d.pass_to + d.pass_from)));
        });

        const ticks = g.selectAll('.axis.x .tick text');
        ticks._groups[0].forEach((n, i) => { // eslint-disable-line no-underscore-dangle
            if (i % 2 !== 0) {
                n.setAttribute('y', '-25');
            }
        });
    }



    handleSelectNewPlayer(ev) {
        const index = findIndex(this.props.stats, pl => pl._name === ev.target.value);

        const highest = max(
            this.props.stats[index].assists.map((pl) => {
                return (pl.pass_to > pl.pass_from) ? pl.pass_to : pl.pass_from;
            })
        );

        this.setState({
            balancePlayer: this.props.stats[index],
            highestAssists: highest
        });
    }

    renderSelectPlayerOptions() {
        return this.props.player.assists.map(pl => (
            <option key={['index_', pl.name].join('')} value={pl.name}>{pl.name}</option>
        ));
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <h5>Interactions Map</h5>
                    <svg ref={(element) => { this.heatMapElement = element; }} className="assists-heatmap" />
                </div>
                <div className="col-xs-6">
                    <h5>Assists Balance</h5>
                    <div className='select-player'>
                        <select onChange={this.handleSelectNewPlayer}>
                            {this.renderSelectPlayerOptions()}
                        </select>
                    </div>
                    <AssistsBalance player={this.state.balancePlayer} highest={this.state.highestAssists} />
                </div>
            </div>
        );
    }
}

AssistsProfile.propTypes = {
    player: PropTypes.shape({
        _name: PropTypes.string,
        assists: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            pass_to: PropTypes.number,
            pass_from: PropTypes.number,
        })),
    }).isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
        _name: PropTypes.string,
        assists: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            pass_to: PropTypes.number,
            pass_from: PropTypes.number,
        })),
    })).isRequired,
};
AssistsProfile.defaultProps = {};

export default AssistsProfile;
