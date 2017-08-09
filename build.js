#!/usr/bin/env node
var fs = require('fs');

function run_cmd(cmd, args, callBack) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function () { callBack(resp) });
} // ()

var contents = fs.readFileSync('index_inicio.html', 'utf8');
var sections_files = [
    'capa',
    'folha_de_rosto',
    'resumo',
    'listas',
    'sumario',
    'introducao',
    'o_problema',
    'incidente_itil',
    'prova_de_conceito',
    'limitacoes',
    'referencias'
];

sections_files.forEach(function (file) {
    // var str = fs.readFileSync(`./secoes/${file}.txt`, 'utf8');
    // str = str.replace(/\ \ \ \ /g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    // contents += str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    contents += fs.readFileSync(`./secoes/${file}.txt`, 'utf8');
});

contents += `   </body>
</html>`;

const cheerio = require('cheerio')
const $ = cheerio.load(contents, 'utf8');

$('h1').each(function(i, elem) {
    let idx = i+1;
    $(this).text(idx + " " + $(this).text());
    $(this).data('idx', idx);
    $(this).addClass('summary');
});

let subIdx = 1;
let lastIdx = 0;
$('h2').each(function(i, elem) {
    let anterior = $(this).prevAll('h1');
    let idx = anterior.data('idx');
    if(lastIdx==0){
        lastIdx = idx;
    }else{
        if(lastIdx == idx){
            subIdx++;
        }else{
            subIdx = 1;
        }
        lastIdx = idx;
    }
    console.log(idx, subIdx, lastIdx);
    $(this).data('idx', idx + '.' + subIdx);
    $(this).text(idx + '.' + subIdx + ' ' + $(this).text());
    $(this).addClass('summary');
});

// return;

subIdx = 1;
lastIdx = 0;
$('h3').each(function(i, elem) {
    let anterior = $(this).prevAll('h2');
    let idx = anterior.data('idx');
    if(lastIdx==0){
        lastIdx = idx;
    }else{
        if(lastIdx == idx){
            subIdx++;
        }else{
            subIdx = 1;
        }
        lastIdx = idx;
    }
    console.log(idx, subIdx, lastIdx);
    $(this).data('idx', idx + '.' + subIdx);
    $(this).text(idx + '.' + subIdx + ' ' + $(this).text());
    $(this).addClass('summary');
});

var pageMax = 20;

var summary = "";
$('.summary').each(function(i, elem) {
    summary += `<div class="dots">&nbsp;
                    <span class="summary-page" style='float:left'>${$(this).text()}</span>
                    <span class="summary-page" style='float:right '> ${ (i+1)*pageMax/pageMax }</span>
                </div>`
});

$('#summary').append(summary);


console.log($.html());
var contents = fs.writeFileSync('index.html',$.html(), 'utf8');

run_cmd("rm", ['-f','index.pdf'], function (text) { console.log(text) });
run_cmd("phantomjs", ['render.js'], function (text) { console.log(text) });
// run_cmd("xdg-open", ['index.pdf'], function (text) { console.log(text) });
