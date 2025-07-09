cmake_minimum_required(VERSION 3.5)

project(theatre-layout_layout_plugin)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++17 -pedantic -O3")

find_package(PkgConfig)
pkg_check_modules(CRAILS_CMS REQUIRED libcrails-cms>=2.0.0)

include_directories(${CRAILS_CMS_INCLUDE_DIRS} .)

execute_process(COMMAND ./prebuild.sh WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR})

file(GLOB plugin_files
  src/*.cpp
  autogen/*.cpp
  lib/renderers/*.cpp
  lib/renderers/html/*.cpp)

add_library(theatre-layout_layout SHARED ${plugin_files})
set_property(TARGET theatre-layout_layout PROPERTY ENABLE_EXPORTS ON)
target_link_libraries(theatre-layout_layout ${CRAILS_CMS_LIBRARIES})

install(TARGETS materialize_layout LIBRARY DESTINATION lib/libcrails-cms/layouts)
