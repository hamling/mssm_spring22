const PATH = require('path');
const dirTree = require('directory-tree');

const tree = dirTree('../_examples', null, 
(item, PATH, stats) => {
    console.log("File: " + item.path);
},
    (item, PATH, stats) => {
        console.log("Dir: " + item.path);
    });

console.log(JSON.stringify(tree, null, 4));
