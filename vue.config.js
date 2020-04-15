const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-arb' : '/',
    css: {
        loaderOptions: {
          sass: {
            // data: `
            //   @import "~bootstrap/scss/bootstrap";
            // `
            prependData: `@import "~bootstrap/scss/bootstrap"`
          }
        }
    },
}