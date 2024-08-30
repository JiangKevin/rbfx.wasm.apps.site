import * as THREE from "../three/three.module.js";
import { initOpenCascade } from "../opencascade/fm.opencascade.Instantiation.js";
import { OrbitControls } from "../three/OrbitControls.js";
import { openCascadeHelper } from "../common/openCascadeHelper.js";
import { Pane } from "../Tweakpane/tweakpane.min.js";
import { OBJExporter } from "../three/OBJExporter.js";
import { STLExporter } from "../three/STLExporter.js";
import { GLTFExporter } from "../three/GLTFExporter.js";
//
FM_GLOBAL.DTWIN = {};
FM_GLOBAL.DTWIN_WINDOW = {};
FM_GLOBAL.MONACO = {};
FM_GLOBAL.MONACO_EDITOR = {};
FM_GLOBAL.MONACO_RBFX_EDITOR = {};
FM_GLOBAL.THREE = THREE;
FM_GLOBAL.THREE_OBJEXPORTER = OBJExporter;
FM_GLOBAL.THREE_STLEXPORTER = STLExporter;
FM_GLOBAL.THREE_GLTFEXPORTER = GLTFExporter;
FM_GLOBAL.ORBITCONTROLS = OrbitControls;
FM_GLOBAL.INITOPENCASCADE = initOpenCascade;
FM_GLOBAL.OPENCASCADEHELPER = openCascadeHelper;
FM_GLOBAL.TWEAKPANLE = new Pane({
    title: "Parameters",
    expanded: false,
});
FM_GLOBAL.TWEAKPANLE.hidden = true;
//
FM_GLOBAL.CAD_SCENE = {};
FM_GLOBAL.CAD_RENDERER = {};
FM_GLOBAL.OPENCASCADE = {};
//
require.config({ paths: { vs: "./js/monaco-editor/min/vs" } });
// 将monaco变量赋值为全局变量
require(["vs/editor/editor.main"], function () {
    //
    FM_GLOBAL.MONACO = window.monaco;
    //
    FM_GLOBAL.MONACO.editor.defineTheme("fm-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [{ token: "comment", foreground: "008000", fontStyle: "italic" }],
        colors: {
            "editor.lineHighlightBackground": "#0000008c",
        },
    });

    FM_GLOBAL.MONACO.editor.setTheme("fm-theme");
});
//
FM_GLOBAL.MARKDOWN = markdownit({
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: function (/*str, lang*/) {
        return "";
    },
});
