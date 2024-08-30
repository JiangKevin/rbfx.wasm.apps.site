var wizard_project_list = [];
const { createApp } = Vue;
const { createVuetify } = Vuetify;
const ref = Vue.ref;
// app start*********************************************************************
const app = Vue.createApp({
    data() {
        return {
            help_code: help_code_for_vs_editor,
            show_code_help: false,
            code_help_panel_w: 0,
            code_help_panel_h: 0,
            is_overlay: false,
            win_height: 1080,
            win_width: 1920,
            project_info: { name: "demo", wizard: "template", info: "This is new project.", resource: [] },
            resource_info: { project: "demo", resource: [] },
            project_selected_to_modify: {},
            have_project_selected_to_modify: false,
            project_selected_to_delete: false,
            wizard_list: [],
            project_list: [],
            res_import_commond_list: ["model", "anim", "scene", "node", "dump", "lod"],
            res_import_commond_info: { command: "model", parameter: "-l" },
            res_import_des_info: { desPath: "Textures" },
            user_project_list: [],
            //
            folder_and_files: [],
            selected_folder_and_files: [],
            selected_zip_files: [],
            copy_folder_and_files: [],
            //
            selected_folder_path: "./",
            menu_navigation_item: "CAD Editor",
            is_right_project_drawer: false, // 总体的project右侧面板显示与否
            is_right_project_wasm_import_drawer: false, // 新增fbx资源导入的project的右侧编辑框
            is_right_project_texture_import_drawer: false, // 新增texture资源导入的project的右侧编辑框
            is_right_project_create_drawer: false, // 新增修改project的右侧编辑框
            is_right_files_drawer: false, // 总体的files右侧面板显示与否
            is_right_files_zip_drawer: false,
            is_right_files_unzip_drawer: false,
            is_right_files_del_drawer: false,
            is_right_files_copy_drawer: false,
            is_right_files_paste_drawer: false,
            is_right_files_newFolder_drawer: false,
            to_zip_name: "tmp",
            to_unzip_name: "tmp",
            to_create_new_folder: "NewFolder",
            menu_items: [
                { text: "All Proejcts", icon: "mdi-folder", active: true, disabled: false },
                { text: "Files Browse", icon: "mdi-view-list", active: false, disabled: false },
            ],
            menu_editor_items: [
                { text: "CAD Editor", icon: "mdi-ruler-square-compass", active: false, disabled: false },
                { text: "Scene Editor", icon: "mdi-microsoft-xbox-controller", active: false, disabled: false },
            ],
            menu_help_items: [
                { text: "Editor Help", icon: "mdi-progress-question", active: false, disabled: false },
                // { text: "Scene Editor Help", icon: "mdi-crosshairs-question", active: false, disabled: false },
            ],
            modify_items: ["Select Project", "Add New Resource", "Open Editor"],
            //
            cad_scene: {},
            is_create_cad_viewport: false,
            is_cad_init: false,
            is_create_cad_scene: false,
            is_right_cad_editor_drawer: false,
            is_right_cad_editor_code: false,
            cad_scene_log: "",
            //
            is_codemirror_code_editor_create: false,
            codemirror_code_editor_log: "",
            codemirror_code_editor_pos: "",
            vs_cad_code: "",
            is_create_rbfx_viewport: false,
            rbfx_viewport_log: "",
            is_right_rbfx_editor_drawer: false,
            show_rbfx_code_help: false,
            rbfx_code_editor_log: "",
            is_rbfx_code_editor_create: false,
            rbfx_vs_cad_code: "",
            is_logined: false,
            user_info: { username: "admin", password: "", token: "", image: "", email: "", fullname: "" },
            login_log: "",
        };
    },

    created() {
        // console.log(this.wizard_list);
        axios
            .get("project_wizard_lists")
            .then((res) => {
                this.message = res.data;
                this.wizard_list = [];
                for (var i in res.data) {
                    this.wizard_list.push(res.data[i]["fileName"]);
                }
            })
            .catch(function (error) {
                // 请求失败处理
                console.log(error);
            });
        //
    },
    mounted() {
        this.getProjectList();
        this.getFilesList("./");
        this.win_height = window.innerHeight;
        this.win_width = window.innerWidth;
        this.menu_navigation_item = "All Proejcts";
        //
    },
    computed: {},
    methods: {
        reset() {
            this.is_create_rbfx_viewport = false;
            this.is_create_cad_viewport = false;
            this.is_codemirror_code_editor_create = false;
            this.is_rbfx_code_editor_create = false;
            this.is_right_rbfx_editor_drawer = false;
            this.is_right_cad_editor_drawer = false;
            this.menu_navigation_item = "All Proejcts";
            //
            this.clear_menu_item_status();
            //
            this.menu_items[0].active = true;
        },
        login() {
            //
            this.user_info.password = sha256(this.user_info.password);
            //
            axios
                .post("/login", this.user_info)
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        // console.log(response.data);
                        //
                        this.login_log = "";
                        this.user_info = response.data.user_info;
                        this.is_logined = true;
                        //
                        this.reset();
                    } else {
                        this.login_log = response.data.message;
                        //
                    }
                })
                .catch((error) => {
                    // console.error(error);
                    this.login_log = error.response.data.message;
                });
        },
        logout() {
            this.is_logined = false;
            this.is_cad_init = false;
            this.reset();
            //
            this.user_info.token = "";
            this.user_info.password = "";
        },
        wasm_import_res_drawer(obj) {
            this.is_right_project_wasm_import_drawer = true;
            this.is_right_project_drawer = true;
            this.is_right_project_create_drawer = false;
            this.have_project_selected_to_modify = true;
            this.is_right_project_texture_import_drawer = false;
            this.project_selected_to_modify = obj;
            this.resource_info.project = obj.fileName;
        },
        texture_import_res_drawer(obj) {
            this.is_right_project_texture_import_drawer = true;
            this.is_right_project_wasm_import_drawer = false;
            this.is_right_project_drawer = true;
            this.is_right_project_create_drawer = false;
            this.have_project_selected_to_modify = true;
            this.project_selected_to_modify = obj;
            this.resource_info.project = obj.fileName;
        },
        close_project_drawer() {
            this.is_right_project_wasm_import_drawer = false;
            this.is_right_project_texture_import_drawer = false;
            this.is_right_project_drawer = false;
            this.is_right_project_create_drawer = false;
        },
        create_project_click() {
            this.is_right_project_drawer = true;
            this.is_right_project_create_drawer = true;
            this.is_right_project_wasm_import_drawer = false;
            this.is_right_project_texture_import_drawer = false;
        },
        del_project_click(obj) {
            console.log(obj);
            obj.toDel = false;
            this.project_selected_to_modify = obj;
            axios
                .post("/delete_project?Name=" + obj.info.Name + "&Type=PROJECT")
                .then((response) => {
                    this.getProjectList();
                    this.close_project_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        open_project_click(obj) {
            console.log(obj);
            this.project_selected_to_modify = obj;
            window.open("./common/wasm.html?Name=" + obj.info.Name, "_blank", "resizable,scrollbars,status");
        },
        create_and_uploadFiles_have_par(item) {
            item = false;
            this.create_and_uploadFiles();
        },
        create_and_uploadFiles() {
            const formData = new FormData();
            if (this.$refs.upload_inputs.files) {
                for (i = 0; i < this.$refs.upload_inputs.files.length; i++) {
                    formData.append("files", this.$refs.upload_inputs.files[i]);
                }
            }
            //
            axios
                .post("/create_and_upload_res?Name=" + this.project_info.name + "&Wizard=" + this.project_info.wizard + "&Remark=" + this.project_info.info, formData)
                .then((response) => {
                    // console.log(response.data);
                    //
                    this.getProjectList();
                    this.is_right_project_drawer = false;
                    this.is_right_project_create_drawer = false;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        uploadFiles_and_resWasmImport() {
            const formData = new FormData();
            if (this.$refs.upload_inputs.files) {
                for (i = 0; i < this.$refs.upload_inputs.files.length; i++) {
                    formData.append("files", this.$refs.upload_inputs.files[i]);
                }
            }
            //
            axios
                .post(
                    "/upload_res_and_wasm_import?Name=" + this.resource_info.project + "&Command=" + this.res_import_commond_info.command + "&Parameter=" + this.res_import_commond_info.parameter,
                    formData
                )
                .then((response) => {
                    // console.log(response.data);
                    //
                    this.close_project_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        uploadFiles_and_textureWasmImport() {
            const formData = new FormData();
            if (this.$refs.upload_inputs.files) {
                for (i = 0; i < this.$refs.upload_inputs.files.length; i++) {
                    formData.append("files", this.$refs.upload_inputs.files[i]);
                }
            }
            //
            axios
                .post("/upload_texture_and_wasm_import?Name=" + this.resource_info.project + "&TargetPath=" + this.res_import_des_info.desPath, formData)
                .then((response) => {
                    // console.log(response.data);
                    //
                    this.close_project_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getProjectList() {
            axios
                .get("/project_user_lists")
                .then((response) => {
                    this.user_project_list = response.data;
                    // console.log(this.user_project_list);
                    this.project_list = [];
                    for (var i in response.data) {
                        this.project_list.push(response.data[i]["fileName"]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        cadLoad() {
            // this.scene_click_index = this.scene_click_index + 1;
            if (this.is_cad_init == false) {
                //
                this.is_overlay = true;
                this.cad_scene_log = "Start create viewport ...";
                var fm_cad_core = setupThreeJSCore();
                //
                FM_GLOBAL.CAD_SCENE = fm_cad_core.scene;
                FM_GLOBAL.CAD_RENDERER = fm_cad_core.renderer;
                //
                this.cad_scene_log = "End create viewport ...";
                this.cad_scene_log = "Start create opencascade object ...";
                FM_GLOBAL.INITOPENCASCADE().then((openCascade) => {
                    this.cad_scene_log = "End create opencascade object ...";
                    this.is_create_cad_scene = false;
                    FM_GLOBAL.OPENCASCADE = openCascade;
                    //
                    document.getElementById("step-file").addEventListener("input", async (event) => {
                        try {
                            await loadSTEPorIGES(openCascade, event.srcElement.files[0], addVisulizeShapeToScene, FM_GLOBAL.CAD_SCENE);
                        } catch (e) {
                            // console.log(" +-  " + e.message);
                            this.codemirror_code_editor_log = " +-  " + e.message;
                        } finally {
                            //
                        }
                    });
                    document.getElementById("cad-code-file").addEventListener("input", async (event) => {
                        try {
                            this.vs_cad_code = await event.srcElement.files[0].text();
                            FM_GLOBAL.MONACO_EDITOR.setValue(this.vs_cad_code);
                            //
                            // console.log(event.srcElement.files);
                        } catch (e) {
                            this.codemirror_code_editor_log = " +-  " + e.message;
                        } finally {
                            //
                        }
                    });
                    //
                    this.is_overlay = false;
                    this.is_cad_init = true;
                    this.is_create_cad_scene = true;
                });
            } else {
                this.is_create_cad_scene = true;
            }
        },
        set_up_viewport_for_cad() {
            if (this.is_create_cad_viewport == false) {
                const viewport = document.getElementById("viewport");
                if (viewport) {
                    viewport.appendChild(FM_GLOBAL.CAD_RENDERER.domElement);
                    this.is_create_cad_viewport = true;
                }
            }
        },
        rbfx_load() {
            this.focus_rbfx_container();
        },
        open_cad_editor_code_drawer() {
            this.is_right_cad_editor_drawer = !this.is_right_cad_editor_drawer;
            this.is_right_cad_editor_code = !this.is_right_cad_editor_code;
            this.code_vs_container_onload();
        },
        open_rbfx_editor_code_drawer() {
            this.is_right_rbfx_editor_drawer = !this.is_right_rbfx_editor_drawer;
            //
            this.focus_rbfx_container();
            //
            this.code_rbfx_container_onload();
            //
            var fm_right_rbfx_code_drawer = document.getElementById("fm_right_rbfx_code_drawer");
            var fm_right_rbfx_contain = document.getElementById("fm_right_rbfx_contain");
            if (this.is_right_rbfx_editor_drawer) {
                fm_right_rbfx_code_drawer.style.width = fm_right_rbfx_contain.clientWidth - FM_GLOBAL.DTWIN._GetWidthOfPropertyWin() - 1 + "px";
            }
        },
        focus_rbfx_container() {
            if (window.frames["rbfx_wasm_frame"]) {
                window.frames["rbfx_wasm_frame"].focus();
            }
        },
        run_js_code_for_rbfx_editor() {
            try {
                this.rbfx_vs_cad_code = FM_GLOBAL.MONACO_RBFX_EDITOR.getValue();
                //
                if (window.frames["rbfx_wasm_frame"]) {
                    window.frames["rbfx_wasm_frame"].focus();
                }
                eval(this.rbfx_vs_cad_code);
                //
                this.rbfx_code_editor_log = " +-  Run OK.";
            } catch (e) {
                this.rbfx_code_editor_log = " +-  " + e.message;
                console.log(e.message);
            } finally {
                //
            }
        },
        run_js_code_for_cad_editor() {
            try {
                this.set_up_viewport_for_cad();
                //
                this.vs_cad_code = FM_GLOBAL.MONACO_EDITOR.getValue();
                //
                this.is_overlay = true;
                eval(this.vs_cad_code);
                this.is_overlay = false;
                //
                this.codemirror_code_editor_log = " +-  Run OK.";
            } catch (e) {
                // console.log(" +-  " + e.message);
                this.codemirror_code_editor_log = " +-  " + e.message;
            } finally {
                //
            }
        },
        format_js_code_for_cad_editor() {
            this.vs_cad_code = FM_GLOBAL.MONACO_EDITOR.getValue();
            // console.log(this.vs_cad_code);
            var new_code = js_beautify(this.vs_cad_code, beautify_option);
            this.vs_cad_code = new_code;
            // console.log(new_code);
            FM_GLOBAL.MONACO_EDITOR.setValue(this.vs_cad_code);
        },
        save_js_code_for_cad_editor() {
            this.vs_cad_code = FM_GLOBAL.MONACO_EDITOR.getValue();
            saveCodeOfCad(this.vs_cad_code);
        },
        save_js_code_for_rbfx_editor() {
            this.rbfx_vs_cad_code = FM_GLOBAL.MONACO_RBFX_EDITOR.getValue();
            console.log(this.rbfx_vs_cad_code);
            saveCodeOfCad(this.rbfx_vs_cad_code);
        },
        code_vs_container_onload() {
            if (this.is_codemirror_code_editor_create == false) {
                var code_vs_container = document.getElementById("code_vs_container");
                if (code_vs_container) {
                    FM_GLOBAL.MONACO_EDITOR = FM_GLOBAL.MONACO.editor.create(code_vs_container, monaco_config_for_cad);
                    //
                    FM_GLOBAL.MONACO_EDITOR.onDidChangeCursorPosition((event) => {
                        const position = event.position;
                        var code_vs_pos = document.getElementById("cad_code_pos");
                        code_vs_pos.innerHTML = "- " + position.lineNumber + " : " + position.column + " -";
                    });
                    //
                    this.is_codemirror_code_editor_create = true;
                }
            }
        },
        code_rbfx_container_onload() {
            if (this.is_rbfx_code_editor_create == false) {
                var code_rbfx_container = document.getElementById("code_rbfx_container");
                if (code_rbfx_container) {
                    FM_GLOBAL.MONACO_RBFX_EDITOR = FM_GLOBAL.MONACO.editor.create(code_rbfx_container, monaco_config_for_rbfx);
                    // //
                    document.getElementById("rbfx-code-file").addEventListener("input", async (event) => {
                        try {
                            this.rbfx_vs_cad_code = await event.srcElement.files[0].text();
                            FM_GLOBAL.MONACO_RBFX_EDITOR.setValue(this.rbfx_vs_cad_code);
                            this.rbfx_code_editor_log = " +-  Load File: " + event.srcElement.files[0].name;
                        } catch (e) {
                            this.rbfx_code_editor_log = " +-  " + e.message;
                        } finally {
                            //
                        }
                    });
                    //
                    FM_GLOBAL.DTWIN = window.frames["rbfx_wasm_frame"].Module;
                    FM_GLOBAL.DTWIN_WINDOW = window.frames["rbfx_wasm_frame"];
                    //
                    this.is_rbfx_code_editor_create = true;
                }
            }
        },
        down_load_modle_file() {
            if (FM_GLOBAL.CAD_SCENE) {
                // saveShapeOBJ( FM_GLOBAL.CAD_SCENE);
                saveShapeSTL(FM_GLOBAL.CAD_SCENE);
                // saveShapeSTEP();
                // saveShapeGLTF(FM_GLOBAL.CAD_SCENE);
            }
        },
        close_cad_editor_drawer() {
            this.is_right_cad_editor_drawer = false;
        },
        open_cad_editor_help() {
            this.show_code_help = !this.show_code_help;

            var code_help_panel = document.getElementById("code_vs_container");
            this.code_help_panel_w = code_help_panel.offsetWidth;
            this.code_help_panel_h = code_help_panel.offsetHeight - 40;
        },
        getFilesList(path) {
            axios
                .get("/all_folder_and_files?path=" + path)
                .then((response) => {
                    if (path == "./") {
                        this.folder_and_files = response.data;
                    } else {
                        this.folder_and_files = response.data;
                    }
                    //
                    this.selected_folder_path = path;
                    this.selected_folder_and_files = [];
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        clear_menu_item_status(item) {
            for (i = 0; i < this.menu_items.length; i++) {
                this.menu_items[i].active = false;
            }
            for (i = 0; i < this.menu_editor_items.length; i++) {
                this.menu_editor_items[i].active = false;
            }
            for (i = 0; i < this.menu_help_items.length; i++) {
                this.menu_help_items[i].active = false;
            }
        },
        nav_menu_item_click(item) {
            // console.log(item);
            this.menu_navigation_item = item.text;
            this.clear_menu_item_status();
            //
            item.active = true;
        },
        nav_menu_editor_item_click(item) {
            // console.log(item);
            this.menu_navigation_item = item.text;
            this.clear_menu_item_status();
            //
            item.active = true;
            //
            FM_GLOBAL.TWEAKPANLE.hidden = true;
            if (item.text == "CAD Editor") {
                setTimeout(() => {
                    // console.log("延迟了 1 秒。");
                    this.cadLoad();
                    this.set_up_viewport_for_cad();
                }, 1000);
            }
            if (item.text == "Scene Editor") {
                this.rbfx_load();
                setTimeout(() => {
                    FM_GLOBAL.DTWIN = window.frames["rbfx_wasm_frame"].Module;
                    FM_GLOBAL.DTWIN_WINDOW = window.frames["rbfx_wasm_frame"];
                    //
                    if (this.is_rbfx_code_editor_create == false) {
                        var jsDownload = fm_download("./js/common/digital_twin_wrap.js").then(function (data) {
                            fm_addScriptToDom(data);
                            console.log("+- digital_twin_wrap.js is download.");
                        });
                    }
                }, 1000);
            }
        },
        nav_menu_help_item_click(item) {
            // console.log(item);
            this.menu_navigation_item = item.text;
            this.clear_menu_item_status();
            //
            item.active = true;
            //
            if (item.text == "Editor Help") {
                this.markdown_parse();
            }
        },
        markdown_parse() {
            setTimeout(() => {
                var md = window.frames["mark_down_frame"];
                var md_view = window.frames["mark_down_view"];
                md_view.document.body.innerHTML = "<link rel='stylesheet' href='css/fm_markdown.css' /> \n" + FM_GLOBAL.MARKDOWN.render(md.document.body.innerText);
            }, 1000);
        },
        tweakpane_hidden() {
            FM_GLOBAL.TWEAKPANLE.hidden = !FM_GLOBAL.TWEAKPANLE.hidden;
        },
        top_button_go_path(path) {
            if (path == "./") {
                // console.log("this is ./");
                this.getFilesList("./");
            } else if (path == "./Data") {
                // console.log("this is ./Data");
                this.getFilesList("./");
            } else if (path == "./Upload") {
                // console.log("this is ./Upload");
                this.getFilesList("./");
            } else {
                var path_array = this.get_array_split_path(path);
                var new_path = "";
                for (i = 0; i < path_array.length - 1; i++) {
                    new_path = new_path + path_array[i] + "/";
                }
                new_path = new_path.slice(0, -1);
                this.getFilesList(new_path);
            }
            //
            if (this.is_right_files_copy_drawer != true) {
                this.selected_folder_and_files = [];
            }
        },
        folder_or_files_click(item) {
            if (item.type == "folder") {
                this.getFilesList(item.filePath);
                this.selected_folder_path = item.filePath;
                if (this.is_right_files_copy_drawer != true) {
                    this.selected_folder_and_files = [];
                }
            }
        },
        folder_or_files_check_click(item) {
            item.selected = !item.selected;
            this.selected_folder_and_files = [];
            for (i = 0; i < this.folder_and_files.length; i++) {
                if (this.folder_and_files[i].selected) {
                    var li = {};
                    li.type = this.folder_and_files[i].type;
                    li.filePath = this.folder_and_files[i].filePath;
                    li.uptime = this.folder_and_files[i].uptime;
                    li.name = this.folder_and_files[i].name;
                    li.path = this.selected_folder_path;
                    this.selected_folder_and_files.push(li);
                }
            }
            this.selected_zip_files = this.get_zip_file_from_select();
        },
        get_icon_for_file_type(item) {
            if (item.type == "folder") {
                return "mdi-folder";
            } else {
                return "mdi-file";
            }
        },
        if_have_selected_folder_or_file() {
            return this.selected_folder_and_files.length > 0;
        },
        if_have_selected_zip_file() {
            return this.selected_zip_files.length > 0;
        },
        is_folder_type(item) {
            return item.type == "folder";
        },
        get_array_split_path(path) {
            var array = path.split("/");
            // console.log("get_array_split_path :");
            // console.log(array);
            return array;
        },
        create_new_folder() {
            //
            if (this.selected_folder_path != "./") {
                this.close_files_drawer();
                this.is_right_files_drawer = true;
                this.is_right_files_newFolder_drawer = true;
            }
        },
        delete_folder_or_file_for_selected() {
            //
            if (this.selected_folder_and_files.length > 0) {
                this.close_files_drawer();
                this.is_right_files_drawer = true;
                this.is_right_files_del_drawer = true;
            }
        },
        checkOrUncheck_all_folder_or_file() {
            //
            // if (this.is_right_files_drawer != true) {
            this.selected_folder_and_files = [];
            for (i = 0; i < this.folder_and_files.length; i++) {
                this.folder_and_files[i].selected = !this.folder_and_files[i].selected;
                if (this.folder_and_files[i].selected) {
                    var li = {};
                    li.type = this.folder_and_files[i].type;
                    li.filePath = this.folder_and_files[i].filePath;
                    li.uptime = this.folder_and_files[i].uptime;
                    li.name = this.folder_and_files[i].name;
                    li.path = this.selected_folder_path;
                    this.selected_folder_and_files.push(li);
                }
            }
            this.selected_zip_files = this.get_zip_file_from_select();
            // }
        },
        clear_check_all_folder_or_file() {
            //
            // if (this.is_right_files_drawer != true) {
            this.selected_folder_and_files = [];
            for (i = 0; i < this.folder_and_files.length; i++) {
                this.folder_and_files[i].selected = false;
            }
            this.close_files_drawer();
            // }
        },
        zip_folder_or_file_for_selected() {
            //
            if (this.selected_folder_and_files.length > 0) {
                this.close_files_drawer();
                this.is_right_files_drawer = true;
                this.is_right_files_zip_drawer = true;
            }
        },
        unzip_folder_or_file_for_selected() {
            //
            if (this.selected_zip_files.length > 0) {
                this.close_files_drawer();
                this.is_right_files_drawer = true;
                this.is_right_files_unzip_drawer = true;
            }
        },
        copy_folder_or_file_for_selected() {
            //
            if (this.selected_folder_and_files.length > 0) {
                this.close_files_drawer();
                this.is_right_files_copy_drawer = true;
            }
            //
            this.copy_folder_and_files = this.selected_folder_and_files;
        },
        paste_folder_or_file_for_selected() {
            //
            if (this.copy_folder_and_files.length > 0) {
                this.close_files_drawer();
                this.is_right_files_drawer = true;
                this.is_right_files_paste_drawer = true;
            }
        },
        close_files_drawer() {
            this.is_right_files_drawer = false;
            this.is_right_files_del_drawer = false;
            this.is_right_files_zip_drawer = false;
            this.is_right_files_unzip_drawer = false;
            this.is_right_files_copy_drawer = false;
            this.is_right_files_paste_drawer = false;
            this.is_right_files_newFolder_drawer = false;
        },
        get_no_top_folder(item) {
            // console.log(item)
            if (item.filePath == "./Data" || item.filePath == "./Upload") {
                return false;
            } else {
                return true;
            }
        },
        delete_folder_or_file_click() {
            //
            axios
                .post("/delete_folder_or_file", this.selected_folder_and_files)
                .then((response) => {
                    // console.log(response.data);
                    this.selected_folder_and_files = [];
                    // console.log(this.selected_folder_path);
                    this.getFilesList(this.selected_folder_path);
                    this.close_files_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        zip_folder_or_file_click() {
            axios
                .post("/zip_folder_or_file?path=" + this.selected_folder_path + "&name=" + this.to_zip_name, this.selected_folder_and_files)
                .then((response) => {
                    // console.log(response.data);
                    this.selected_folder_and_files = [];
                    // console.log(this.selected_folder_path);
                    this.getFilesList(this.selected_folder_path);
                    this.close_files_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        unzip_folder_or_file_click() {
            axios
                .post("/unzip_folder_or_file?path=" + this.selected_folder_path + "&name=" + this.to_unzip_name, this.selected_zip_files)
                .then((response) => {
                    // console.log(response.data);
                    this.selected_folder_and_files = [];
                    // console.log(this.selected_folder_path);
                    this.getFilesList(this.selected_folder_path);
                    this.close_files_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        paste_folder_or_file_click() {
            axios
                .post("/paste_folder_or_file?path=" + this.selected_folder_path, this.copy_folder_and_files)
                .then((response) => {
                    // console.log(response.data);
                    this.selected_folder_and_files = [];
                    // console.log(this.selected_folder_path);
                    this.getFilesList(this.selected_folder_path);
                    this.close_files_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        new_folder_click() {
            axios
                .post("/create_new_folder?path=" + this.selected_folder_path + "&name=" + this.to_create_new_folder)
                .then((response) => {
                    // console.log(response.data);
                    this.selected_folder_and_files = [];
                    // console.log(this.selected_folder_path);
                    this.getFilesList(this.selected_folder_path);
                    this.close_files_drawer();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        get_zip_file_from_select() {
            var new_array = this.selected_folder_and_files.filter((item) => {
                console.log(item.filePath);
                return item.filePath.endsWith(".zip");
            });
            return new_array;
        },
    },
});

// 自定义样式
const FmTheme = {
    dark: true,
    colors: {
        background: "#00002000",
        surface: "#FF5722",
        "surface-bright": "#00000045",
        "surface-light": "#EEEEEE",
        "surface-variant": "#424242",
        "on-surface-variant": "#EEEEEE",
        primary: "#6639a6",
        menu: "#ffffff",
        "primary-darken-1": "#1F5592",
        secondary: "#521262",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        fm_divider: "#110219",
        right_tool_bar: "#DD2C00",
        fm_ok: "#FF572250",
        fm_cancel: "#263238",
        fm_dialog: "#673AB7",
        fm_dialog_title: "#212121",
        fm_dialog_contain: "#424242",
        fm_btn_down: "#AEEA00",
        fm_btn_up: "#FFFFFF",
    },
    variables: {
        "border-color": "#000000",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.04,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.12,
        "dragged-opacity": 0.08,
        "theme-surface": "#FF5722",
        "tooltip-border-radius": 0,
        "layout-right": 400,
    },
};

//

app.use(
    Vuetify.createVuetify({
        icons: {
            defaultSet: "mdi",
        },
        theme: {
            defaultTheme: "FmTheme",
            themes: {
                FmTheme,
            },
        },
    })
);
//
/** */
w3.includeHTML(main_init);
/** */
function main_init() {
    app.mount("#app");
}
