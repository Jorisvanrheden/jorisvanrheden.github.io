// quick_example.cpp
#include <emscripten/bind.h>

using namespace emscripten;

float add(int a, int b) {
    return a + b;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("add", &add);
}