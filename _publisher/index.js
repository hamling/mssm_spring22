const path = require('path');
const dirTree = require('directory-tree');

const fs = require('fs');

fs.readdirSync('..\\_examples').forEach(file => {
  console.log(file);
});

console.log(path.resolve('..\\_examples'));

// fs.lstatSync(path_string).isDirectory() 

// const tree = dirTree('..\\_examples', null,
//     (item, PATH, stats) => {
//         console.log("File: " + item.path + " " + PATH);
//     },
//     (item, PATH, stats) => {
//         console.log("Dir: " + item.path + " " + PATH);
//     });

// function processSubtree(tree) {
//     for (let f of tree.children) {
//         if (f.name.startsWith('build') ||
//             f.name.startsWith('.git')) {
//             continue;
//         }
//         console.log(f);
//     }
// }

// function processProject() 
// {

// }