import React, {Component} from 'react';

import axios from 'axios'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class ProposalResultPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteId: props.match.params.id,
            token: props.match.params.token,
            voteName: "",
            result: [],
            winner: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.voteId}/name`)
            .then(response => this.setState({voteName: response.data}))
            .catch(error => alert(error.response.data.message));

        axios.get(`/api/counting/${this.state.voteId}?token=${this.state.token}`)
            .then(response => {
                const result = response.data.result;
                am4core.useTheme(am4themes_animated);
                let chart = am4core.create("myChart", am4charts.XYChart);

                const appreciation = () => {
                    return {
                        VERY_GOOD: 0,
                        GOOD: 0,
                        PRETTY_GOOD: 0,
                        FAIR: 0,
                        BAD: 0,
                        REJECT: 0
                    }
                };

                const formatAppreciations = (results) => {
                    const formated = results.reduce((acc, note) => {
                        acc[note.appreciation] = note.note;
                        return acc
                    }, {});
                    return Object.assign(appreciation(), formated);
                };

                chart.data = result
                    .map(res => Object.assign(
                        {},
                        {choice: res.label},
                        formatAppreciations(res.results))
                    );

                console.log(chart.data);

                chart.legend = new am4charts.Legend();
                chart.legend.position = "right";

                // Create axes
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "choice";
                categoryAxis.renderer.grid.template.opacity = 0;

                var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.renderer.grid.template.opacity = 0;
                valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
                valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
                valueAxis.renderer.ticks.template.length = 10;
                valueAxis.renderer.line.strokeOpacity = 0.5;
                valueAxis.renderer.baseGrid.disabled = true;
                valueAxis.renderer.minGridDistance = 40;

                // Create series
                function createSeries(field, name) {
                    var series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.valueX = field;
                    series.dataFields.categoryY = "choice";
                    series.stacked = true;
                    series.name = name;

                    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.locationX = 0.5;
                    labelBullet.label.text = name + " {valueX}%";
                    labelBullet.label.fill = am4core.color("#fff");
                }

                createSeries("VERY_GOOD", "VERY GOOD");
                createSeries("GOOD", "GOOD");
                createSeries("PRETTY_GOOD", "PRETTY GOOD");
                createSeries("FAIR", "FAIR");
                createSeries("BAD", "BAD");
                createSeries("REJECT", "REJECT");
            })
            .catch(error => alert(error.response.data.message));
    }

    render() {
        return (
            <div id="myChart"/>
        )

    }
}

export default ProposalResultPage;
