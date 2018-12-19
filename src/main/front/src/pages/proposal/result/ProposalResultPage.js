import React, {Component} from 'react';

import axios from 'axios'
import Chart from 'chart.js';
import Jumbotron from "../../../components/Jumbotron";
import CenteredPageLarge from "../../../components/CenteredPageLarge";
import Crown from "../../../images/Crown";
import ColoredText from "../../../components/ColoredText";

class ProposalResultPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteId: props.match.params.id,
            token: props.match.params.token,
            voteName: "",
            attendees: [],
            result: [],
            winner: {
                label: "",
                note: {
                    note: "",
                    appreciation: ""
                }
            }
        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.voteId}/name`)
            .then(response => this.setState({voteName: response.data}))
            .catch(error => alert(error.response.data.message));

        axios.get(`/api/proposal/${this.state.voteId}/attendees`)
            .then(response => this.setState({attendees: response.data}))
            .catch(error => alert(error.response.data.message));

        axios.get(`/api/counting/${this.state.voteId}?token=${this.state.token}`)
            .then(response => {
                this.setState({winner: response.data.winner});
                const result = response.data.result;

                const ctx = document.getElementById("myChart");

                const datasets = this.transformDataForGraph(result, [
                    "VERY_GOOD",
                    "GOOD",
                    "PRETTY_GOOD",
                    "FAIR",
                    "BAD",
                    "REJECT"
                ]);

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: result.map(res => this.cleanLabel(res.label)),
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }],
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    autoSkip: false
                                }
                            }]

                        }
                    }
                });
            })
            .catch(error => alert(error.response.data.message));
    }

    render() {
        return (
            <CenteredPageLarge>
                <Jumbotron>
                    <h1 className="display-4">{this.state.voteName}</h1>
                    <canvas id="myChart"/>
                    <div className="winnerSection">
                        <Crown height={50}/>
                        <h1>
                            <ColoredText text={this.cleanLabel(this.state.winner.label)}/>
                        </h1>
                    </div>
                    <div className="text-center">
                        <span>At least {this.state.winner.note.note}% of voters found {this.cleanLabel(this.state.winner.label)} {this.cleanLabel(this.state.winner.note.appreciation)}</span>
                    </div>
                </Jumbotron>
                <Jumbotron>
                    <h1 className="display-4">Who Voted ?</h1>
                    <div>
                        {this.state.attendees.map((attendee, i) => {
                            const color = attendee.hasVoted ? "hasVoted" : "hasNoVoted";
                            return (
                                <div key={i} className={"attendees " + color}>
                                    <span>{attendee.mail}</span>
                                </div>
                            )
                        })}
                    </div>
                </Jumbotron>
            </CenteredPageLarge>

        )

    }

    transformDataForGraph = (result, appreciations) => {
        return appreciations.map(appreciation => {
            const object = {};
            object.label = this.cleanLabel(appreciation);

            const appreciationNotes = [];
            const backgroundColor = [];

            result.forEach(res => {
                const note = res.results.find(n => n.appreciation === appreciation);
                const color = this.getColorForAppreciation(appreciation);

                backgroundColor.push(color);

                if (note) {
                    appreciationNotes.push(note.note)
                } else {
                    appreciationNotes.push(0)
                }

            });

            object.backgroundColor = backgroundColor;
            object.data = appreciationNotes;

            return object;
        });
    };

    getColorForAppreciation = (appreciation) => {
        switch (appreciation) {
            case "VERY_GOOD":
                return "#64b5de";
            case "GOOD" :
                return "#6592de";
            case "PRETTY_GOOD" :
                return "#666dde";
            case "FAIR" :
                return "#8062df";
            case "BAD" :
                return "#a462df";
            case "REJECT":
                return "#c862de";
            default :
                return "red";
        }
    };

    cleanLabel = (label) => {

        if (!label)
            return label;

        return label.replace("_", " ").toUpperCase()
    }
}

export default ProposalResultPage;
