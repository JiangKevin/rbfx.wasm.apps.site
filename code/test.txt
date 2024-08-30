//
//
const PARAMS = {
    background: {
        r: 255,
        g: 0,
        b: 55
    },
    tint: {
        r: 0,
        g: 255,
        b: 214,
        a: 0.5
    },
};
//
function testShape() {
    FM_GLOBAL.CAD_SCENE.remove(FM_GLOBAL.CAD_SCENE.getObjectByName("shape"));
    let width = 50,
        height = 70,
        thickness = 30;
    let bottle = makeBottle(FM_GLOBAL.OPENCASCADE, width, height, thickness);
    addVisulizeShapeToScene(FM_GLOBAL.OPENCASCADE, bottle, FM_GLOBAL.CAD_SCENE, "shape");
    //
    FM_GLOBAL.TWEAKPANLE.addBinding(PARAMS, 'background');
}
//
testShape();