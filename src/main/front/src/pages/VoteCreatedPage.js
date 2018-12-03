import React, {Component} from 'react';

class VoteCreatedPage extends Component {

    render() {
        return (
            <div>
                <h1>Vote {this.props.match.params.name} created !</h1>
            </div>
        );
    }
}

export default VoteCreatedPage;
