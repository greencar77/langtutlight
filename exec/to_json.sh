#!/bin/bash
cat ../input/w_a.txt \
 | sed 's/^@@$/}\n{/' \
 | sed '1d' \
 | sed -f word.sed  \
 | sed 's/^/"/' | sed 's/$/",/' \
 | sed 's/"{",/{/' | sed 's/"}",/},/' \
 | sed 's/: " /: "/' \
 | sed 's/"/  "/' \
 | sed '1 i\let words = [' \
 > ../langtut/data/w_a.js
echo '}];' >> ../langtut/data/w_a.js

cat ../input/word_final.txt \
 | sed 's/^@@$/}\n{/' \
 | sed '1d' \
 | sed -f word.sed  \
 | sed 's/^/"/' | sed 's/$/",/' \
 | sed 's/"{",/{/' | sed 's/"}",/},/' \
 | sed 's/: " /: "/' \
 | sed 's/"/  "/' \
 | sed '1 i\let wordsFinal = [' \
 > ../langtut/data/word_final.js
echo '}];' >> ../langtut/data/word_final.js

cat ../input/w_b.txt \
 | sed 's/^@@$/}\n{/' \
 | sed -f sentence.sed  \
 | sed -r 's/^v-([[:digit:]]*):/v-\1": "/' \
 | sed 's/^/"/' | sed 's/$/",/' \
 | sed 's/"{",/{/' | sed 's/"}",/},/' \
 | sed 's/: " /: "/' \
 | sed 's/"/  "/' \
 | sed '1 i\let sentences = [' \
 | sed '2d' \
 > ../langtut/data/w_b.js
echo '}];' >> ../langtut/data/w_b.js

cat ../input/sentence_final.txt \
 | sed 's/^@@$/}\n{/' \
 | sed -f sentence.sed  \
 | sed -r 's/^v-([[:digit:]]*):/v-\1": "/' \
 | sed 's/^/"/' | sed 's/$/",/' \
 | sed 's/"{",/{/' | sed 's/"}",/},/' \
 | sed 's/: " /: "/' \
 | sed 's/"/  "/' \
 | sed '1 i\let sentencesFinal = [' \
 | sed '2d' \
 > ../langtut/data/sentence_final.js
echo '}];' >> ../langtut/data/sentence_final.js