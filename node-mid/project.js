const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const archiver = require("archiver");
var admZip = require("adm-zip");
const JSZip = require("jszip");
const fsUtils = require("nodejs-fs-utils");
const crypto = require("crypto");
const zipFolderSync = require("folder-zip-sync");
//
// const { Pool, Client } = require("pg");

var pgOpt = require("pg");
const { v4: uuidv4 } = require("uuid");
//////////////////////////////////////
//
//
//
//
//////////////////////////////////////
/**
 * zip file
 *   sourceFile，待压缩的文件
 *   destZip，压缩后的zip文件
 *   cb，callback
 */
function zipFile(sourceFile, destZip, cb) {
    // init
    var output = fs.createWriteStream(destZip);
    var archive = archiver("zip", {
        zlib: { level: 9 },
    });
    // on
    output.on("close", function () {
        cb(null, "zip file success!");
    });
    archive.on("error", function (err) {
        cb(err);
    });
    // zip
    archive.pipe(output);
    archive.file(sourceFile, {
        name: path.basename(sourceFile),
    });
    archive.finalize();
}
/**
 * unzip
 *   zipFile，待解压缩的zip文件
 *   destFolder，解压缩后存放的文件夹
 */
function unzip(zipFile, destFolder) {
    var zip = new admZip(zipFile);

    zip.extractAllTo(destFolder, true);
}
/**
 * zip folder
 *   sourceFolder，待压缩的文件夹
 *   destZip，压缩后的zip文件
 *   cb，回调函数
 *   subdir，是否需要包一层
 */
function zipFolder(sourceFolder, destZip, cb, subdir) {
    // init
    var output = fs.createWriteStream(destZip);
    var archive = archiver("zip", {
        zlib: { level: 9 },
    });

    // on
    output.on("close", function () {
        cb("+", "zip folder success!");
    });
    archive.on("error", function (err) {
        cb(err);
    });
    // zip
    archive.pipe(output);
    archive.directory(sourceFolder, subdir ? sourceFolder.substr(path.dirname(sourceFolder).length + 1) : false);
    archive.finalize();
}
//
const fmZipFolder = (folderPath, zipFilePath) => {
    const zip = new JSZip();

    const addFilesToZip = (zipFile, folderPath, currentPath = "") => {
        const files = fs.readdirSync(path.join(folderPath, currentPath));

        for (const file of files) {
            const filePath = path.join(currentPath, file);
            const fullFilePath = path.join(folderPath, filePath);
            const stats = fs.statSync(fullFilePath);

            if (stats.isDirectory()) {
                addFilesToZip(zipFile, folderPath, filePath);
            } else {
                fileContent = fs.readFileSync(fullFilePath);
                zipFile.file(filePath, fileContent);
            }
        }
    };

    addFilesToZip(zip, folderPath);
    zip.generateAsync({ type: "nodebuffer" })
        .then((content) => {
            fs.writeFileSync(zipFilePath, content);
        })
        .catch((error) => console.log(error));

    console.log(`Zip file created at: ${zipFilePath}`);
};
//
function zipFolderAndFiles(source, path, name, cb, subdir) {
    // 首选建立新文件夹
    var newTempPath = path + "/" + name;
    fs.mkdirSync(newTempPath, { recursive: true });
    // 将选择的文件或者文件夹cp到新建文件夹中
    for (i = 0; i < source.length; i++) {
        // console.log("src path= " + source[i].filePath);
        if (source[i].type == "folder") {
            fs.cpSync(source[i].filePath, newTempPath + "/" + source[i].name, { force: true, recursive: true });
        } else {
            fs.copyFileSync(source[i].filePath, newTempPath + "/" + source[i].name);
        }
    }
    zipFolderSync(newTempPath, newTempPath + ".zip");
    fs.rmSync(newTempPath, { recursive: true, force: true });
    return true;
}
//
//
const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes == 0) {
        return "n/a";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i == 0) {
        return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};
//
const getTime = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);
    var seconds = ("0" + now.getSeconds()).slice(-2);
    var formattedTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return formattedTime;
};
//
const getInfoProject = function (path, projectType, step = 0) {
    var Json_project_lisst_array = [];
    var Json_project_lists = {};
    var Json_folder_stats = {};
    var Json_project_ext = {};
    //  同步读取 需要使用一个变量来接收读取出来的数据
    let folder_data = fs.readdirSync(path, {
        // path为文件的路径
        encoding: "utf8", // 指定字符集
        flag: "r", // 指定读取的模式  具体上面有
    });
    if (folder_data) {
        Json_project_lisst_array = [];
        if (folder_data.length > 0) {
            for (i = 0; i < folder_data.length; i++) {
                var path_tmp = path + "/" + folder_data[i];
                var project_ext_path = path_tmp + "/project.json";
                Json_folder_stats = {};
                Json_project_lists = {};
                Json_project_ext = {};
                //
                try {
                    const stats = fs.statSync(path_tmp);
                    //
                    if (stats.isDirectory()) {
                        // 读取内部的json 扩展文件
                        if (fs.existsSync(project_ext_path)) {
                            var json_f = fs.readFileSync(project_ext_path, { encoding: "utf8", flag: "r" });
                            // parse JSON string to JSON object
                            Json_project_ext = JSON.parse(json_f);
                            // console.log(Json_project_ext);
                        }
                        // don't stop scanning on errors
                        var config = { skipErrors: true };
                        var size = fsUtils.fsizeSync(path_tmp, config);
                        if (config.errors.length) {
                            console.log("Error detected: ", config.errors[0]);
                        }
                        // console.log("+- " + path_tmp + " Folder size:" + convertBytes(size));
                        //
                        Json_folder_stats.dev = stats.dev;
                        Json_folder_stats.mode = stats.mode;
                        Json_folder_stats.size = convertBytes(size);
                        Json_folder_stats.blksize = stats.blksize;
                        Json_folder_stats.blocks = stats.blocks;
                        // Json_folder_stats.info = stats.info;
                        // console.log("+- info: " + stats.info);
                        Json_folder_stats.atime =
                            stats.atime.getFullYear() +
                            "-" +
                            stats.atime.getMonth() +
                            "-" +
                            stats.atime.getDate() +
                            " " +
                            stats.atime.getHours() +
                            ":" +
                            stats.atime.getMinutes() +
                            ":" +
                            stats.atime.getSeconds();
                        Json_folder_stats.mtime =
                            stats.mtime.getFullYear() +
                            "-" +
                            stats.mtime.getMonth() +
                            "-" +
                            stats.mtime.getDate() +
                            " " +
                            stats.mtime.getHours() +
                            ":" +
                            stats.mtime.getMinutes() +
                            ":" +
                            stats.mtime.getSeconds();
                        Json_folder_stats.ctime =
                            stats.ctime.getFullYear() +
                            "-" +
                            stats.ctime.getMonth() +
                            "-" +
                            stats.ctime.getDate() +
                            " " +
                            stats.ctime.getHours() +
                            ":" +
                            stats.ctime.getMinutes() +
                            ":" +
                            stats.ctime.getSeconds();
                        Json_folder_stats.birthtime =
                            stats.birthtime.getFullYear() +
                            "-" +
                            stats.birthtime.getMonth() +
                            "-" +
                            stats.birthtime.getDate() +
                            " " +
                            stats.birthtime.getHours() +
                            ":" +
                            stats.birthtime.getMinutes() +
                            ":" +
                            stats.birthtime.getSeconds();

                        //
                        Json_project_lists.ProjectType = projectType;
                        Json_project_lists.Id = step + i;
                        Json_project_lists.fileName = folder_data[i];
                        Json_project_lists.full_fileName = path_tmp;
                        Json_project_lists.stats = Json_folder_stats;
                        Json_project_lists.info = Json_project_ext;
                        Json_project_lists.toDel = false;
                        Json_project_lisst_array.push(Json_project_lists);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
    //
    return Json_project_lisst_array;
};
// 获取文件夹下所有文件
function getFilesAndFoldersInDir_for_list(path) {
    const filesList = [];
    readFile(path, filesList);
    return filesList;
}
// 遍历读取文件
function readFile(path, filesList) {
    // 需要用到同步读取
    const files = fs.readdirSync(path);
    files.forEach(walk);
    //
    function walk(file) {
        const states = fs.statSync(path + "/" + file);
        if (states.isDirectory()) {
            readFile(path + "/" + file, filesList);
        } else {
            // 创建一个对象保存信息
            const obj = {};
            // 文件大小，以字节为单位
            obj.size = states.size;
            // 文件名
            obj.name = file;
            // 文件绝对路径
            obj.path = path + "/" + file;
            filesList.push(obj);
        }
    }
}
//
function timeFormat(obj) {
    return obj.getFullYear() + "-" + obj.getMonth() + "-" + obj.getDate() + " " + obj.getHours() + ":" + obj.getMinutes() + ":" + obj.getSeconds();
}
function getFilesAndFoldersInDir_for_tree(path, index) {
    const items = fs.readdirSync(path);
    const result = [];
    items.forEach((item) => {
        index = index + 1;
        const itemPath = `${path}/${item}`;
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
            // let uuid = self.crypto.randomUUID();
            let data = {
                // 文件夹
                uid: crypto.randomUUID(),
                type: "folder",
                name: item,
                uptime: timeFormat(stat.mtime),
                selected: false,
                filePath: itemPath,
            };
            let children = getFilesAndFoldersInDir_for_tree(itemPath, index);
            if (children && children.length) {
                data.children = children;
            }
            result.push(data);
        } else {
            // 文件
            if (item != ".DS_Store") {
                result.push({
                    uid: crypto.randomUUID(),
                    type: "file",
                    name: item,
                    uptime: timeFormat(stat.mtime),
                    selected: false,
                    filePath: itemPath,
                });
            }
        }
    });
    return result;
}
//
async function save_proejct_to_db(req, res) {
    if (req.query.Name) {
        let data = req.body;
        // console.log(data)
        let name = req.query.Name;
        var pgConfig = {
            user: "kevin",
            password: "kevin",
            host: "192.168.1.100",
            database: "mapdata",
            port: "5432",
            poolSize: 5,
            poolIdleTimeout: 30000,
            reapIntervalMillis: 10000,
        };
        //
        var pgPool = new pgOpt.Pool(pgConfig);
        //
        var update_sql = "UPDATE public.wasm_project SET id = $1, file = $2 , updatetime = (SELECT LOCALTIMESTAMP) , author = $3 WHERE name = $4;";
        var insert_sql = "Insert into public.wasm_project values($1,$2,$3,(SELECT LOCALTIMESTAMP),$4);";
        var select_sql = "select * FROM public.wasm_project where name = $1 ORDER BY updatetime DESC LIMIT 1";
        var author = "kevin.jiang";
        //
        try {
            const rst = await pgPool.query(update_sql, [uuidv4(), data, author, name]);
            // console.log("+- ");
            // console.log(rst);
            res.send("Save project ok.");
        } catch (err) {
            console.error(err);
        } finally {
            await pgPool.end();
        }
    }
}

// client.query("select id,node_name,node_type,data_type from department_info where pid = '管理员'", (err, res) => {
//     console.log(err, res)
//     if (err) throw err;
//     client.end();
//     result.json({
//         status: 200,
//         message: "数据查询成功！",
//         data: res.rows,
//         dataCount: res.rowCount
//     })
// })

//////////////////////////////////////
//
//
//
//
//////////////////////////////////////
module.exports = { zipFile, unzip, zipFolder, getInfoProject, getTime, getFilesAndFoldersInDir_for_tree, getFilesAndFoldersInDir_for_list, zipFolderAndFiles, save_proejct_to_db };
