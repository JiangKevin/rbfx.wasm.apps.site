const fs = require("fs");
const _ = require("lodash");
const project = require("./project.js");
//////////////////////////////////////

///
function save_project(req, res) {
    if (req.query.Name) {
        var name = req.query.Name;
        var path = `Data/` + name;
        var zip_path = "tmp/";
        var zip_fileName = zip_path + name + ".zip";
        var file_name = path + "/" + name + ".zip";
        let data = req.body;
        // console.log(req);

        // 创建文件夹
        var isExisted = fs.existsSync(path);
        if (!isExisted) {
            fs.mkdirSync(path);
        }
        // 保存文件
        fs.writeFile(zip_fileName, data, (err) => {
            if (err) {
                console.error("File write err.");
            }
            // file written successfully
            // unzip
            project.unzip(zip_fileName, path);
            // 删除临时的zip文件
            fs.rmSync(zip_fileName, { recursive: true, force: true });
            // fs.unlink(zip_fileName, (err) => {
            //     if (err) throw err;
            //     console.log("delete file " + zip_fileName + " success!");
            // });
        });
        //
        // project.save_proejct_to_db(req, res);
    }

    res.send("Save project success.");
}
//
function import_project(req, res) {
    if (req.query.Name) {
        var name = req.query.Name;
        var projectType = req.query.Type;
        // project path
        var path;
        if (projectType == "PROJECT") {
            path = `Data/` + name;
        } else {
            path = `WizardProject/` + name;
        }
        //
        var zip_path = "tmp/";
        var zip_fileName = zip_path + name + ".zip";
        var file_name = path + "/" + name + ".json";
        let file_data;
        // 验证工程路径
        var isExisted = fs.existsSync(path);
        if (isExisted) {
            // 压缩工程路径到zip文件
            project.zipFolder(path, zip_fileName, function (err, msg) {
                console.log(err, msg);
                //

                fs.readFile(zip_fileName, (err, file_data) => {
                    if (err) {
                        console.error("File read err.");
                        res.send("Import project err.");
                    }
                    // console.log(data);
                    res.send(file_data);
                    // 删除临时的zip文件
                    fs.rmSync(zip_fileName, { recursive: true, force: true });
                    // fs.unlink(zip_fileName, (err) => {
                    //     if (err) throw err;
                    //     console.log("delete file " + zip_fileName + " success!");
                    // });
                });
            });
        } else {
            res.send("project is NULL.");
        }
    }
    return "";
}
//
function delete_project(req, res) {
    if (req.query.Name) {
        var name = req.query.Name;
        var projectType = req.query.Type;
        // project path
        var path;
        if (projectType == "PROJECT") {
            path = `Data/` + name;
        } else {
            path = `WizardProject/` + name;
        }
        // 验证工程路径
        fs.rmSync(path, { recursive: true, force: true });
        res.send("project Delete(" + path + ") success.");
    }
    return "";
}
//
function project_lists(req, res) {
    // wizard project paht
    var wizardPath = `WizardProject`;
    // project path
    var projectPath = `Data`;
    // 工程文件夹
    var p = project.getInfoProject(projectPath, "PROJECT", 1000);
    var w = project.getInfoProject(wizardPath, "WIZARD");
    var projectList = w.concat(p);
    res.send(projectList);
}
//
function project_wizard_lists(req, res) {
    // wizard project paht
    var wizardPath = `WizardProject`;
    // project path
    var projectPath = `Data`;
    // 工程文件夹
    var w = project.getInfoProject(wizardPath, "WIZARD");
    res.send(w);
}
//
function project_user_lists(req, res) {
    // wizard project paht
    var wizardPath = `WizardProject`;
    // project path
    var projectPath = `Data`;
    // 工程文件夹
    var p = project.getInfoProject(projectPath, "PROJECT", 1000);
    res.send(p);
}
//
function all_folder_and_files(req, res) {
    var father_data = { uid: 1, type: "folder", name: "./Data", uptime: "2024-4-7 15:15:32", selected: false, filePath: "./Data", children: [] };
    var father_upload = { uid: 1, type: "folder", name: "./Upload", uptime: "2024-4-7 15:15:32", selected: false, filePath: "./Upload", children: [] };

    let tree_upload = project.getFilesAndFoldersInDir_for_tree("./Upload", 100);
    let tree_data = project.getFilesAndFoldersInDir_for_tree("./Data", 10000);
    father_upload.children = tree_upload;
    father_data.children = tree_data;
    //
    var treeList = [];
    treeList = JSON.parse("[" + JSON.stringify(father_upload) + "," + JSON.stringify(father_data) + "]");
    res.send(treeList);
}
//
function folder_and_files_for_path(req, res) {
    if (req.query.path != "") {
        let tree = project.getFilesAndFoldersInDir_for_tree(req.query.path, 20000);
        res.send(tree);
    }
}
//
function delete_folder_or_file(req, res) {
    if (req.body.length > 0) {
        // console.log(req.body);
        for (i = 0; i < req.body.length; i++) {
            var path = req.body[i].filePath;
            fs.rmSync(path, { recursive: true, force: true });
        }
        //
        res.send("Delete file or folder success.");
    }
}
//
function zip_folder_or_file(req, res) {
    if (req.body.length > 0) {
        // console.log(req.body);
        var ret = project.zipFolderAndFiles(req.body, req.query.path, req.query.name, function (err, msg) {});
        //
        if (ret) {
            res.send("Zip file or folder success.");
        } else {
            res.send("Zip file or folder error.");
        }
    }
}
//
function unzip_folder_or_file(req, res) {
    if (req.body.length > 0) {
        // console.log(req.body);
        // 首选建立新文件夹
        var newTempPath = req.query.path + "/" + req.query.name;
        fs.mkdirSync(newTempPath, { recursive: true });

        for (i = 0; i < req.body.length; i++) {
            project.unzip(req.body[i].filePath, newTempPath + "/");
        }
        //
        res.send("UnZip file or folder success.");
    }
}
//
function paste_folder_or_file(req, res) {
    if (req.body.length > 0) {
        // console.log(req.body);
        for (i = 0; i < req.body.length; i++) {
            if (req.query.path != req.body[i].path) {
                if ((req.body[i].type = "folder")) {
                    fs.cpSync(req.body[i].filePath, req.query.path + "/" + req.body[i].name, { force: true, recursive: true });
                } else {
                    fs.copyFileSync(req.body[i].filePath, req.query.path + "/" + req.body[i].name);
                }
            }
        }
        //
        res.send("Paste file or folder success.");
    }
}
//
function create_new_folder(req, res) {
    if (req.query.path.length > 0) {
        // console.log(req.body);
        var newTempPath = req.query.path + "/" + req.query.name;
        fs.mkdirSync(newTempPath, { recursive: true });
        //
        res.send("Create new folder success.");
    }
}
//

//////////////////////////////////////
//
//
//
//
//////////////////////////////////////
module.exports = {
    save_project,
    import_project,
    project_lists,
    delete_project,
    project_wizard_lists,
    project_user_lists,
    all_folder_and_files,
    folder_and_files_for_path,
    delete_folder_or_file,
    zip_folder_or_file,
    unzip_folder_or_file,
    paste_folder_or_file,
    create_new_folder,
};
