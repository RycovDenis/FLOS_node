const Application = require('../model/AppModel.js');
exports.getAppVersion = function(req, res) {
    Application.getAppVersionWhereVercode(req.body, function(err, version) {
        if (err){
            res.json({
                error: true,
                message: 'err',
            });
        }else {
            res.json({
                error: false,
                message: 'Attention! There are application updates.',
                version: version
            });
        }
    });
};