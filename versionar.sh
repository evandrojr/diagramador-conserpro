#!/bin/bash

acp () {
        git add -A .
        git commit -m "$*"
        git push
}

acp $1
cd ..
acp $1