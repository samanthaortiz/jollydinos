//Sam's Test
require(['./node_modules/chai/chai.js'], function (chai) {
  var chai = require('./node_modules/chai/chai.js')
});
require(['./node_modules/chai-http/dist/chai-http.js'], function (chaiHttp) {
  var chaiHttp = require('./node_modules/chai/chai.js');
});

describe('/listing API works', function() {
  var gitHiredListing;
  var url = '/#/listing'

  it('should return a response object with a status code of 200', function() {
    chai.request('http://localhost:3000')
    .get(url)
    .end(function(err, res){
      expect(res).to.be.an.object;
      expect(res.statusCode).to.deep.equal(200);
    });  
  });

});