import React from "react";

class SnackMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose = () => {
        this.props.onClose(this.props.index);
    };

    render() {
        return (
            <div className="message">
                <span data-testid="closeButton" className="close" onClick={this.onClose}>x</span>
                <div data-testid="messageText" className="text">{this.props.text}</div>
            </div>
        )
    }
}

export default SnackMessage;