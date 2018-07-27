"use strict";

let freqPoints = new Array(30);
let gradPoints = new Array(30);

let totalPoints;

let calculatePointsTotal = (value) => {
    let quesId = value.name.split('_')[0];
    let quesType = value.name.split('_')[1];

    if (quesType === 'f' || quesType === 'F') {
        freqPoints[quesId - 1] = parseInt(value.value);
    }
    else if (quesType === 'g' || quesType === 'G') {
        gradPoints[quesId - 1] = parseInt(value.value);
    }

    $("td#" + quesId + "_9").html(freqPoints[quesId - 1] + gradPoints[quesId - 1]);


    // Total Points Calculation
    totalPoints = 0;

    totalPoints = totalPoints + freqPoints.reduce((a, b) => a + b, 0);

    //freqPoints.forEach((item) => {
    //    totalPoints = totalPoints + item;
    //});

    gradPoints.forEach((item) => {
        totalPoints = totalPoints + item;
    });

    $("td#totalPoints").html(totalPoints);

    if (totalPoints > 19) {
        if (totalPoints > 40) {
            $("div#result p").hide('slow');

            $("p#firstLevelResult-3").show('slow');
            $("p#secondLevelResult-3").show('slow');
            $("p#thirdLevelResult-3").show('slow');
        }
        else if (totalPoints > 30) {
            $("div#result p").hide('slow');

            $("p#firstLevelResult-2").show('slow');
            $("p#secondLevelResult-2").show('slow');
            $("p#thirdLevelResult-2").show('slow');
        }
        else if (totalPoints > 19) {
            $("div#result p").hide('slow');

            $("p#firstLevelResult-1").show('slow');
            $("p#secondLevelResult-1").show('slow');
            $("p#thirdLevelResult-1").show('slow');
        }

        $("div#result").show('slow');
    }
    else {
        $("div#result").hide('slow');
    }
}

let initializeVariables = () => {
    for (var i = 0; i < 30; i++) {
        freqPoints[i] = 0;
        gradPoints[i] = 0;
    }
};

$(document).ready(() => {
    initializeVariables();
});