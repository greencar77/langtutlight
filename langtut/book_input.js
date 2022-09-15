"use strict";

let wordIndexMap;

function init() {
    prepareData();
    prepareDataBook(wordMap);
}

function clickGenerate() {
    let inputEl = document.getElementById('input');
    let inputString = inputEl.value;
    let inputRows = inputString.split('\n');

    let words = parseWords(inputRows);
    console.log('words');
    console.log(words);

    showWords(words);
}

function prepareDataBook(wordMap) {
    wordIndexMap = new Map();
    for (const word of wordMap.values()) {
        let alternatives;
        if (wordIndexMap.get(word.v)) {
            alternatives = wordIndexMap.get(word.v);
        } else {
            alternatives = new Map();
            wordIndexMap.set(word.v, alternatives);
        }
        alternatives.set(word.t, word);
    }
}

function parseWords(inputRows) {
    let words = new Array();
    for (const rowId in inputRows) {
        if (!inputRows[rowId]) {
            continue;
        }
        if (inputRows[rowId].startsWith('@@')) {
            continue;
        }

        let word = {};

        let parts = inputRows[rowId].split('|');
        word.content = parts[0];
        for (let i = 1; i < parts.length; i++) {
            if (parts[i].indexOf(':') == -1) {
                alert('No elem-value: ' + parts[i]);
            }
            let elemValue = parts[i].split(':');
            word[elemValue[0]] = elemValue[1];
        }

        words.push(word);
    }
    return words;
}

function showWords(words) {
    let wordsEl = document.getElementById('wordList');
    let ol = document.createElement('ol');
    words.forEach(v => {
        let li = document.createElement('li');
        let index = v.v? v.v : v.content;
        let showContent = v.content
            + (v.t? ', t:' + v.t : '')
            + (v.v? ', v:' + v.v : '')
            ;
        if (wordIndexMap.get(index)) {
            li.innerHTML = '<span class="existingWord">' + showContent + ' ' + wordLine(wordIndexMap.get(index).values().next().value) + '</span>'; //TODO [0]
        } else {
            li.innerHTML = showContent + ' ' + wordLineCandidate(index);
        }
        ol.appendChild(li);
    });
    wordsEl.appendChild(ol);
}


function wordLineCandidate(wordCandidate) {
    return ' <a href="https://www.onelook.com/?w=' + wordCandidate + '">[OL]</a>'
            + ' <a href="https://letonika.lv/groups/default.aspx?q=' + wordCandidate + '&r=10331062&g=2">[LET]</a>'
            + ' <a href="https://sentence.yourdictionary.com/' + wordCandidate + '">[Web4]</a>'
            ;
}
