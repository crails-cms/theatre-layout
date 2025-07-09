#include "layout.hpp"
#include "autogen/assets.hpp"
#include "autogen/renderers/theatre_layout_html_renderer.hpp"

extern "C"
{
  Crails::BuiltinAssets* get_assets()
  {
    static TheatreLayoutAssets assets;
    return &assets;
  }

  Crails::Renderer* get_html_renderer()
  {
    static TheatreLayoutHtmlRenderer renderer;
    return &renderer;
  }

  Crails::Cms::Layout* create_layout()
  {
    return new TheatreLayout();
  }
}
