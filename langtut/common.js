"use strict";

let wordMap;
let sentenceMap;

function prepareData() {
    words = words.concat(wordsFinal);
    sentences = sentences.concat(sentencesFinal);
    wordMap = new Map(words.map(v => [v.id, v]));
    sentenceMap = new Map(sentences.map(v => [v.id, v]));

    for (const word of wordMap.values()) {
        word.sentences = new Array();
        if (word.tag) {
            word.tag = word.tag.split(',');
        }
    }

    for (const sentence of sentenceMap.values()) {
        for (const [key, value] of Object.entries(sentence)) {
            if (!key.startsWith('v-')) {
                continue;
            }
            const wordId = key.substring(2);
            const word = wordMap.get(wordId);
            word.sentences.push(sentence);
        }
    }
}

function wordLine(word) {
    return word.v
            + ' [' + word.id + ']'
            + ' (t=' + word.t + ')'
            + (word.tag? ' (tag=' + word.tag + ')' : '')
            + ' (p=' + word.p + ')'
            + ' (sentences=' + word.sentences.length + ')'
            + ' (translation=' + word.trans + ')'
            + ' <a href="https://www.onelook.com/?w=' + word.v + '">[OL]</a>'
            + ' <a href="https://letonika.lv/groups/default.aspx?q=' + word.v + '&r=10331062&g=2">[LET]</a>'
            + ' <a href="https://sentence.yourdictionary.com/' + word.v + '">[Web4]</a>'
            ;
}

function showElement(e) {
    const elem = document.getElementById(e);
    elem.setAttribute('style', 'display: show;');
}

function hideElement(e) {
    const elem = document.getElementById(e);
    elem.setAttribute('style', 'display: none;');
}
