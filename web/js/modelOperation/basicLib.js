const loadFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

const loadSTEPorIGES = async (openCascade, inputFile, addFunction, scene) => {
    await loadFileAsync(inputFile).then(async (fileText) => {
        // 文件是原生还是扩展
        var nativeOrExtended = {};
        //
        const fileType = (() => {
            switch (inputFile.name.toLowerCase().split(".").pop()) {
                case "step":
                case "stp": {
                    nativeOrExtended.type = "native";
                    nativeOrExtended.extend_file_type = "step";
                    return "step";
                }
                case "iges":
                case "igs": {
                    nativeOrExtended.type = "native";
                    nativeOrExtended.extend_file_type = "iges";
                    return "iges";
                }
                case "stl": {
                    nativeOrExtended.type = "extend";
                    nativeOrExtended.extend_file_type = "stl";
                    return "stl";
                }
                default: {
                    return undefined;
                }
            }
        })();
        // Writes the uploaded file to Emscripten's Virtual Filesystem
        openCascade.FS.createDataFile("/", `file.$ { fileType }`, fileText, true, true);

        // Choose the correct OpenCascade file parsers to read the CAD file
        var reader = null;
        var readShape = null;
        var readResult = null;
        var wasm_filename = "/" + inputFile.name;

        //
        if (nativeOrExtended.type == "native") {
            if (fileType === "step") {
                reader = new openCascade.STEPControl_Reader_1();
            } else if (fileType === "iges") {
                reader = new openCascade.IGESControl_Reader_1();
            } else {
                console.error("opencascade.js can't parse this extension! (yet)");
                return;
            }
            //
            readResult = reader.ReadFile(`file.$ { fileType }`); // Read the file
            //
            if (readResult === openCascade.IFSelect_ReturnStatus.IFSelect_RetDone) {
                console.log("file loaded successfully!     Converting to OCC now...");
                const numRootsTransferred = reader.TransferRoots(new openCascade.Message_ProgressRange_1()); // Translate all transferable roots to OpenCascade
                const stepShape = reader.OneShape(); // Obtain the results of translation in one OCCT shape
                console.log(inputFile.name + " converted successfully!  Triangulating now...");

                // Out with the old, in with the new!
                scene.remove(scene.getObjectByName("shape"));
                await addFunction(openCascade, stepShape, scene);
                console.log(inputFile.name + " triangulated and added to the scene!");

                // Remove the file when we're done (otherwise we run into errors on reupload)
                openCascade.FS.unlink(`/ file.$ { fileType }`);
            } else {
                console.error("Something in OCCT went wrong trying to read " + inputFile.name);
            }
        } else {
            if (fileType === "stl") {
                reader = new openCascade.StlAPI_Reader();
                readShape = new openCascade.TopoDS_Shape();
            } else {
                console.error("opencascade.js can't parse this extension! (yet)");
                return;
            }
            //
            if (reader.Read(readShape, `file.$ { fileType }`)) {
                console.log(inputFile.name + " loaded successfully!     Converting to OCC now...");
                // Out with the old, in with the new!
                scene.remove(scene.getObjectByName("shape"));
                await addFunction(openCascade, readShape, scene);
                console.log(inputFile.name + " triangulated and added to the scene!");

                // Remove the file when we're done (otherwise we run into errors on reupload)
                openCascade.FS.unlink(`/ file.$ { fileType }`);
            } else {
                console.error("Something in OCCT went wrong trying to read " + inputFile.name);
            }
        }
    });
};

const setupThreeJSViewport = () => {
    //
    var scene = new FM_GLOBAL.THREE.Scene();
    var camera = new FM_GLOBAL.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new FM_GLOBAL.THREE.WebGLRenderer({ antialias: true });
    const viewport = document.getElementById("viewport");
    //
    if (viewport) {
        renderer.setSize(window.innerWidth - 275, window.innerHeight - 124);
        viewport.appendChild(renderer.domElement);

        const light = new FM_GLOBAL.THREE.AmbientLight(0x404040);
        scene.add(light);
        const directionalLight = new FM_GLOBAL.THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0.5, 0.5, 0.5);
        scene.add(directionalLight);

        camera.position.set(0, 50, 100);

        const controls = new FM_GLOBAL.ORBITCONTROLS(camera, renderer.domElement);
        controls.screenSpacePanning = true;
        controls.target.set(0, 50, 0);
        controls.update();

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }
    return scene;
};
const setupThreeJSCore = () => {
    var cad_core = {};
    //
    var scene = new FM_GLOBAL.THREE.Scene();
    var camera = new FM_GLOBAL.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new FM_GLOBAL.THREE.WebGLRenderer({ antialias: true });
    //
    renderer.setSize(window.innerWidth - 275, window.innerHeight - 124);
    const light = new FM_GLOBAL.THREE.AmbientLight(0x404040);
    scene.add(light);
    const directionalLight = new FM_GLOBAL.THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0.5, 0.5, 0.5);
    scene.add(directionalLight);
    camera.position.set(0, 50, 100);
    const controls = new FM_GLOBAL.ORBITCONTROLS(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0, 50, 0);
    controls.update();
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
    //
    cad_core.scene = scene;
    cad_core.renderer = renderer;
    //
    return cad_core;
};
//
const addVisulizeShapeToScene = async (openCascade, shape, scene, shapeName) => {
    const objectMat = new FM_GLOBAL.THREE.MeshStandardMaterial({
        color: new FM_GLOBAL.THREE.Color(0.9, 0.9, 0.9),
    });

    let geometries = visualize(openCascade, shape);

    let group = new FM_GLOBAL.THREE.Group();
    geometries.forEach((geometry) => {
        group.add(new FM_GLOBAL.THREE.Mesh(geometry, objectMat));
    });

    group.name = shapeName;
    group.rotation.x = -Math.PI / 2;
    scene.add(group);
};
async function getNewFileHandle(desc, mime, ext, open = false) {
    const options = {
        types: [
            {
                description: desc,
                accept: {
                    [mime]: ["." + ext],
                },
            },
        ],
    };
    if (open) {
        return await window.showOpenFilePicker(options);
    } else {
        return await window.showSaveFilePicker(options);
    }
}
//
async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
}
//
async function downloadFile(data, name, mime, ext) {
    const blob = new Blob([data], { type: mime });
    const a = document.createElement("a");
    a.download = name + "." + ext;
    a.style.display = "none";
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
}

/**  Save the current shape to .obj */
const saveShapeOBJ = async (scene) => {
    var objExporter = new FM_GLOBAL.THREE_OBJEXPORTER();
    let result = objExporter.parse(scene);
    //
    if (window.showSaveFilePicker) {
        const fileHandle = await getNewFileHandle("OBJ files", "text/plain", "obj");
        writeFile(fileHandle, result).then(() => {
            console.log("Saved OBJ to " + fileHandle.name);
        });
    } else {
        await downloadFile(result, "Untitled", "model/obj", "obj");
    }
};
/**  Save the current shape to an ASCII .stl */
const saveShapeSTL = async (scene) => {
    var stlExporter = new FM_GLOBAL.THREE_STLEXPORTER();
    let result = stlExporter.parse(scene);
    //
    if (window.showSaveFilePicker) {
        const fileHandle = await getNewFileHandle("STl files", "text/plain", "stl");
        writeFile(fileHandle, result).then(() => {
            console.log("Saved STl to " + fileHandle.name);
        });
    } else {
        await downloadFile(result, "Untitled", "model/stl", "stl");
    }
};
const saveShapeSTEP = async (filename = "CascadeStudioPart.step") => {
    let writer = new FM_GLOBAL.OPENCASCADE.STEPControl_Writer();
    // Convert to a .STEP File
    let transferResult = writer.Transfer(FM_GLOBAL.CAD_SCENE, 0);
    //
    if (window.showSaveFilePicker) {
        const fileHandle = await getNewFileHandle("STEP files", "text/plain", "step");
        writeFile(fileHandle, result).then(() => {
            console.log("Saved STEP to " + fileHandle.name);
        });
    } else {
        await downloadFile(result, "Untitled", "model/step", "step");
    }
};
const saveShapeGLTF = async (scene) => {
    var gltfExporter = new FM_GLOBAL.THREE_GLTFEXPORTER();
    let result = gltfExporter.parse(scene);
    //
    if (window.showSaveFilePicker) {
        const fileHandle = await getNewFileHandle("GLTF files", "text/plain", "gltf");
        writeFile(fileHandle, result).then(() => {
            console.log("Saved GLTF to " + fileHandle.name);
        });
    } else {
        await downloadFile(result, "Untitled", "model/gltf", "gltf");
    }
};
const saveCodeOfCad = async (code) => {
    //
    if (window.showSaveFilePicker) {
        const fileHandle = await getNewFileHandle("TXT files", "text/plain", "txt");
        writeFile(fileHandle, code).then(() => {
            console.log("Saved TXT to " + fileHandle.name);
        });
    } else {
        await downloadFile(result, "Untitled", "model/txt", "txt");
    }
};
