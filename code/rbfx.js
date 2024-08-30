function RestAndCreateScene() {
  FM_.create_child_by_node("Box1", "Box2");

  FM_.set_node_position("Box1", 0, 20, 0);

  FM_.set_node_direction("Box1", 0, 20, 0);
  FM_.set_node_scale("Box1", 1, 1.2, 1);

  FM_.create_component_by_node("Box2", "FmFloor");
  FM_.remove_component_by_node("Box2","FmFloor")
}

//
RestAndCreateScene();
