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

        const getDisplayName = (name) => {
            return name.split(" ")[0];
        }

        return (
            //Added inline style item here to ensure turning is smooth between directions
            <div data-testid="rover" className={getDirectionClassName(this.props.engine.getDirection()) + (this.props.engine.isActive ? " active" : " inActive")} style={{transform: 'rotate(' + this.props.engine.degreesRotation + 'deg)'}}>
                {this.props.engine.name !== undefined && this.props.engine.name !== "" &&
                    <span className="roverName"> {getDisplayName(this.props.engine.name)} </span>
                }
            </div>
        )
    }
}

export default Rover;