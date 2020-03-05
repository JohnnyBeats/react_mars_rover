import React from "react";
import DirectionEnum from "../Classes/DirectionEnum";

class Rover extends React.Component {
    render() {
        function getDirectionClassName(direction){
            const roverClassName = "rover";

            switch (direction) {
                case DirectionEnum.NORTH:
                    return roverClassName + " north";
                case DirectionEnum.EAST:
                    return roverClassName + " east";
                case DirectionEnum.SOUTH:
                    return roverClassName + " south";
                case DirectionEnum.WEST:
                    return roverClassName + " west";
                default:
                    return roverClassName;
            }
        }

        return (
            //Added inline style item here to ensure turning is smooth between directions
            <div data-testid="rover" className={getDirectionClassName(this.props.engine.getDirection()) + (this.props.engine.isActive ? " active" : " inActive")} style={{transform: 'rotate(' + this.props.engine.degreesRotation + 'deg)'}}>

            </div>
        )
    }
}

export default Rover;