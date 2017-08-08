var page = require('webpage').create();

page.paperSize = {
  format: 'A4',
  orientation: 'portrait',
  // margin: {
  //   top: '3cm',
  //   right: '2cm',
  //   bottom: '2cm',
  //   left: '3cm',
  // },

  // margin: {
  //   top: '2cm',
  //   right: '2cm',
  //   bottom: '2cm',
  //   left: '2cm',
  // },


  header: {
    height: "3cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "";
    })
  },

  footer: {
    height: "1cm",
    contents: phantom.callback(function (pageNum, numPages) {
      if (pageNum > 1)
        return "<p data-page='" + pageNum + "'><span style='float:right;botton: 0px'>" + pageNum + "</span></p>";
    })
  }

};

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0';

// console.log(__dirname);
page.open('file:///home/j/conserpro/diagramador-conserpro/index.html', function () {
  page.render('/home/j/conserpro/diagramador-conserpro/index.pdf');
  phantom.exit(0);
});

