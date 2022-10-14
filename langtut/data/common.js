"use strict";

const bookTag = ['dome', 'summer', 'cave'];

const selections = [
    {
        "id": "all",
        "title": "All",
        "query": function(word) {
            return word.sentences.length > 0;
        }
    },
    {
        "id": "t_pv",
        "title": "Phrasal verbs",
        "query": function(word) {
            return word.sentences.length > 0
                && word.t && word.t == 'pv';
        }
    },
    {
        "id": "t_i",
        "title": "Idioms",
        "query": function(word) {
            return word.sentences.length > 0
                && word.t && word.t == 'i';
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
    {
        "id": "cave",
        "title": "Book \"The Cave\"",
        "query": function(word) {
            return word.sentences.length > 0
                && word.tag && word.tag.includes('cave');
        }
    },
    {
        "id": "plus",
        "title": "0+ words",
        "query": function(word) {
            return word.sentences.length > 0
                && (!word.p || word.p == '0' || word.p == '+1');
        }
    },
    {
        "id": "minus",
        "title": "-1 words",
        "query": function(word) {
            return word.sentences.length > 0
                && word.p == '-1';
        }
    },
];