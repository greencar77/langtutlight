"use strict";

function init() {
    prepareData();

    let main = document.getElementById('main');
    let ol = document.createElement('ol');

    let wordsOrdered = Array.from(wordMap.values());
    wordsOrdered.sort((a, b) => a.v.localeCompare(b.v));
    wordsOrdered.forEach(w => {
        let li = document.createElement('li');
        li.innerHTML = wordLine(w);
        ol.appendChild(li);
    });
    main.appendChild(ol);
}