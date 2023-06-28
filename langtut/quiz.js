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
        quizContext.selection = selections.filter(v => v.id == selectionId)[0];
    } else {
        quizContext.selection = selections.filter(v => v.id == 'all')[0];
    }
    return filterWords(wordMap, quizContext.selection.query);
}


function nextQuestion() {
    answeredMode = false;
    showElement('showAnswerSection');
    hideElement('analysis');
    document.getElementById('analysis').textContent = '';
    hideElement('answerSection');
    hideElement('answerDetails');

    popQuestion();
    showQuestion();
}

function showQuestion() {
    let e = document.getElementById('question');
    let questionString = question["v-" + questionWord.id];
    questionString = questionString.replaceAll(/%%/g, '%?%');
    let hint = questionWord.trans? questionWord.trans : (questionWord.ex? questionWord.ex: '');
    questionString = questionString.replaceAll(/%(\**?)%/g, '<span class="hidden">' + '(' + hint + ')' + '</span>');
    questionString = questionString.replaceAll(/%(.*?)%/g, '<span class="hidden">$1</span>');
    e.innerHTML = questionString;

    const qCount = document.getElementById('questionCount');
    qCount.textContent = questionCount;

    document.getElementById('otherWords').textContent = '';
    if (question.com) {
        let bookInfo = '';
        if (question.tag) {
            let bookTags = question.tag.filter(t => bookTag.includes(t));
            if (bookTags.length > 0) {
                bookInfo = books.get(bookTags[0]).title;
            }
        }
        if (bookInfo || question.tag) {
            document.getElementById('questionExtras').innerHTML = '<br/>' + '<br/>'
                + bookInfo
                + ' [' + (question.tag? question.tag : '') + ']' /*+ ' ' + question.com*/;
        } else {
            document.getElementById('questionExtras').textContent = '';
        }
    } else {
        document.getElementById('questionExtras').textContent = '';
    }
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

function showAnswer() {
    answeredMode = true;
    hideElement('showAnswerSection');
    showElement('analysis');
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

    e = document.getElementById('comment');
    e.innerHTML = question.com;

    showAnalysis();
}

function showAnalysis() {
    let analysisEl = document.getElementById('analysis');

    let wordListEl = document.createElement('ol');
    let focusWordLi = document.createElement('li');
    focusWordLi.innerHTML = wordLine(questionWord);
    wordListEl.appendChild(focusWordLi);
    const otherWordSentences = Object.keys(question)
        .filter(s => s.startsWith('v-'))
        .map(v => v.substring(2))
        .filter(n => n != questionWord.id);
    if (otherWordSentences.length > 0) {
        for (const sentenceWordId of otherWordSentences) {
            let li = document.createElement('li');
            li.innerHTML = wordLine(wordMap.get(sentenceWordId));
            wordListEl.appendChild(li);
        }
    }

    analysisEl.appendChild(wordListEl);
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