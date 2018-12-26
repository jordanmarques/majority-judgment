import React, {Component} from 'react';
import axios from 'axios'
import CenteredPage from "../../../components/CenteredPage";
import Jumbotron from "../../../components/Jumbotron";
import Ripple from "../../../images/Ripple";
import TagInput from "../../../components/TagInput";
import Input from "../../../components/Input";

class NewProposalPage extends Component {

    constructor(props) {
        super();

        this.state = {
            label: props.match.params.name,
            creator: "",
            choices: props.match.params.choices.split("|") || [],
            participants:  props.match.params.attendees.split("|") || [],
            isSubmitingProposal: false
        }
    }

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <Input name={"Vote Name"} value={this.state.label} onChange={value  => this.setState({label: value})}/>
                    <Input name={"Email Address"} onChange={value  => this.setState({creator: value})}/>
                    <TagInput name={"Attendees"} values={this.state.participants} onTagsChange={tags => this.setState({participants: tags})}/>
                    <TagInput name={"Choices"} values={this.state.choices} onTagsChange={tags => this.setState({choices: tags})}/>
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
