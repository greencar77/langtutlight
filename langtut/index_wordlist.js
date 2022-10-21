"use strict";


function init() {
    prepareData();
    showList();
}

function showList() {
    let div = document.getElementById('index_wordlist');

    let ol = document.createElement('ol');

    wordFilters.forEach(s => {
        let li = document.createElement('li');
        li.innerHTML = '<a href="wordlist.html#' + s.id + '">' + s.title + '</a>';
        ol.appendChild(li);
    });

    div.appendChild(ol);
}
