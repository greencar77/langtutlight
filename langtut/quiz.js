"use strict";

let quizContext;

let questionWord;
let question;
let questionCount;
let answeredCount = 0;
let passedCount = 0, failedCount = 0;

function init() {
    quizContext = {};
    prepareData();
    nextQuestion();
}

function nextQuestion() {
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
    let pickableWords = filter(wordMap);
    if (pickableWords.length == 0) {
        alert('No more words left to pick!');
        return;
    }
    let randomWordIndex = Math.floor(Math.random() * pickableWords.length);
    let randomWord = pickableWords[randomWordIndex];
    console.log(randomWord);
    questionWord = randomWord;
    questionCount = pickableWords.length;
    wordMap.delete(questionWord.id);

    let randomSentenceIndex = Math.floor(Math.random() * randomWord.sentences.length);
    let randomSentence = randomWord.sentences[randomSentenceIndex];
    question = randomSentence;
}

function filter(wordMap) {
    let result = Array.from(wordMap.values()).filter(e => e.sentences.length > 0);
    console.log('Filtered ' + result.length + ' words');
    return result;
}

function showAnswer() {
    hideElement('showAnswerSection');
    showElement('answerSection');
    showElement('passedFailedSection');
    showElement('answerDetails');

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