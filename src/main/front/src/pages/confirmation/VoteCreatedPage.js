import React, {Component} from 'react';
import CenteredPage from "../../components/CenteredPage";
import Jumbotron from "../../components/Jumbotron";

class VoteCreatedPage extends Component {

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <h1 className="display-4">Vote {this.props.match.params.name} created !</h1>
                    <p>You will receive an email to vote for your proposal and an other one to manage the result.</p>
                </Jumbotron>
            </CenteredPage>
        );
    }
}

export default VoteCreatedPage;
