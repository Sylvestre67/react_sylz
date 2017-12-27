import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import findKey from 'lodash.findkey';

import 'react-table/react-table.css'
import './assists-table.css';

const _ = {findKey: findKey};

class AssistsTable extends Component {

    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
        this.handleClickOnRow = this.handleClickOnRow.bind(this);
    }

    getData(){
        return this.props.data.results;
    }

    getHeaders(){
        let headers = [ { Header: 'Player', accessor: 'name' } ];
        this.getData().map((player) => {
            headers.push({
                Header: player.name,
                id: `${player.name}_column`,
                accessor: (data) => {
                    let position = parseInt(_.findKey(data.assists, function(o) { return o.pass_to === player.name ; }), 10);
                    return (position >= 0)
                        ? data.assists[position].assists
                        : 'N/A';
                }
            })
        });

        return headers
    }

    handleClickOnRow(player){
        this.props.updateActivePlayer(player)
    }

    render() {
        return (
            <div className='assists-table'>
                <ReactTable
                    data={this.getData()}
                    columns={this.getHeaders()}
                    defaultPageSize={12}
                    showPagination={false}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                this.handleClickOnRow(rowInfo.index);
                                if (handleOriginal) {
                                    handleOriginal()
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

AssistsTable.propTypes = {
    data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape())
    }).isRequired,
    updateActivePlayer: PropTypes.func.isRequired
};
AssistsTable.defaultProps = {};

export default AssistsTable;
