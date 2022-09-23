"use strict";

const bookTag = ['dome', 'summer'];

const selections = [
    {
        "id": "all",
        "title": "All",
        "query": function(word) {
            return word.sentences.length > 0;
        }
    },
    {
        "id": "pv",
        "title": "Phrasal verbs",
        "query": function(word) {
            return word.sentences.length > 0
                && word.t && word.t == 'pv';
        }
    },
    {
        "id": "dome",
        "title": "Book \"Under the Dome\"",
        "query": function(word) {
            return word.sentences.length > 0
                && word.tag && word.tag.includes('dome');
        }
    },
    {
        "id": "summer",
        "title": "Book \"The Door into Summer\"",
        "query": function(word) {
            return word.sentences.length > 0
                && word.tag && word.tag.includes('summer');
        }
    },
];