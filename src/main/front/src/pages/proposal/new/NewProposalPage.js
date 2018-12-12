import React, {Component} from 'react';
import NewProposalForm from "./NewProposalForm";
import axios from 'axios'
import CenteredPage from "../../../components/CenteredPage";
import Jumbotron from "../../../components/Jumbotron";
import Ripple from "../../../images/Ripple";

class NewProposalPage extends Component {

    constructor() {
        super();

        this.state = {
            label: "",
            creator: "",
            choices: [],
            participants: [],
            isSubmitingProposal: false
        }
    }

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <NewProposalForm
                        onVoteNameChange={e => this.setState({"label": e.target.value})}
                        onEmailChange={e => this.setState({"creator": e.target.value})}
                        onAtendeesChange={e => this.setState({"participants": this.splitAndClean(e.target.value)})}
                        onChoicesChange={e => this.setState({"choices": this.splitAndClean(e.target.value)})}
                        emailsFormated={this.state.participants}
                        choicesFormated={this.state.choices}
                        onSubmit={this.submitNewProposal}
                    />
                    <div className="text-center">
                        {this.state.isSubmitingProposal
                            ? <Ripple/>
                            : <button className="btn btn-primary" onClick={() => this.submitNewProposal()} disabled={this.state.isSubmitingProposal}>
                                Submit
                            </button>
                        }

                    </div>
                </Jumbotron>
            </CenteredPage>
        );
    }

    splitAndClean = (string) => {

        if(string === "")
            return [];

        return string
            .split(",")
            .map(email => email.trim())
            .filter(item => item !=="");
    };

    submitNewProposal = () => {

        if (!this.state.label || !this.state.creator || this.state.choices.length === 0 || this.state.participants.length === 0) {
            alert("One field is not filled");
            return;
        }

        if (!this.isEmailValid(this.state.creator)) {
            alert("Your Email adress is not valid");
            return;
        }

        if (this.state.participants.find(p => !this.isEmailValid(p))) {
            alert("One of your participants Email is not valid");
            return;
        }

        this.setState({isSubmitingProposal: true});

        const choicesForRESTCall = this.state.choices.map(choice => Object.assign({}, {"label": choice}));
        const emailsForRESTCall = this.state.participants.map(participant => Object.assign({}, {"mail": participant}));


        const payload = Object.assign( {...this.state}, {"choices": choicesForRESTCall}, {"participants": emailsForRESTCall});

        axios.post("/api/proposal", payload)
            .then(response => this.props.history.push("/confirmation/creation/" + this.state.label))
            .catch(error => {
                alert(error.response.data.message);
                this.setState({isSubmitingProposal: false});
            })
    };

    isEmailValid = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

export default NewProposalPage;
