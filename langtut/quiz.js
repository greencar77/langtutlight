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

    let selectionId = window.location.hash.substring(1);
    if (selectionId) {
        quizContext.selection = selections.filter(v => v.id == selectionId)[0];
    } else {
        quizContext.selection = selections.filter(v => v.id == 'all')[0];
    }
    quizContext.remainingWords = filter(wordMap, quizContext.selection.query);

    hideElement('btnDebugOff');
    nextQuestion();
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
    let questionString = question["v-" + questionWord.id];
    questionString = questionString.replaceAll(/%%/g, '%?%');
    questionString = questionString.replaceAll(/%(.*?)%/g, '<span class="hidden">$1</span>');
    e.innerHTML = questionString;

    const qCount = document.getElementById('questionCount');
    qCount.textContent = questionCount;
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

    let randomSentenceIndex = Math.floor(Math.random() * randomWord.sentences.length);
    let randomSentence = randomWord.sentences[randomSentenceIndex];
    question = randomSentence;
}

function filter(wordMap, fun) {
    let result = Array.from(wordMap.values()).filter(fun);
    console.log('Selected ' + result.length + ' words');
    return result;
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
    e.textContent = question.v;

    e = document.getElementById('answerId');
    e.textContent = question.id;

    e = document.getElementById('questionWord');
    e.innerHTML = wordLine(questionWord);

    e = document.getElementById('comment');
    e.innerHTML = question.com;
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