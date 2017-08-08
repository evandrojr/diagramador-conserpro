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
    $(this).text((i  +  1) + " " + $(this).text());
    $(this).data('idx', i  +  1);
    $(this).addClass('summary');
});

// $('h2').each(function(i, elem) {
//     var anterior = $(this).prevAll('h1');
//     var idx = anterior.data('idx');
//     $(this).data('idx', idx + '.' + (i + 1));
//     $(this).text(idx + '.' + (i + 1) + ' ' + $(this).text());
//     $(this).addClass('summary');
// });

// $('h3').each(function(i, elem) {
//     var anterior = $(this).prevAll('h2');
//     var idx = anterior.data('idx');
//     $(this).data('idx', idx + '.' + (i + 1));
//     $(this).text(idx + '.' + (i + 1) + ' ' + $(this).text());
//     $(this).addClass('summary');
// });


$('.summary').each(function(i, elem) {
    var anterior = $(this).prevAll('h2');
    var idx = anterior.data('idx');
    $(this).data('idx', idx + '.' + (i + 1));
    $(this).text(idx + '.' + (i + 1) + ' ' + $(this).text());
    $(this).addClass('summary');
});

// $('#summary').append($('.summary'));


// var h1 = $('h1').;

// console.log(h1s);

// return;

console.log($.html());
var contents = fs.writeFileSync('index.html',$.html(), 'utf8');

run_cmd("rm", ['-f','index.pdf'], function (text) { console.log(text) });
run_cmd("phantomjs", ['render.js'], function (text) { console.log(text) });
// run_cmd("xdg-open", ['index.pdf'], function (text) { console.log(text) });
