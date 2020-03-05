import React from "react";
import Rover from './Rover.js'

class Column extends React.Component {
    render() {
        const roverEngine = this.props.roverTeam.rovers.filter((item) => {return item.checkPosition([this.props.column, this.props.row])})[0];
        const coordinates = this.props.column + "," +this.props.row;

        return (
            <div className="column">
                {roverEngine !== undefined ?
                    <Rover engine={roverEngine}/> :
                    <span className="columnCoordinate" title={coordinates}>{coordinates}</span>}
            </div>
        )
    }
}

class Row extends React.Component {
    render() {
        return (
            <div className="row">
                {Array.from(Array(this.props.columns).keys()).map((value, index) => {
                    return <Column key={"column-" + index}  row={this.props.row} column={index} roverTeam={this.props.roverTeam}/>
                })}
            </div>
        )
    }
}

class Grid extends React.Component {
    render() {
        const maxX = this.props.gridSize[0];
        const maxY = this.props.gridSize[1];
        //const pageSize = 5;

        //we want to add one extra because we work on a zero based number
        let rows = maxY + 1;
        let columns = maxX + 1;

        //we need to page the grid because we will break the DOM with too many items
        /*if(rows > pageSize){
            rows = pageSize;
            columns = pageSize;
        }*/

        return (
            <div className={this.props.showCover ? "grid hidden": "grid"}>
                {Array.from(Array(rows).keys()).map((value, index) => {
                    return <Row  key={"row-" + index} columns={columns} row={maxY - index} roverTeam={this.props.roverTeam}/>
                })}
            </div>
        )
    }
}

export default Grid;