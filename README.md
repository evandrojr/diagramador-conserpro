# Diagramador-conserpro

Diagramador e gerador de PDF para trabalhos do Conserpro. Trabalho em progresso. Por favor, crie o seu fork e contribua com a formatação via pull requests. Sua ajuda será apreciada.

## Instalação

npm install -g phantomjs@1.9.8

Não funciona com phantomjs 2!

## Produção do texto

Divida seus textos em seções em HTML, coloque-as no diretório secoes (crie se não existir). Adiciona-as no array do build.js

```
var sections_files = [
    'capa',
    'folha-de-rosto'
];
```

## Execução

./build.js




Um bom congresso para todos nós!

-Evandro

