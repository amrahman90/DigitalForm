"use strict";

let freqPoints = new Array(30);
let gradPoints = new Array(30);
let emotionalQues = [2,4,8,11,14,16,18,20,22,24];
let vegetativeQues = [1,5,7,9,15,19,23,26,27,28];
let motorischeQues = [3,6,10,12,13,17,21,25,29,30];

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

let checked = (ev) => {
    let q = ev.id.split('_')[0];
    let quesId = q.substring(0, q.length-1);
    let quesType = q.substring(quesId.length, q.length);
    let quesPoint = ev.id.split('_')[1];

    // toggle check icons
    for(let i=1; i<=4; i++) {
        $("#"+quesId+quesType+"_"+i).find("i").remove();
    }
    $("#"+ev.id).append("<i class='fas fa-check'></i>");

    // activate the get results button
    if(document.getElementsByTagName("i").length == 60) {
        $('#result-button').prop("disabled", false);
    }

    // calculate points
    if (quesType === 'f' || quesType === 'F') {
        freqPoints[quesId - 1] = parseInt(quesPoint);
    }
    else if (quesType === 'g' || quesType === 'G') {
        gradPoints[quesId - 1] = parseInt(quesPoint);
    }
    $("td#" + quesId + "_9").html(freqPoints[quesId - 1] + gradPoints[quesId - 1]);
}

let getresults = () => {
    let emotionalPoints = 0;
    let vegetativePoints = 0;
    let motorischePoints = 0;
    for(let i=1; i<=30; i++) {
        if(emotionalQues.indexOf(i) > -1) {
            emotionalPoints += (freqPoints[i-1] + gradPoints[i-1]);
        }
        else if(vegetativeQues.indexOf(i) > -1) {
            vegetativePoints += (freqPoints[i-1] + gradPoints[i-1]);
        }
        else if(motorischeQues.indexOf(i) > -1) {
            motorischePoints += (freqPoints[i-1] + gradPoints[i-1]);
        }
    }
    $("div#result").show('slow');

    $("#firstLevelHeading").append("<b> ( "+ emotionalPoints + " ) </b>");
    $("#secondLevelHeading").append("<b> ( "+ vegetativePoints + " ) </b>");
    $("#thirdLevelHeading").append("<b> ( "+ motorischePoints + " ) </b>");

    //show emotional result
    if(emotionalPoints > 40) {
        $("p#firstLevelResult-3").show('slow');
    }
    else if(emotionalPoints > 30) {
        $("p#firstLevelResult-2").show('slow');
    }
    else if(emotionalPoints > 19) {
        $("p#firstLevelResult-1").show('slow');
    }

    //show vegetative result
    if(vegetativePoints > 40) {
        $("p#secondLevelResult-3").show('slow');
    }
    else if(vegetativePoints > 30) {
        $("p#secondLevelResult-2").show('slow');
    }
    else if(vegetativePoints > 19) {
        $("p#secondLevelResult-1").show('slow');
    }

    //show motorische result
    if(motorischePoints > 40) {
        $("p#thirdLevelResult-3").show('slow');
    }
    else if(motorischePoints > 30) {
        $("p#thirdLevelResult-2").show('slow');
    }
    else if(motorischePoints > 19) {
        $("p#thirdLevelResult-1").show('slow');
    }

    $('#result-button').prop("disabled", true);
}

$(document).ready(() => {
    initializeVariables();
});