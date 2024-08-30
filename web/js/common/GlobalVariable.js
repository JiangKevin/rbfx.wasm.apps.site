const FM_GLOBAL = {};
//
const monaco_config_for_cad = {
    value: "",
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart"
    accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    theme: "fm-theme",
    accessibilitySupport: "on", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
    comments: {
        ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
        insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    }, // 注释配置
    copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    cursorBlinking: "Solid", // 光标动画样式
    cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    cursorStyle: "UnderlineThin", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式
    cursorWidth: 4, // <=25 光标宽度
    minimap: {
        enabled: false, // 是否启用预览图
    }, // 预览图设置
    folding: true, // 是否启用代码折叠
    overviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
    language: "javascript",
    lineNumbers: "on",
    autoClosingOvertype: "true",
    autoIndent: "true",
    automaticLayout: true,
    renderLineHighlight: "all",
    codeLensFontSize: 12,
};
const monaco_config_for_rbfx = {
    value: "",
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart"
    accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    theme: "fm-theme",
    accessibilitySupport: "on", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
    comments: {
        ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
        insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    }, // 注释配置
    copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    cursorBlinking: "Solid", // 光标动画样式
    cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    cursorStyle: "UnderlineThin", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式
    cursorWidth: 4, // <=25 光标宽度
    minimap: {
        enabled: false, // 是否启用预览图
    }, // 预览图设置
    folding: true, // 是否启用代码折叠
    overviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
    language: "javascript",
    lineNumbers: "on",
    autoClosingOvertype: "true",
    autoIndent: "true",
    automaticLayout: true,
    renderLineHighlight: "all",
    codeLensFontSize: 12,
};
const beautify_option = {
    indent_size: 4,
    indent_char: " ",
    indent_with_tabs: false,
    editorconfig: false,
    eol: "\n",
    end_with_newline: false,
    indent_level: 0,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: "collapse",
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: "before-newline",
    indent_empty_lines: false,
    templating: ["auto"],
};
const help_code_for_vs_editor = [
    { name: "Cmd/Ctrl + A", illustrate: "Select all edit codes." },
    { name: "Cmd/Ctrl + C", illustrate: "Copy the selected code to the clipboard." },
    { name: "Cmd/Ctrl + V", illustrate: "Paste the contents of the clipboard to the current cursor position." },
    { name: "Cmd/Ctrl + Z", illustrate: "Undo the last editor code operation." },
    { name: "Cmd/Ctrl + /", illustrate: "Add or delete comments at the cursor or selected code." },
    { name: "FM_GLOBAL.OPENCASCADE", illustrate: " Global Computer-aided design(CAD) Reserved Objects." },
    { name: "FM_GLOBAL.CAD_SCENE", illustrate: " Global Computer-aided design(CAD) Scene Reserved Objects." },
    { name: "FM_GLOBAL.TWEAKPANLE", illustrate: " Global Debug UI Reserved Objects." },
];
//
function fm_addScriptToDom(scriptCode) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        var blob = new Blob([scriptCode], { type: "application/javascript" });
        var objectUrl = URL.createObjectURL(blob);
        script.src = objectUrl;
        script.onload = function () {
            console.log("From js: added js script to dom");
            script.onload = script.onerror = null; // Remove these onload and onerror handlers, because these capture the inputs to the Promise and the input function, which would leak a lot of memory!
            URL.revokeObjectURL(objectUrl); // Free up the blob. Note that for debugging purposes, this can be useful to comment out to be able to read the sources in debugger.
            resolve();
        };
        script.onerror = function (e) {
            script.onload = script.onerror = null; // Remove these onload and onerror handlers, because these capture the inputs to the Promise and the input function, which would leak a lot of memory!
            URL.revokeObjectURL(objectUrl);
            console.error("script failed to add to dom: " + e);
            reject(e.message || "(out of memory?)");
        };
        document.body.appendChild(script);
    });
}
//
function fm_download(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(e);
        };
        xhr.send(null);
    });
}
/** */
function addScript(url) {
    document.write("<script language=javascript src=" + url + "></script>");
}
function loadJS(url, callback) {
    var script = document.createElement("script"),
        fn = callback || function () {};
    script.type = "text/javascript";
    //IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                fn();
            }
        };
    } else {
        //其他浏览器
        script.onload = function () {
            fn();
        };
    }
    //
    script.src = url;
    //
    document.body.appendChild(script);
}
