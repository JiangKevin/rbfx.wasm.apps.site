#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "EASTL" for configuration "Release"
set_property(TARGET EASTL APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(EASTL PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libEASTL.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS EASTL )
list(APPEND _IMPORT_CHECK_FILES_FOR_EASTL "${_IMPORT_PREFIX}/lib/libEASTL.a" )

# Import target "LZ4" for configuration "Release"
set_property(TARGET LZ4 APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(LZ4 PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libLZ4.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS LZ4 )
list(APPEND _IMPORT_CHECK_FILES_FOR_LZ4 "${_IMPORT_PREFIX}/lib/libLZ4.a" )

# Import target "PugiXml" for configuration "Release"
set_property(TARGET PugiXml APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(PugiXml PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libPugiXml.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS PugiXml )
list(APPEND _IMPORT_CHECK_FILES_FOR_PugiXml "${_IMPORT_PREFIX}/lib/libPugiXml.a" )

# Import target "STB" for configuration "Release"
set_property(TARGET STB APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(STB PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libSTB.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS STB )
list(APPEND _IMPORT_CHECK_FILES_FOR_STB "${_IMPORT_PREFIX}/lib/libSTB.a" )

# Import target "fmt" for configuration "Release"
set_property(TARGET fmt APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(fmt PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libfmt.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS fmt )
list(APPEND _IMPORT_CHECK_FILES_FOR_fmt "${_IMPORT_PREFIX}/lib/libfmt.a" )

# Import target "SDL2-static" for configuration "Release"
set_property(TARGET SDL2-static APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(SDL2-static PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libSDL2.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS SDL2-static )
list(APPEND _IMPORT_CHECK_FILES_FOR_SDL2-static "${_IMPORT_PREFIX}/lib/libSDL2.a" )

# Import target "ETCPACK" for configuration "Release"
set_property(TARGET ETCPACK APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(ETCPACK PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libETCPACK.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS ETCPACK )
list(APPEND _IMPORT_CHECK_FILES_FOR_ETCPACK "${_IMPORT_PREFIX}/lib/libETCPACK.a" )

# Import target "tinygltf" for configuration "Release"
set_property(TARGET tinygltf APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(tinygltf PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libtinygltf.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS tinygltf )
list(APPEND _IMPORT_CHECK_FILES_FOR_tinygltf "${_IMPORT_PREFIX}/lib/libtinygltf.a" )

# Import target "FreeType" for configuration "Release"
set_property(TARGET FreeType APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(FreeType PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libFreeType.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS FreeType )
list(APPEND _IMPORT_CHECK_FILES_FOR_FreeType "${_IMPORT_PREFIX}/lib/libFreeType.a" )

# Import target "RmlUi" for configuration "Release"
set_property(TARGET RmlUi APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(RmlUi PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libRmlUi.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS RmlUi )
list(APPEND _IMPORT_CHECK_FILES_FOR_RmlUi "${_IMPORT_PREFIX}/lib/libRmlUi.a" )

# Import target "glslang" for configuration "Release"
set_property(TARGET glslang APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(glslang PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libglslang.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS glslang )
list(APPEND _IMPORT_CHECK_FILES_FOR_glslang "${_IMPORT_PREFIX}/lib/libglslang.a" )

# Import target "OGLCompiler" for configuration "Release"
set_property(TARGET OGLCompiler APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(OGLCompiler PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libOGLCompiler.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS OGLCompiler )
list(APPEND _IMPORT_CHECK_FILES_FOR_OGLCompiler "${_IMPORT_PREFIX}/lib/libOGLCompiler.a" )

# Import target "OSDependent" for configuration "Release"
set_property(TARGET OSDependent APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(OSDependent PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libOSDependent.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS OSDependent )
list(APPEND _IMPORT_CHECK_FILES_FOR_OSDependent "${_IMPORT_PREFIX}/lib/libOSDependent.a" )

# Import target "MachineIndependent" for configuration "Release"
set_property(TARGET MachineIndependent APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(MachineIndependent PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libMachineIndependent.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS MachineIndependent )
list(APPEND _IMPORT_CHECK_FILES_FOR_MachineIndependent "${_IMPORT_PREFIX}/lib/libMachineIndependent.a" )

# Import target "GenericCodeGen" for configuration "Release"
set_property(TARGET GenericCodeGen APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(GenericCodeGen PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libGenericCodeGen.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS GenericCodeGen )
list(APPEND _IMPORT_CHECK_FILES_FOR_GenericCodeGen "${_IMPORT_PREFIX}/lib/libGenericCodeGen.a" )

# Import target "glslang-default-resource-limits" for configuration "Release"
set_property(TARGET glslang-default-resource-limits APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(glslang-default-resource-limits PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libglslang-default-resource-limits.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS glslang-default-resource-limits )
list(APPEND _IMPORT_CHECK_FILES_FOR_glslang-default-resource-limits "${_IMPORT_PREFIX}/lib/libglslang-default-resource-limits.a" )

# Import target "SPIRV" for configuration "Release"
set_property(TARGET SPIRV APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(SPIRV PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libSPIRV.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS SPIRV )
list(APPEND _IMPORT_CHECK_FILES_FOR_SPIRV "${_IMPORT_PREFIX}/lib/libSPIRV.a" )

# Import target "spirv-cross-core" for configuration "Release"
set_property(TARGET spirv-cross-core APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(spirv-cross-core PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libspirv-cross-core.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS spirv-cross-core )
list(APPEND _IMPORT_CHECK_FILES_FOR_spirv-cross-core "${_IMPORT_PREFIX}/lib/libspirv-cross-core.a" )

# Import target "spirv-cross-glsl" for configuration "Release"
set_property(TARGET spirv-cross-glsl APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(spirv-cross-glsl PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libspirv-cross-glsl.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS spirv-cross-glsl )
list(APPEND _IMPORT_CHECK_FILES_FOR_spirv-cross-glsl "${_IMPORT_PREFIX}/lib/libspirv-cross-glsl.a" )

# Import target "spirv-cross-msl" for configuration "Release"
set_property(TARGET spirv-cross-msl APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(spirv-cross-msl PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libspirv-cross-msl.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS spirv-cross-msl )
list(APPEND _IMPORT_CHECK_FILES_FOR_spirv-cross-msl "${_IMPORT_PREFIX}/lib/libspirv-cross-msl.a" )

# Import target "spirv-cross-hlsl" for configuration "Release"
set_property(TARGET spirv-cross-hlsl APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(spirv-cross-hlsl PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libspirv-cross-hlsl.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS spirv-cross-hlsl )
list(APPEND _IMPORT_CHECK_FILES_FOR_spirv-cross-hlsl "${_IMPORT_PREFIX}/lib/libspirv-cross-hlsl.a" )

# Import target "SPIRV-Tools-static" for configuration "Release"
set_property(TARGET SPIRV-Tools-static APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(SPIRV-Tools-static PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libSPIRV-Tools.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS SPIRV-Tools-static )
list(APPEND _IMPORT_CHECK_FILES_FOR_SPIRV-Tools-static "${_IMPORT_PREFIX}/lib/libSPIRV-Tools.a" )

# Import target "SPIRV-Tools-opt" for configuration "Release"
set_property(TARGET SPIRV-Tools-opt APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(SPIRV-Tools-opt PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libSPIRV-Tools-opt.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS SPIRV-Tools-opt )
list(APPEND _IMPORT_CHECK_FILES_FOR_SPIRV-Tools-opt "${_IMPORT_PREFIX}/lib/libSPIRV-Tools-opt.a" )

# Import target "ImGui" for configuration "Release"
set_property(TARGET ImGui APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(ImGui PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libImGui.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS ImGui )
list(APPEND _IMPORT_CHECK_FILES_FOR_ImGui "${_IMPORT_PREFIX}/lib/libImGui.a" )

# Import target "datachannel-wasm" for configuration "Release"
set_property(TARGET datachannel-wasm APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(datachannel-wasm PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libdatachannel-wasm.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS datachannel-wasm )
list(APPEND _IMPORT_CHECK_FILES_FOR_datachannel-wasm "${_IMPORT_PREFIX}/lib/libdatachannel-wasm.a" )

# Import target "Detour" for configuration "Release"
set_property(TARGET Detour APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Detour PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDetour.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Detour )
list(APPEND _IMPORT_CHECK_FILES_FOR_Detour "${_IMPORT_PREFIX}/lib/libDetour.a" )

# Import target "DetourCrowd" for configuration "Release"
set_property(TARGET DetourCrowd APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(DetourCrowd PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDetourCrowd.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS DetourCrowd )
list(APPEND _IMPORT_CHECK_FILES_FOR_DetourCrowd "${_IMPORT_PREFIX}/lib/libDetourCrowd.a" )

# Import target "DetourTileCache" for configuration "Release"
set_property(TARGET DetourTileCache APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(DetourTileCache PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDetourTileCache.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS DetourTileCache )
list(APPEND _IMPORT_CHECK_FILES_FOR_DetourTileCache "${_IMPORT_PREFIX}/lib/libDetourTileCache.a" )

# Import target "Recast" for configuration "Release"
set_property(TARGET Recast APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Recast PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libRecast.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Recast )
list(APPEND _IMPORT_CHECK_FILES_FOR_Recast "${_IMPORT_PREFIX}/lib/libRecast.a" )

# Import target "Box2D" for configuration "Release"
set_property(TARGET Box2D APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Box2D PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libBox2D.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Box2D )
list(APPEND _IMPORT_CHECK_FILES_FOR_Box2D "${_IMPORT_PREFIX}/lib/libBox2D.a" )

# Import target "WebP" for configuration "Release"
set_property(TARGET WebP APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(WebP PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libWebP.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS WebP )
list(APPEND _IMPORT_CHECK_FILES_FOR_WebP "${_IMPORT_PREFIX}/lib/libWebP.a" )

# Import target "Bullet" for configuration "Release"
set_property(TARGET Bullet APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Bullet PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libBullet.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Bullet )
list(APPEND _IMPORT_CHECK_FILES_FOR_Bullet "${_IMPORT_PREFIX}/lib/libBullet.a" )

# Import target "StanHull" for configuration "Release"
set_property(TARGET StanHull APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(StanHull PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libStanHull.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS StanHull )
list(APPEND _IMPORT_CHECK_FILES_FOR_StanHull "${_IMPORT_PREFIX}/lib/libStanHull.a" )

# Import target "GLEW" for configuration "Release"
set_property(TARGET GLEW APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(GLEW PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libGLEW.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS GLEW )
list(APPEND _IMPORT_CHECK_FILES_FOR_GLEW "${_IMPORT_PREFIX}/lib/libGLEW.a" )

# Import target "Diligent-BasicPlatform" for configuration "Release"
set_property(TARGET Diligent-BasicPlatform APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-BasicPlatform PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-BasicPlatform.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-BasicPlatform )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-BasicPlatform "${_IMPORT_PREFIX}/lib/libDiligent-BasicPlatform.a" )

# Import target "Diligent-Common" for configuration "Release"
set_property(TARGET Diligent-Common APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-Common PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-Common.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-Common )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-Common "${_IMPORT_PREFIX}/lib/libDiligent-Common.a" )

# Import target "Diligent-EmscriptenPlatform" for configuration "Release"
set_property(TARGET Diligent-EmscriptenPlatform APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-EmscriptenPlatform PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-EmscriptenPlatform.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-EmscriptenPlatform )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-EmscriptenPlatform "${_IMPORT_PREFIX}/lib/libDiligent-EmscriptenPlatform.a" )

# Import target "Diligent-GraphicsAccessories" for configuration "Release"
set_property(TARGET Diligent-GraphicsAccessories APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-GraphicsAccessories PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsAccessories.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-GraphicsAccessories )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-GraphicsAccessories "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsAccessories.a" )

# Import target "Diligent-GraphicsEngine" for configuration "Release"
set_property(TARGET Diligent-GraphicsEngine APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-GraphicsEngine PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsEngine.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-GraphicsEngine )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-GraphicsEngine "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsEngine.a" )

# Import target "Diligent-GraphicsEngineOpenGL-static" for configuration "Release"
set_property(TARGET Diligent-GraphicsEngineOpenGL-static APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-GraphicsEngineOpenGL-static PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsEngineOpenGL-static.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-GraphicsEngineOpenGL-static )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-GraphicsEngineOpenGL-static "${_IMPORT_PREFIX}/lib/libDiligent-GraphicsEngineOpenGL-static.a" )

# Import target "Diligent-HLSL2GLSLConverterLib" for configuration "Release"
set_property(TARGET Diligent-HLSL2GLSLConverterLib APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-HLSL2GLSLConverterLib PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-HLSL2GLSLConverterLib.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-HLSL2GLSLConverterLib )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-HLSL2GLSLConverterLib "${_IMPORT_PREFIX}/lib/libDiligent-HLSL2GLSLConverterLib.a" )

# Import target "Diligent-Primitives" for configuration "Release"
set_property(TARGET Diligent-Primitives APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-Primitives PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-Primitives.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-Primitives )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-Primitives "${_IMPORT_PREFIX}/lib/libDiligent-Primitives.a" )

# Import target "Diligent-ShaderTools" for configuration "Release"
set_property(TARGET Diligent-ShaderTools APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Diligent-ShaderTools PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libDiligent-ShaderTools.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Diligent-ShaderTools )
list(APPEND _IMPORT_CHECK_FILES_FOR_Diligent-ShaderTools "${_IMPORT_PREFIX}/lib/libDiligent-ShaderTools.a" )

# Import target "Urho3D" for configuration "Release"
set_property(TARGET Urho3D APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Urho3D PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libUrho3D.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Urho3D )
list(APPEND _IMPORT_CHECK_FILES_FOR_Urho3D "${_IMPORT_PREFIX}/lib/libUrho3D.a" )

# Import target "PlayerLibrary" for configuration "Release"
set_property(TARGET PlayerLibrary APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(PlayerLibrary PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libPlayerLibrary.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS PlayerLibrary )
list(APPEND _IMPORT_CHECK_FILES_FOR_PlayerLibrary "${_IMPORT_PREFIX}/lib/libPlayerLibrary.a" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
