"use strict";

let wordMap;
let sentenceMap;
let wordTypeMap;

function prepareData() {
    words = words.concat(wordsFinal);
    sentences = sentences.concat(sentencesFinal);
    sentences = sentences.concat(sentencesYourDictionary);
    wordMap = new Map(words.map(v => [v.id, v]));
    sentenceMap = new Map(sentences.map(v => [v.id, v]));
    wordTypeMap = new Map(wordTypes.map(v => [v.id, v]));

    transformWordTags(wordMap);
    transformSentenceTags(sentenceMap);
    extractSentenceWords(sentenceMap);
    updateWordsFromBookSentence(words);
    processSynonyms(wordMap);

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

function processSynonyms(wordMap) {
    for (const word of wordMap.values()) {
        if (word.syn) {
            let mainWord = wordMap.get(word.syn);
            if (!mainWord.synonyms) {
                mainWord.synonyms = new Array();
            }
            mainWord.synonyms.push(word);
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
                    s.tag.forEach(sentenceTag => {
                        if ((bookTag.includes(sentenceTag) || sentenceTag == 's_yd') && (w.tag && !w.tag.includes(sentenceTag) || !w.tag)) {
                            console.log('Word ' + w.id + ' ' + w.v + ' is missing tag ' + sentenceTag);
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
                    s.tag.forEach(sentenceTag => {
                        if ((bookTag.includes(sentenceTag) || sentenceTag == 's_yd') && (w.tag && !w.tag.includes(sentenceTag) || !w.tag)) {
                            if (!w.tag) {
                                w.tag = new Array();
                            }
                            w.tag.push(sentenceTag);
                        }
                    });
                }
            });
        }
    });
}

function wordLine(word) {
    return '<span class="word">' + word.v + '</span>'
            + ' (' + (wordTypeMap.get(word.t)? wordTypeMap.get(word.t).name : 'undefined type')  + ')'
            + ' ' + getWordPriorityHtml(word)
            + (word.tag? ' [' + word.tag + ']' : '')
            + ' (sentences=' + word.sentences.length + ')'
            + ' (translation=' + word.trans + ')'
            + (word.syn? ' ' + 'syn=' + wordMap.get(word.syn).v : '')
            + (word.synonyms? ' ' + 'synlist=' + word.synonyms.map(x => x.v).join() : '')
            + ' <a href="https://www.onelook.com/?w=' + word.v + '">[OL]</a>'
            + ' <a href="https://letonika.lv/groups/default.aspx?q=' + word.v + '&r=10331062&g=2">[LET]</a>'
            + ' <a href="https://sentence.yourdictionary.com/' + word.v + '">[Web4]</a>'
            + ' [' + word.id + ']'
            ;
}

function getWordPriorityHtml(word) {
    let priorityClass;
    let priorityClassTitle;
    switch (word.p) {
    case '+1': priorityClass = 'plus'; priorityClassTitle = '+'; break;
    case '0': priorityClass = 'average'; priorityClassTitle = '0'; break;
    case '-1': priorityClass = 'minus'; priorityClassTitle = '-'; break;
    default: priorityClass = 'plus'; priorityClassTitle = '+';
    }

    return '<span class="' + priorityClass + '">' + priorityClassTitle + '</span>';
}

function showElement(e) {
    const elem = document.getElementById(e);
    elem.setAttribute('style', 'display: show;');
}

function hideElement(e) {
    const elem = document.getElementById(e);
    elem.setAttribute('style', 'display: none;');
}

function filterWords(wordMap, fun) {
    let result = Array.from(wordMap.values()).filter(fun);
    console.log('Selected ' + result.length + ' words');
    return result;
}
