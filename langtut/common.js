"use strict";

let wordMap;
let sentenceMap;

function prepareData() {
    words = words.concat(wordsFinal);
    sentences = sentences.concat(sentencesFinal);
    sentences = sentences.concat(sentencesYourDictionary);
    wordMap = new Map(words.map(v => [v.id, v]));
    sentenceMap = new Map(sentences.map(v => [v.id, v]));

    transformWordTags(wordMap);
    transformSentenceTags(sentenceMap);
    extractSentenceWords(sentenceMap);
    updateWordsFromBookSentence(words);

    checkIntegrity(words, sentences);
}

function extractSentenceWords(sentenceMap) {
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

function transformWordTags(wordMap) {
    for (const word of wordMap.values()) {
        word.sentences = new Array();
        if (word.tag) {
            word.tag = word.tag.split(',');
        }
    }
}

function transformSentenceTags(sentenceMap) {
    for (const sentence of sentenceMap.values()) {
        if (sentence.tag) {
            sentence.tag = sentence.tag.split(',');
        }
    }
}

function checkIntegrity(words, sentences) {
    checkIds(words);
    checkIds(sentences);
    checkWordsFromBookSentence(words);
}

function checkIds(something) {
    let usedIds = [];
    something.forEach(x => {
        if (usedIds.includes(x.id)) {
            console.log('Duplicate id: ' + x.id);
            console.log(x);
        }
        usedIds.push(x.id);
    });
}

function checkWordsFromBookSentence(words) {
    words.forEach(w => {
        if (w.sentences) {
            w.sentences.forEach(s => {
                if (s.tag) {
                    s.tag.forEach(t => {
                        if (bookTag.includes(t) && (w.tag && !w.tag.includes(t) || !w.tag)) {
                            console.log('Word ' + w.id + ' ' + w.v + ' is missing tag ' + t);
                        }
                    });
                }
            });
        }
    });
}

function updateWordsFromBookSentence(words) {
    words.forEach(w => {
        if (w.sentences) {
            w.sentences.forEach(s => {
                if (s.tag) {
                    s.tag.forEach(t => {
                        if (bookTag.includes(t) && (w.tag && !w.tag.includes(t) || !w.tag)) {
                            if (!w.tag) {
                                w.tag = new Array();
                            }
                            w.tag.push(t);
                        }
                    });
                }
            });
        }
    });
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
