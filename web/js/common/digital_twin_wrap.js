//
const FM_ = {};
//
FM_.Clear = function () {
    // call
    FM_GLOBAL.DTWIN._Clear();
};
//
FM_.CreateChild = function (name) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._CreateChild(string_on_wasm_heap_for_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.RemoveChild = function (name) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._RemoveChild(string_on_wasm_heap_for_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.set_node_enbled = function (name, enble) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._set_node_enbled(string_on_wasm_heap_for_name, enble);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.set_node_position = function (name, x, y, z) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._set_node_position(string_on_wasm_heap_for_name, x, y, z);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.set_node_direction = function (name, x, y, z) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._set_node_direction(string_on_wasm_heap_for_name, x, y, z);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.set_node_scale = function (name, x, y, z) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._set_node_scale(string_on_wasm_heap_for_name, x, y, z);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};
//
FM_.create_child_by_node = function (node_name, child_name) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_child_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(child_name) + 1;
    var string_on_wasm_heap_for_child_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_child_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(child_name, string_on_wasm_heap_for_child_name, lengthBytes_for_child_name);

    // call
    FM_GLOBAL.DTWIN._create_child_by_node(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_child_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_child_name);
};
//
FM_.remove_node_by_name = function (name) {
    // to wasm heap
    var lengthBytes_for_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(name) + 1;
    var string_on_wasm_heap_for_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(name, string_on_wasm_heap_for_name, lengthBytes_for_name);
    // call
    FM_GLOBAL.DTWIN._remove_node_by_name(string_on_wasm_heap_for_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_name);
};

//
FM_.create_component_by_node = function (node_name, type_name) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(type_name) + 1;
    var string_on_wasm_heap_for_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(type_name, string_on_wasm_heap_for_type_name, lengthBytes_for_type_name);

    // call
    FM_GLOBAL.DTWIN._create_component_by_node(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_type_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_type_name);
};
//
FM_.remove_component_by_node = function (node_name, type_name) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(type_name) + 1;
    var string_on_wasm_heap_for_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(type_name, string_on_wasm_heap_for_type_name, lengthBytes_for_type_name);

    // call
    FM_GLOBAL.DTWIN._remove_component_by_node(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_type_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_type_name);
};

//
FM_.set_component_attr_by_node = function (node_name, com_type_name, attr_type_name, attr_value) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(com_type_name) + 1;
    var string_on_wasm_heap_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_com_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(com_type_name, string_on_wasm_heap_for_com_type_name, lengthBytes_for_com_type_name);

    var lengthBytes_for_attr_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(attr_type_name) + 1;
    var string_on_wasm_heap_for_attr_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_attr_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(attr_type_name, string_on_wasm_heap_for_attr_type_name, lengthBytes_for_attr_type_name);

    var lengthBytes_for_attr_value = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(attr_value) + 1;
    var string_on_wasm_heap_for_attr_value = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_attr_value);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(attr_value, string_on_wasm_heap_for_attr_value, lengthBytes_for_attr_value);

    // call
    FM_GLOBAL.DTWIN._set_component_attr_by_node(
        string_on_wasm_heap_for_node_name,
        string_on_wasm_heap_for_com_type_name,
        string_on_wasm_heap_for_attr_type_name,
        string_on_wasm_heap_for_attr_value
    );
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_com_type_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_attr_type_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_attr_value);
};
//
FM_.call_component_default_init_by_node = function (node_name, com_type_name) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(com_type_name) + 1;
    var string_on_wasm_heap_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_com_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(com_type_name, string_on_wasm_heap_for_com_type_name, lengthBytes_for_com_type_name);

    // call
    FM_GLOBAL.DTWIN._call_component_default_init_by_node(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_com_type_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_com_type_name);
};
//
FM_.call_component_default_method_by_node = function (node_name, com_type_name) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(com_type_name) + 1;
    var string_on_wasm_heap_for_com_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_com_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(com_type_name, string_on_wasm_heap_for_com_type_name, lengthBytes_for_com_type_name);

    // call
    FM_GLOBAL.DTWIN._call_component_default_method_by_node(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_com_type_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_com_type_name);
};

//
FM_.set_node_attr = function (node_name, attr_type_name, attr_value) {
    // to wasm heap
    var lengthBytes_for_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(node_name) + 1;
    var string_on_wasm_heap_for_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(node_name, string_on_wasm_heap_for_node_name, lengthBytes_for_node_name);

    var lengthBytes_for_attr_type_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(attr_type_name) + 1;
    var string_on_wasm_heap_for_attr_type_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_attr_type_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(attr_type_name, string_on_wasm_heap_for_attr_type_name, lengthBytes_for_attr_type_name);

    var lengthBytes_for_attr_value = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(attr_value) + 1;
    var string_on_wasm_heap_for_attr_value = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_attr_value);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(attr_value, string_on_wasm_heap_for_attr_value, lengthBytes_for_attr_value);

    // call
    FM_GLOBAL.DTWIN._set_node_attr(string_on_wasm_heap_for_node_name, string_on_wasm_heap_for_attr_type_name, string_on_wasm_heap_for_attr_value);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_node_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_attr_type_name);
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_attr_value);
};
//
FM_.SetupViewport = function (camera_node_name) {
    // to wasm heap
    var lengthBytes_for_camera_node_name = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(camera_node_name) + 1;
    var string_on_wasm_heap_for_camera_node_name = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_camera_node_name);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(camera_node_name, string_on_wasm_heap_for_camera_node_name, lengthBytes_for_camera_node_name);
    // call
    FM_GLOBAL.DTWIN._SetupViewport(string_on_wasm_heap_for_camera_node_name);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_camera_node_name);
};
//
FM_.LoadSceneFromFile = function (fileName) {
    // to wasm heap
    var lengthBytes_for_fileName = FM_GLOBAL.DTWIN_WINDOW.lengthBytesUTF8(fileName) + 1;
    var string_on_wasm_heap_for_fileName = FM_GLOBAL.DTWIN_WINDOW._malloc(lengthBytes_for_fileName);
    FM_GLOBAL.DTWIN_WINDOW.stringToUTF8(fileName, string_on_wasm_heap_for_fileName, lengthBytes_for_fileName);
    // call
    FM_GLOBAL.DTWIN._LoadSceneFromFile(string_on_wasm_heap_for_fileName);
    // free
    FM_GLOBAL.DTWIN_WINDOW._free(string_on_wasm_heap_for_fileName);
};