"use strict";

function init() {
    prepareData();

    let words = getWords();
    showWords(words);
}

function getWords() {
    let id = window.location.hash.substring(1);
    let selectedFilter;
    if (id) {
        selectedFilter = wordFilters.filter(v => v.id == id)[0];
    } else {
        selectedFilter = wordFilters.filter(v => v.id == 'all')[0];
    }
    return filterWords(wordMap, selectedFilter.query);
}

function showWords(words) {
    let main = document.getElementById('main');
    let ol = document.createElement('ol');

    let wordsOrdered = Array.from(words);
    wordsOrdered.sort((a, b) => a.v.localeCompare(b.v));
    wordsOrdered.forEach(w => {
        let li = document.createElement('li');
        li.innerHTML = wordLine(w);
        ol.appendChild(li);
    });
    main.appendChild(ol);
}