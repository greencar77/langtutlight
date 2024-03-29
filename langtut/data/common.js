"use strict";

let books = [
    {
        "id": "dome",
        "title": "Under the Dome",
    },
    {
        "id": "summer",
        "title": "The Door into Summer",
    },
    {
        "id": "cave",
        "title": "The Cave",
    },
    {
        "id": "zeitoun",
        "title": "Zeitoun",
    },
    {
        "id": "lp_portugal",
        "title": "Lonely Planet Portugal, 2011",
    },
    {
        "id": "brfollies",
        "title": "The Brooklyn Follies",
    },
];

let bookTag = null;

const wordTypes = [
    {
        "id": "n",
        "name": "noun",
    },
    {
        "id": "a",
        "name": "adjective",
    },
    {
        "id": "v",
        "name": "verb",
    },
    {
        "id": "pv",
        "name": "phrasal verb",
    },
    {
        "id": "av",
        "name": "adverb",
    },
    {
        "id": "ph",
        "name": "phrase",
    },
    {
        "id": "i",
        "name": "idiom",
    },
];

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
    {
        "id": "s_yd",
        "title": "yourdictionary",
        "query": function(word) {
            return word.sentences.length > 0
                && word.tag && word.tag.includes('s_yd');
        }
    },
    {
        "id": "need_sentence",
        "title": "+1 with 0 or 1 sentence",
        "query": function(word) {
            return word.sentences.length <= 1
                && word.p == '+1';
        }
    },
];

const allowedWordType = ['n', 'a', 'v', 'av', 'i', 'pv', 'ph'];

const wordFilters = [
    {
        "id": "all",
        "title": "All",
        "query": function(word) {
            return true;
        }
    },
    {
        "id": "syn",
        "title": "With synonyms",
        "query": function(word) {
            return word.synonyms;
        }
    },
    {
        "id": "missing_sentences",
        "title": "Missing sentences",
        "query": function(word) {
            return !word.sentences || word.sentences.length == 0;
        }
    },
    {
        "id": "missing_type",
        "title": "Missing type",
        "query": function(word) {
            return !word.t;
        }
    },
    {
        "id": "invalid_type",
        "title": "Invalid type",
        "query": function(word) {
            return !wordTypeMap.get(word.t) || !allowedWordType.includes(word.t);
        }
    },
];