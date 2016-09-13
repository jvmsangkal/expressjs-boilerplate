'use strict';

const _ = require('lodash');
const path = require('path');

function loadDirSync () {
    let imports = {},
        dir_path = path.join(...arguments);

    _(require('fs').readdirSync(dir_path)).forEach(function(file) {
        let ext = file.split('.').slice(-1)[0];

        if (!~['js', 'json'].indexOf(ext)) {
            return;
        }

        file = file.replace('.' + ext, '');
        imports[file] = require(dir_path + '/' + file);
    });

    return imports;
}



module.exports = loadDirSync;
