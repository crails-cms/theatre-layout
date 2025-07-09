#include "layout.hpp"
#include "autogen/assets.hpp"

TheatreLayout::TheatreLayout()
{
  name = "theatre-layout";
  type = Crails::Cms::ComponentLayoutType;
  component_layout_name = "TheatreLayoutEditor";
  stylesheets.push_back(TheatreLayoutAssets::layout_css);
  editor_stylesheets.push_back(TheatreLayoutAssets::admin_css);
  editor_javascripts.push_back(TheatreLayoutAssets::editor_js);
}
