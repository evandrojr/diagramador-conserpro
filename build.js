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

];

sections_files.forEach(function (file) {
    contents += fs.readFileSync(`./secoes/${file}.html`, 'utf8');
});

contents += `   </body>
</html>`;

console.log(contents);
var contents = fs.writeFileSync('index.html', contents, 'utf8');

run_cmd("rm", ['-f','index.pdf'], function (text) { console.log(text) });
run_cmd("phantomjs", ['render.js'], function (text) { console.log(text) });
// run_cmd("xdg-open", ['index.pdf'], function (text) { console.log(text) });
