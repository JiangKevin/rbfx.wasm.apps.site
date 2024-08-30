const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const sevice = require("./node-mid/service.js");
const shell = require("shelljs");
const fs = require("fs");
const http = require("http");
const https = require("https");
const multer = require("multer");
const project = require("./node-mid/project.js");
const sqlite3 = require("sqlite3").verbose();
// const wasm_importer = require("./web/assetImporter/assetImporter.js");
const wasm_importer = require("./web/rbfxImporter/rbfxImporter.js");
// const ai = AssetImporter();
//////////////////////////////////////
app.use(function (req, res, next) {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    // console.log(res.req.originalUrl);
    next();
    // // add wenjie
    // if (res.req.originalUrl.endsWith('.wasm')) {
    //     res.setHeader('Content-Type', 'application/javascript');
    // }
});
app.use(express.static("web"));
app.use(bodyParser.urlencoded({ extended: false, limit: "25mb" }));
app.use(bodyParser.json({ type: "application/json", limit: "25mb" }));
app.use(bodyParser.text({ type: "text/*", limit: "25mb" }));
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "500mb" }));
app.use(express.json());
//
const db_file = "./web/db/Digital.db"; //这里写的就是数据库文件的路径
const db = new sqlite3.Database(db_file);
const secretKey = "FM-Digital-Twin";
const port = 3000;
const httpsPort = 3001;
const PEM_PREFIX = "wasm-scada-web";
let storage = multer.diskStorage({
    //设置存储路径
    destination: (req, file, cb) => {
        // console.log("destination:", file);
        cb(null, "Upload/");
    },
    //设置存储的文件名
    filename: (req, file, cb) => {
        // console.log("upload_filename:", file);
        cb(null, file.originalname);
    },
});
let upload = multer({ storage });
//////////////////////////////////////
//
//
//
//
//////////////////////////////////////
// 主页调整
app.get("/", (req, res) => {
    res.redirect("./common/common.html");
});
//
app.post("/login", (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user_info = req.body;
        // console.log(req.body);
        //
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        //
        db.all("SELECT * FROM users WHERE name='" + username + "' and PASSWORD='" + password + "';", function (err, row) {
            // console.log(row);
            //
            if (row.length > 0) {
                if (username == row[0].NAME && password == row[0].PASSWORD) {
                    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
                    user_info.token=token;
                    user_info.image=row[0].IMAGE;
                    user_info.email=row[0].EMAIL;
                    user_info.fullname=row[0].FULL_NAME;
                    return res.status(200).json({ user_info });
                }
            } else {
                return res.status(401).json({ message: "Authentication failed" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
//
function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = jwt.verify(token, secretKey);
        req.username = payload.username;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}
//
app.get("/protected", verifyToken, (req, res) => {
    return res.status(200).json({ message: "You have access" });
});

// 工程列表
app.route("/project_lists").get((req, res) => {
    sevice.project_lists(req, res);
});
app.route("/project_wizard_lists").get((req, res) => {
    sevice.project_wizard_lists(req, res);
});
app.route("/project_user_lists").get((req, res) => {
    sevice.project_user_lists(req, res);
});
// 删除工程
app.route("/delete_project").post((req, res) => {
    sevice.delete_project(req, res);
});

// 保存工程
app.route("/save_project").post(function (req, res) {
    sevice.save_project(req, res);
});
// 引入工程
app.route("/import_project").post(function (req, res) {
    sevice.import_project(req, res);
});
// 创建新工程并上传文件
app.post("/create_and_upload_res", upload.array("files"), create_and_upload_res);
function create_and_upload_res(req, res) {
    // console.log(req.files);
    if (req.query.Name) {
        var project_name = decodeURIComponent(req.query.Name);
        var project_remark = decodeURIComponent(req.query.Remark);
        var project_wizard = decodeURIComponent(req.query.Wizard);
        var project_path = "./Data/" + project_name;
        var project_file = project_path + "/project.json";
        var wizard_path = "./WizardProject/" + project_wizard;
        // copy wizard to project ,and rename
        try {
            fs.cpSync(wizard_path, project_path, {
                recursive: true,
            });
        } catch (error) {
            console.log(error.message);
        }
        //

        const formattedTime = project.getTime();

        var toWrite = req.query;
        toWrite.create_time = formattedTime;
        toWrite.update_time = formattedTime;
        fs.writeFileSync(project_file, JSON.stringify(toWrite), {
            recursive: true,
        });
        //
        for (var i in req.files) {
            // console.log(req.files[i]);
            project.unzip(req.files[i].path, project_path);
        }
        res.json({ message: "Successfully create project: " + project_name });
        // console.log("Successfully create project: " + project_name);
    } else {
        res.json({ message: "Project Name is NULL." });
    }
}
// 上传fbx文件，通过本地转换程序方式
app.post("/upload_res_and_local_import", upload.array("files"), upload_res_and_local_import);
function upload_res_and_local_import(req, res) {
    // console.log(req.files);
    if (req.query.Name) {
        var project_name = decodeURIComponent(req.query.Name);
        var project_path = "./Data/" + project_name;
        var project_data_path = "./Data/" + project_name + "/data";
        var ret = -1;
        //
        for (var i in req.files) {
            // console.log(req.files[i]);
            var res_path = req.files[i].path;
            var mdl_path = "./Upload/tmp/" + req.files[i].filename.split(".")[0] + ".mdl";
            var tmp_path = "./Upload/tmp";
            // 创建文件夹
            var isExisted = fs.existsSync(tmp_path);
            if (!isExisted) {
                fs.mkdirSync(tmp_path);
            }
            //
            // console.log("To import resource:" + res_path);
            // console.log("To import project:" + project_name);
            // console.log("To import file:" + mdl_path);
            //
            if (fs.existsSync(`web/tools`)) {
                //
                const res = shell.pwd();
                // console.log("+ " + res);
                var cammad_str = "web/tools/AssetImporter model " + res_path + " " + mdl_path + " -l";
                // Run external tool synchronously
                if (shell.exec(cammad_str).code !== 0) {
                    shell.echo("Error: failed");
                    shell.exit(1);
                    ret = -1;
                } else {
                    ret = 0;
                    // 成功，cp到对应工程路径
                    try {
                        // fs.cpSync(tmp_path, project_data_path + "/" + req.files[i].filename.split(".")[0], {
                        //     recursive: true,
                        // });
                        fs.cpSync(tmp_path, project_data_path, {
                            recursive: true,
                        });
                        // del tmp path
                        // fs.rm(tmp_path, { recursive: true }, (err) => {
                        //     if (err) {
                        //     }
                        //     console.log(`${tmp_path} is deleted!`);
                        // });
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            } else {
                console.log("- ");
                ret = -2;
            }
        }

        res.json({ message: "Successfully import resource: " + project_name });
        // console.log("Successfully import resource: " + project_name);
    } else {
        res.json({ message: "Project Name is NULL." });
    }
}
// 上传fbx文件，通过js转换程序方式
app.post("/upload_res_and_wasm_import", upload.array("files"), upload_res_and_wasm_import);
function upload_res_and_wasm_import(req, res) {
    // console.log(req.files);
    if (req.query.Name) {
        var project_name = decodeURIComponent(req.query.Name);
        var import_command_str = decodeURIComponent(req.query.Command);
        var import_parameter_str = decodeURIComponent(req.query.Parameter);
        var project_path = "./Data/" + project_name;
        var project_data_path = "./Data/" + project_name + "/data";
        var ret = -1;
        // 创建文件夹
        var isExisted = fs.existsSync(project_data_path);
        if (!isExisted) {
            fs.mkdirSync(project_data_path);
            // console.log("+- Mkdir destination folder :" + sub_data_path);
        }
        //
        for (var i in req.files) {
            // console.log(req.files[i]);
            console.log(req.files[i].path);
            var res_src_fbx_name = req.files[i].path;
            var res_des_fbx_name = project_data_path + "/" + req.files[i].filename;
            // console.log("+- Source resouse file name :" + res_src_fbx_name);
            // console.log("+- destination resouse file name :" + res_des_fbx_name);
            // copy file to project data
            fs.copyFileSync(res_src_fbx_name, res_des_fbx_name);

            // start
            var ai = wasm_importer();
            var wasm_res_des_name = "";
            var sub_data_path = "";
            ai.then((asset) => {
                var importer = asset;
                var output_file_extension = "";
                // 验证命令
                if (import_command_str == "model") {
                    sub_data_path = project_data_path + "/Models";
                    output_file_extension = ".mdl";
                    wasm_res_des_name = "/working/" + project_name + "/data/Models/" + req.files[i].filename.split(".")[0] + output_file_extension;
                } else if (import_command_str == "node") {
                    sub_data_path = project_data_path + "/Nodes";
                    output_file_extension = ".xml";
                    wasm_res_des_name = "/working/" + project_name + "/data/Nodes/" + req.files[i].filename.split(".")[0] + output_file_extension;
                } else if (import_command_str == "scene") {
                    sub_data_path = project_data_path + "/Scenes";
                    if (import_parameter_str.indexOf("-j") !== -1) {
                        output_file_extension = ".json";
                    } else if (import_parameter_str.indexOf("-b") !== -1) {
                        output_file_extension = ".bin";
                    } else {
                        output_file_extension = ".xml";
                    }
                    wasm_res_des_name = "/working/" + project_name + "/data/Scenes/" + req.files[i].filename.split(".")[0] + output_file_extension;
                }
                // 创建文件夹
                var isExisted = fs.existsSync(sub_data_path);
                if (!isExisted) {
                    fs.mkdirSync(sub_data_path);
                    // console.log("+- Mkdir destination folder :" + sub_data_path);
                }
                // 修改成wasm的文件地址
                var wasm_res_des_fbx_name = "/working/" + project_name + "/data/" + req.files[i].filename;
                //
                var command_str = import_command_str + " " + wasm_res_des_fbx_name + " " + wasm_res_des_name + " " + import_parameter_str;
                const ret = importer.ccall("DoImport", "int", ["int", "string"], [4, command_str]);
                if (ret != 0) {
                    res.json({ message: "Faild import resource: " + project_name });
                    console.log("Faild import resource: " + project_name);
                } else {
                    fs.unlinkSync(res_des_fbx_name);
                    //
                    res.json({ message: "Successfully import model resource: " + project_name });
                    console.log("Successfully import model resource: " + project_name);
                }
            });
        }
    }
}
// 上传texture文件，通过js转换程序方式
app.post("/upload_texture_and_wasm_import", upload.array("files"), upload_texture_and_wasm_import);
function upload_texture_and_wasm_import(req, res) {
    // console.log(req.files);
    if (req.query.Name) {
        var project_name = decodeURIComponent(req.query.Name);
        var res_targetPath = decodeURIComponent(req.query.TargetPath);
        //
        var project_path = "./Data/" + project_name;
        var project_data_path = "./Data/" + project_name + "/data";
        //
        for (var i in req.files) {
            // console.log(req.files[i]);
            console.log(req.files[i].path);
            var res_src_name = req.files[i].path;
            var res_des_path = project_data_path + "/" + res_targetPath;
            var res_des_name = res_des_path + "/" + req.files[i].filename;

            // 创建文件夹
            var isExisted = fs.existsSync(res_des_path);
            if (!isExisted) {
                fs.mkdirSync(res_des_path);
                console.log("+- Mkdir destination folder :" + res_des_path);
            }
            // copy file to project data
            fs.copyFileSync(res_src_name, res_des_name);
        }
        //
        res.json({ message: "Successfully import other resource: " + project_name });
        console.log("Successfully import other resource: " + project_name);
    }
}
// 资源格式转换
app.get("/assetImport", (req, res) => {
    console.log("+- ");
    var ret = -1;
    //
    if (fs.existsSync(`web/tools`)) {
        const res = shell.pwd();
        console.log("+ " + res);
        // Run external tool synchronously
        if (shell.exec("web/tools/AssetImporter model web/db/ProjectData/jeep1.fbx web/db/ProjectData/ty.mdl -l").code !== 0) {
            shell.echo("Error: failed");
            shell.exit(1);
            ret = -1;
        } else {
            ret = 0;
        }
    } else {
        console.log("- ");
        ret = -2;
    }
    res.send("ret= " + ret);
});
// 资源格式转换
app.get("/wasm_assetImport", (req, res) => {
    // console.log("+- ");
    var ret = -1;
    var ai = wasm_importer();
    // console.log(ai);
    ai.then((asset) => {
        var importer = asset;
        // console.log(importer);
        var command_str = "model " + "/working/tmp/data/jeep1.fbx" + " " + "/working/tmp/data/ty.mdl" + " -l";
        const r1 = importer.ccall("DoImport", "int", ["int", "string"], [4, command_str]);
        //
        // var command_txt2bin = "-i " + "/working/tmp/data/ty.txt " + " -o " + "/working/tmp/data/ty1.txt -b";
        // const r2 = importer.ccall("txt2bin", "int", ["int", "string"], [5, command_txt2bin]);
        console.log("ret= " + r1);
        res.send("ret= " + r1);
    });
});
// 获取可操作文件夹下所有文件
app.route("/all_folder_and_files").get(function (req, res) {
    // console.log("path= " + req.query.path);
    if (req.query.path == "./") {
        sevice.all_folder_and_files(req, res);
    } else {
        sevice.folder_and_files_for_path(req, res);
    }
});
//
app.route("/delete_folder_or_file").post(function (req, res) {
    sevice.delete_folder_or_file(req, res);
});
//
app.route("/zip_folder_or_file").post(function (req, res) {
    sevice.zip_folder_or_file(req, res);
});
//
app.route("/unzip_folder_or_file").post(function (req, res) {
    sevice.unzip_folder_or_file(req, res);
});
//
app.route("/paste_folder_or_file").post(function (req, res) {
    sevice.paste_folder_or_file(req, res);
});
//
app.route("/create_new_folder").post(function (req, res) {
    sevice.create_new_folder(req, res);
});
//
app.route("/test").get(function (req, res) {
    sevice.test(req, res);
});
//
//////////////////////////////////////
//
//
//
//
//////////////////////////////////////
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });
http.createServer(app).listen(port);
https
    .createServer(
        {
            key: fs.readFileSync(path.join(__dirname, `${PEM_PREFIX}-key.pem`), "utf8"),
            cert: fs.readFileSync(path.join(__dirname, `${PEM_PREFIX}.pem`), "utf8"),
        },
        app
    )
    .listen(httpsPort);
console.log(`---- Starting Web Server with http port [${port}] and https port [${httpsPort}] ----`);
