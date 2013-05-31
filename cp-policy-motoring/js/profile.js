function createGauge(iValue) {
    $("#gauge").kendoRadialGauge({

        pointer: {
            value: iValue,
            color: "#000000",
            cap: {
                size: 0.13
            }
        },

        scale: {
            startAngle: 0,
            endAngle: 180,
            min: 0,
            max: 10,
            minorTicks: {
                visible: false
            },
            majorTicks: {
                visible: false
            },
            labels: {
                position: "outside",
                visible: false
            },
            ranges: [
                {
                    from: 0,
                    to: 3,
                    color: "#39B54A"
                },
                {
                    from: 3.1,
                    to: 7,
                    color: "#F8971D"
                },
                {
                    from: 7.1,
                    to: 10,
                    color: "#ff0000"
                }]
        }
    });
}

function createDrivingTimeChart(generalDistance, morningDistance, eveningDistance, latenightDistance) {
    
    $("#piechart").kendoChart({
        legend: {
            position: "right",
            labels: {
                font: "16px Open Sans Condensed"
            }
        },
        chartArea: {
            background: "transparent",
            height: 233,
            width: 365
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: #= value#%"
            }
        },
        series: [{
            type: "pie",
            data: [{
                category: "General",
                value: generalDistance
            }, {
                category: "Evening Rush",
                value: eveningDistance
            }, {
                category: "Morning Rush",
                value: morningDistance
            }, {
                category: "Late Night",
                value: latenightDistance
            }],
            labels: {
                visible: false
            }
        }],
        tooltip: {
            visible: true,
            format: "{0} miles",
            font: "16px Open Sans Condensed"
        }
    });

}

function createExceptionGraph(geofencesBreaches, diagnosticBreaches, improperUseBreaches, tamperBreaches, impactBreaches) {
    $("#chart").kendoChart({
        legend: {
            visible: false,
            font: "16px Open Sans Condensed"
        },
        chartArea: {
            background: "transparent",
            height: 173,
            width: 365
        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            data: [geofencesBreaches, diagnosticBreaches, improperUseBreaches, tamperBreaches, impactBreaches],
            gap: 0.0,
            spacing: 0.0
        }],
        valueAxis: {
            max: 50,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            },
            labels: {
                font: "12px Open Sans Condensed"
            }
        },
        categoryAxis: {
            categories: ["Geofence", "Diagnostics", "Improper Use", "Tamper", "Impact"],
            majorGridLines: {
                visible: false
            },
            labels: {
                font: "16px Open Sans Condensed"
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #",
            font: "16px Open Sans Condensed"
        }
    });
}