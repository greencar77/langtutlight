"use strict";


function init() {
    prepareData();
    showSelections();
}

function showSelections() {
    let div = document.getElementById('selection');

    let ol = document.createElement('ol');

    selections.forEach(s => {
        let li = document.createElement('li');
        li.innerHTML = '<a href="quiz.html#' + s.id + '">' + s.title + '</a>';
        ol.appendChild(li);
    });

    div.appendChild(ol);
}
