/* GET the homepage */
module.exports.index = function( req, res ){
    res.render('index', { title: 'Express Things' });
};
