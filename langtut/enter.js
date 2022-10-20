"use strict";

function init() {
}

function clickGenerate() {
    let inputEl = document.getElementById('input');
    let inputString = inputEl.value;
    let inputRows = inputString.split('\n');

    let words = new Array();
    let sentences = new Array();

    for (const v in inputRows) {
        let parts = inputRows[v].split('||');
        words.push('@@');
        words.push(parts[0]);

        sentences.push('@@');
        sentences.push(parts[1]);
    }

    let wordsEl = document.getElementById('words');
    let wordContent = '';
    words.forEach(v => wordContent+= v + '\n');
    wordsEl.value = wordContent;

    let sentencesEl = document.getElementById('sentences');
    let sentenceContent = '';
    sentences.forEach(v => sentenceContent+= v + '\n');
    sentencesEl.value = sentenceContent;
}