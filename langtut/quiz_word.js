"use strict";

let quizContext;

let questionWord;
let question;
let questionCount;
let answeredCount = 0;
let passedCount = 0, failedCount = 0;

let answeredMode = false;
let debugMode = false;

function init() {
    quizContext = {};
    prepareData();

    quizContext.remainingWords = getWords();

    hideElement('btnDebugOff');
    nextQuestion();
}

function getWords() {
    let selectionId = window.location.hash.substring(1);
    if (selectionId) {
        quizContext.selection = wordFilters.filter(v => v.id == selectionId)[0];
    } else {
        quizContext.selection = wordFilters.filter(v => v.id == 'all')[0];
    }
    return filterWords(wordMap, quizContext.selection.query);
}

function nextQuestion() {
    answeredMode = false;
    showElement('showAnswerSection');
    hideElement('answerSection');
    hideElement('answerDetails');

    popQuestion();
    showQuestion();
}

function showQuestion() {
    let e = document.getElementById('question');
    e.innerHTML = question.v + ' ' + '(' + question.synonyms.length + ')';

    const qCount = document.getElementById('questionCount');
    qCount.textContent = questionCount;

    document.getElementById('otherWords').textContent = '';
}

function popQuestion() {
    let pickableWords = quizContext.remainingWords;
    if (pickableWords.length == 0) {
        alert('No more words left to pick!');
        return;
    }
    let randomWordIndex = Math.floor(Math.random() * pickableWords.length);
    let randomWord = pickableWords[randomWordIndex];
    console.log(randomWord);
    questionWord = randomWord;
    questionCount = pickableWords.length;
    pickableWords.splice(randomWordIndex, 1);

    question = questionWord;
}

function showAnswer() {
    answeredMode = true;
    hideElement('showAnswerSection');
    showElement('answerSection');
    showElement('passedFailedSection');
    if (debugMode) {
        showElement('answerDetails');
    }

    answeredCount++;
    refreshStats();
    fillAdditionalInfo();
}

function fillAdditionalInfo() {
    let e = document.getElementById('answer');
    e.textContent = question.synonyms.map(x => x.v).join();

    e = document.getElementById('answerId');
    e.textContent = question.id;

    e = document.getElementById('questionWord');
    e.innerHTML = wordLine(questionWord);

    e = document.getElementById('comment');
    e.innerHTML = question.com;

    showOtherWords();
}

function showOtherWords() {
    const otherWordSentences = Object.keys(question)
        .filter(s => s.startsWith('v-'))
        .map(v => v.substring(2))
        .filter(n => n != questionWord.id);
    if (otherWordSentences.length > 0) {
        let div = document.getElementById('otherWords');
        let ol = document.createElement('ol');
        for (const sentenceWordId of otherWordSentences) {
            let li = document.createElement('li');
            li.innerHTML = wordLine(wordMap.get(sentenceWordId));
            ol.appendChild(li);
        }
        div.appendChild(ol);
    }
}

function markPassed() {
    passedCount++;
    hideElement('passedFailedSection');
    refreshStats();
}

function markFailed() {
    failedCount++;
    hideElement('passedFailedSection');
    refreshStats();
}

function refreshStats() {
    const ansCount = document.getElementById('stats');
    if (answeredCount > 0) {
        ansCount.textContent = '(Passed ' + passedCount + ' from ' + answeredCount
         + ' (' + Math.floor(passedCount * 100 / answeredCount) +  '%' + ')'
         + ')';
    }
}

function toggleDebug(debug) {
    if (debug) {
        hideElement('btnDebugOn');
        showElement('btnDebugOff');
        debugMode = true;
        if (answeredMode) {
            showElement('answerDetails');
        }
    } else {
        showElement('btnDebugOn');
        hideElement('btnDebugOff');
        hideElement('answerDetails');
        debugMode = false;
    }
}