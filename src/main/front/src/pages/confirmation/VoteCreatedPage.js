import React, {Component} from 'react';
import CenteredPage from "../../components/CenteredPage";
import PageDefaultBody from "../../components/PageDefaultBody";

class VoteCreatedPage extends Component {

    render() {
        return (
            <CenteredPage>
                <PageDefaultBody>
                    <h1 className="display-4">Vote {this.props.match.params.name} created !</h1>
                </PageDefaultBody>
            </CenteredPage>
        );
    }
}

export default VoteCreatedPage;
