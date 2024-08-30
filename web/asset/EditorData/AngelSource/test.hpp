
/*Build by angelscripten*/
float AppendScene()
{

    scene_ptr.CreateChild( "Jack" );
    scene_ptr.create_component_by_node( "Jack", "FmKinematicCharacter" );

    // scene_ptr.printSelf();
    // // scene_ptr.CreateChild("aa");
    // // scene_ptr.RemoveChild("Jeep1");
    // //
    // scene_ptr.set_node_direction( "Jeep1", 34.0, 50.0, 100.0 );
    // //
    // float x, y, z;
    // scene_ptr.get_node_position( "Jeep1", x, y, z );
    // Debug_log( "position x= " + x );
    // //
    // // scene_ptr.create_component_by_node("aa","StaticModel");
    // scene_ptr.set_node_scale( "aa", 0.01, 0.01, 0.01 );
    // scene_ptr.set_component_attr_by_node( "aa", "StaticModel", "Model", "Model;Models/HoverBike.mdl" );
    // scene_ptr.set_component_attr_by_node( "aa", "StaticModel", "View Mask", "2" );
    // scene_ptr.set_component_attr_by_node( "aa", "StaticModel", "Material", "Material;Materials/LightmapBlue.xml;Materials/Stone.xml" );
    // //
    // // scene_ptr.create_component_by_node("FreeCamera","Camera");
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "View Override Flags", "10" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Is Enabled", "0" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "FOV", "50" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Zoom", "1.2" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Clip Plane", "0.0,1.0,1.0,0.0" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Projection Offset", "0.0,1.0" );
    // scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Fill Mode", "0" );

    // //
    // scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Fog Color", "1.0,0.0,1.0,0.8" );
    // //
    // scene_ptr.set_component_attr_by_node( "Scene", "RenderPipeline", "Color Space", "0" );

    //
    return 0;
}

//
float RestAndCreateScene()
{
    scene_ptr.Clear();
    /*
     *
     *
     *
     */
    scene_ptr.create_component_by_node( "Scene", "Octree" );
    scene_ptr.create_component_by_node( "Scene", "PhysicsWorld" );

    //
    scene_ptr.CreateChild( "Zone" );
    scene_ptr.create_component_by_node( "Zone", "Zone" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Bounding Box Min", "-1000.0,-1000.0,-1000.0" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Bounding Box Max", "1000.0,1000.0,1000.0" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Ambient Color", "0.15,0.15,0.15,1.0" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Fog Color", "0.5,0.5,0.7,1.0" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Fog Start", "100.0" );
    scene_ptr.set_component_attr_by_node( "Zone", "Zone", "Fog End", "300.0" );
    //
    scene_ptr.CreateChild( "DirectionalLight" );
    scene_ptr.set_node_position( "DirectionalLight", 0.3, -0.5, 0.15 );
    // scene_ptr.set_node_direction( "DirectionalLight", 13.0,35.0, 14.15 );

    scene_ptr.set_node_attr( "DirectionalLight", "Rotation", "43.0,35.0,14.0" );
    scene_ptr.create_component_by_node( "DirectionalLight", "Light" );
    scene_ptr.set_component_attr_by_node( "DirectionalLight", "Light", "Light Type", "0" );
    scene_ptr.set_component_attr_by_node( "DirectionalLight", "Light", "Cast Shadows", "True" );
    scene_ptr.set_component_attr_by_node( "DirectionalLight", "Light", "Color", "1.0,1.0,1.0,1.0" );
    // scene_ptr.set_component_attr_by_node( "DirectionalLight", "Light", "CSM Splits", "10,50,200,0" );
    // scene_ptr.set_component_attr_by_node( "DirectionalLight", "Light", "Specular Intensity", "0.5" );

    // //
    // scene_ptr.CreateChild( "Sky" );
    // scene_ptr.set_node_scale( "Sky", 500.0, 500.0, 500.0 );
    // scene_ptr.create_component_by_node( "Sky", "Skybox" );
    // scene_ptr.set_component_attr_by_node( "Sky", "Skybox", "Model", "Model;Models/Box.mdl" );
    // scene_ptr.set_component_attr_by_node( "Sky", "Skybox", "Material", "Material;Materials/Skybox.xml" );
    //
    scene_ptr.CreateChild( "Floor" );
    scene_ptr.set_node_position( "Floor", 0.0, -0.5, 0.0 );
    scene_ptr.set_node_scale( "Floor", 200.0, 1.0, 200.0 );
    scene_ptr.create_component_by_node( "Floor", "FmFloor" );
    scene_ptr.call_component_default_init_by_node( "Floor", "FmFloor" );
    //
    scene_ptr.CreateChild( "FreeCamera" );
    scene_ptr.set_node_position( "FreeCamera", 0.0, 2.5, 0.0 );
    scene_ptr.create_component_by_node( "FreeCamera", "Camera" );
    scene_ptr.set_component_attr_by_node( "FreeCamera", "Camera", "Far Clip", "300.0" );

    // //
    scene_ptr.CreateChild( "Jack" );
    scene_ptr.create_component_by_node( "Jack", "FmKinematicCharacter" );
    scene_ptr.call_component_default_init_by_node( "Jack", "FmKinematicCharacter" );
    scene_ptr.create_component_by_node( "Jack", "CollisionShape" );
    // scene_ptr.set_component_attr_by_node( "Jack", "FmKinematicCharacter", "Create Default##Create Default", "" );

    // scene_ptr.create_child_by_node( "Jack", "AdjNode" );
    // scene_ptr.set_node_attr( "AdjNode", "Rotation", "180,0,1,0" );
    // scene_ptr.create_component_by_node( "AdjNode", "StaticModel" );
    // scene_ptr.set_component_attr_by_node( "AdjNode", "StaticModel", "Model", "Model;Models/Mutant/Mutant.mdl" );
    // scene_ptr.set_component_attr_by_node( "AdjNode", "StaticModel", "Material", "Materials;Models/Mutant/Materials/mutant_M.xml" );
    // scene_ptr.set_component_attr_by_node( "AdjNode", "StaticModel", "Cast Shadows", "True" );

    // scene_ptr.create_component_by_node( "AdjNode", "AnimationController" );

    // scene_ptr.create_component_by_node( "Jack", "MoveAndOrbitController" );
    // scene_ptr.set_component_attr_by_node( "Jack", "MoveAndOrbitController", "Input Map", "InputMap;Input/MoveAndOrbit.inputmap" );

    /*
     *
     *
     *
     */
    scene_ptr.SetupViewport( "FreeCamera" );
    return 0;
}
