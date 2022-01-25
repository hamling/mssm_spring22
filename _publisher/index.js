const path = require('path');
const dirTree = require('directory-tree');

const fs = require('fs');

let baseDir = path.resolve('..\\_examples');
let pagesDir = path.resolve('..\\_pages');

let ignoreFolders = [ "build", ".git" ];

function changeExtension(file, extension) {
    const basename = path.basename(file, path.extname(file))
    return path.join(path.dirname(file), basename + extension)
}

function processFolder(folder, permaPath) {

    let outputPath = path.join(pagesDir, permaPath);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    let subDirs = [];
    let files = [];

    fs.readdirSync(folder).forEach(file => {
        let fullPath = path.join(folder, file);
        if (fs.lstatSync(fullPath).isDirectory())
        {
            let ignore = false;

            for (let ig of ignoreFolders) {
                if (file.startsWith(ig)) {
                    ignore = true;
                    break;
                }
            }

            if (ignore) {
                return;
            }

            let folderPermaPath = permaPath + "/" + file;

            subDirs.push({ name: file, path: fullPath, permaPath: folderPermaPath });

            processFolder(fullPath, folderPermaPath);

            console.log("perma: " + permaPath);
            console.log("  Directory: " + file);
        }
        else {
            console.log("perma: " + permaPath);
            console.log("File: " + file);
            console.log(path.extname(file));
            let filePermaPath = path.join(permaPath, file);
            if (path.extname(file) === '.cpp') {
                let frontMatter = "---\n";
                let fpp = changeExtension(filePermaPath, "_cpp.html");
                frontMatter += "permalink: " + fpp + "\n";
                frontMatter = frontMatter + "---\n";
                frontMatter += "```cpp\n";
                let content = frontMatter + fs.readFileSync(fullPath);
                content += "\n```\n";
                let newFilename = path.join(outputPath, file) + ".markdown";
                fs.writeFileSync(newFilename, content);

                files.push({ name: file, path: fullPath, permaPath: fpp });
            }
        }
    });
    console.log(subDirs);

    let indexFileName = path.join(outputPath, "index.markdown");
    let indexContents = "---\npermalink: " + permaPath + "\n";
    indexContents += "\n...\n";

    indexContents += "# folders\n\n";
    
    for (let sub of subDirs) {
        indexContents += "["  + sub.name + "](/mssm_spring22" + sub.permaPath + ")\n\n";
    }

    indexContents += "# files\n\n";

    for (let f of files) {
        indexContents += "["  + f.name + "](/mssm_spring22" + f.permaPath + ")\n\n";
    }
    
    fs.writeFileSync(indexFileName, indexContents);

}

processFolder(baseDir, "/examples");

//console.log(path.resolve('..\\_examples'));

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