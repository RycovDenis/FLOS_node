exports.getIndexPage = function (req,res) {
    res.render('index', {
        message : "Hello World"
    });
};