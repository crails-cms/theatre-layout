cmake_minimum_required(VERSION 3.0)

project(theatre-layout_layout_plugin)

find_package(PkgConfig)
pkg_check_modules(CRAILS_CMS REQUIRED libcrails-cms>=2.0.0)

include_directories(${CRAILS_CMS_INCLUDE_DIRS} .)

file(GLOB plugin_files
  src/*.cpp
  lib/*.cpp
  lib/renderers/*.cpp
  lib/renderers/html/*.cpp)

add_library(theatre-layout_layout SHARED ${plugin_files})
set_property(TARGET theatre-layout_layout PROPERTY ENABLE_EXPORTS ON)
target_link_libraries(theatre-layout_layout ${CRAILS_CMS_LIBRARIES})
