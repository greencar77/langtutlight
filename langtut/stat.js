"use strict";

function init() {
    prepareData();

    addStatistics();
}

function addStatistics() {
    let words = Array.from(wordMap.values());

    let wordCount = document.getElementById('wordCount');
    wordCount.textContent = words.length;
    let sentenceCount = document.getElementById('sentenceCount');
    sentenceCount.textContent = Array.from(sentenceMap.values()).length;

    let container = document.getElementById('main');

    let ol = document.createElement('ol');

    let li;

    li = document.createElement('li');
    li.textContent = 'Words with sentences: ' + words.filter(w => w.sentences.length > 0).length;
    ol.appendChild(li);

    let byTypeLi = document.createElement('li');
    byTypeLi.textContent = 'Words by type:';
    ol.appendChild(byTypeLi);
    let byTypeOl = document.createElement('ol');
    ol.appendChild(byTypeOl);

    li = document.createElement('li');
    li.textContent = 'Nouns (n): ' + words.filter(w => w.t == 'n').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Verbs (v): ' + words.filter(w => w.t == 'v').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Phrasal verbs (pv): ' + words.filter(w => w.t == 'pv').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Adjectives (a): ' + words.filter(w => w.t == 'a').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Adverbs (av): ' + words.filter(w => w.t == 'av').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Idioms (i): ' + words.filter(w => w.t == 'i').length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Undefined type: ' + words.filter(w => !w.t).length;
    byTypeOl.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Words without sentences: ' + words.filter(w => w.sentences.length == 0).length;
    ol.appendChild(li);

    li = document.createElement('li');
    li.textContent = 'Words - dome: ' + words.filter(w => w.tag && w.tag.includes('dome')).length;
    ol.appendChild(li);

    container.appendChild(ol);
}