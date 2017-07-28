var page = require('webpage').create();

page.paperSize = {
  format: 'A4',
  orientation: 'portrait',
  margin: {
    top: '3cm',
    left: '3cm',
    bottom: '2cm',
    right: '2cm'
  },

  // header: {
  //   height: "1cm",
  //   contents: phantom.callback(function(pageNum, numPages) {
  //     return "";
  //   })
  // },

  footer: {
    height: "1cm",
    contents: phantom.callback(function (pageNum, numPages) {
      if (pageNum > 1)
        return "<p><span style='float:right'>" + pageNum + "</span></p>";
    })
  }

};

// console.log(__dirname);
page.open('file:///home/j/conserpro/diagramador-conserpro/index.html', function () {
  page.render('/home/j/conserpro/diagramador-conserpro/index.pdf');
  phantom.exit(0);
});

