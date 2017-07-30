#!/bin/bash

acp () {
        git add -A .
        git commit -m "$*"
        git push
}

acp "$*"
cd ..
acp "$*"