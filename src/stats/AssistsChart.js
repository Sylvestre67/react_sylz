import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AssistsChart extends Component {

    render() {
        console.log(this);
        const nodes = this.props.nodes.map((node) => {

            const translate = ['translate(', node.centroid[0], ',', node.centroid[1], ')'].join('');

            return <g key={node.data.pass_to} transform={translate}>
                <text>
                    {node.data.pass_to}
                </text>
            </g>
        });

        return (
            <g {...this.props.center}>
                <circle {...this.props.circle} />
                <text>{this.props.player.name}</text>
                {nodes}
            </g>
        );
    }
}

AssistsChart.propTypes = {};
AssistsChart.defaultProps = {};

export default AssistsChart;
