import React, {Component} from 'react';
import axios from 'axios'
import VoteLine from "./VoteLine";
import CenteredPage from "../../../components/CenteredPage";
import Jumbotron from "../../../components/Jumbotron";
import Ripple from "../../../images/Ripple";

class ProposalVotePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteName: "",
            voteToken: props.match.params.token,
            voteId: props.match.params.id,
            choices: [],
            appreciations: [],
            votes: {},
            isSendingVote: false

        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.voteId}/name`)
            .then(response => this.setState({"voteName": response.data}))
            .catch(error => alert(error));

        axios.get("/api/appreciations")
            .then(response => this.setState({"appreciations": response.data}))
            .catch(error => alert(error));

        axios.get(`/api/proposal/${this.state.voteId}/choices`)
            .then(response => this.setState({"choices": response.data.map(choice => choice.label)}))
            .catch(error => alert(error));
    }

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <h1>{this.state.voteName}</h1>
                    <br/>
                    <div className={"col col-md-1O offset-md-1 votePageTable"}>
                        {
                            this.state.choices.map((choice, i) => <VoteLine
                                key={i}
                                appreciations={this.state.appreciations}
                                choice={this.cleanTitle(choice)}
                                onAppreciationClicked={(choice, appreciation) => this.setAppreciationToChoice(choice, appreciation)}/>)
                        }
                    </div>
                    <br/>

                    <div className="text-center">
                        {
                            this.state.isSendingVote
                                ? <Ripple/>
                                : <div className="spaced">
                                    <button className="btn btn-primary" onClick={() => this.submitVote()}>Vote !</button>
                                </div>
                        }
                    </div>
                </Jumbotron>
            </CenteredPage>
        );
    }

    setAppreciationToChoice = (choice, appreciation) => {
        this.setState(prevState => {
            const votes = Object.assign({}, prevState.votes);
            votes[choice] = appreciation;
            return {votes: votes}
        });
        console.log(choice, appreciation)
    };

    submitVote = () => {

        this.setState({isSendingVote: true});

        const votesCall = {};
        votesCall.votes = Object.keys(this.state.votes).map(choice => {
            const formatedChoice = {"label": choice.replace(" ", "_")};
            return {choice: formatedChoice, appreciation: this.state.votes[choice]};
        });

        votesCall.token = this.state.voteToken;

        axios.post("/api/proposal/" + this.state.voteId + "/vote", votesCall)
            .then(response => this.props.history.push("/confirmation/vote/"))
            .catch(error => {
                alert(error.response.data.message);
                this.setState({isSendingVote: false});
            })

    };

    cleanTitle = (title) => {
        return this.capitalizeFirstLetter(title.replace("_", " "));
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
}

export default ProposalVotePage;
