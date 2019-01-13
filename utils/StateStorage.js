'use strict';
const levelup = require('levelup');
const leveldown = require('leveldown');
const fse = require('fs-extra');


function StateStorage() {
    let levelDBLocation = '../StateStorage.DB';
    let levelDB = null;
    console.log('StateStorage...');

    this.init = (devMode = false, location) => {
        if (devMode) {
            console.log('Clean up default StateStorage folder...');
            fse.removeSync(levelDBLocation);
        }
        if (location) levelDBLocation = location;
        levelDB = levelup(leveldown(levelDBLocation));
    };

    this.get = async (key) => {
        if (!levelDB) console.log('Warning: StateStorage is not initiated!');
        return (await levelDB.get(key)).toString('utf8');
    };

    this.put = async (key, value) => {
        if (!levelDB) console.log('Warning: StateStorage is not initiated!');
        return levelDB.put(key, value);
    };
}

const tt = new StateStorage();
tt.init();
// tt.put('fef',45645646);

tt.get('fef').then(console.log);


module.exports = StateStorage;