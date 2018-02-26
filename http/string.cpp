#include <stdio.h>
#include <emscripten.h>

extern "C" {
void onload(unsigned handle, void *userData, void *data, unsigned size)
{
    printf("Loading Complete.\n");
    printf("%s\n", data);
}
void onerror(unsigned handle, void *userData, int status, const char *message)
{
    printf("Error!\n");
}
void onprogress(unsigned handle, void *userData, int loaded, int total)
{
    float a = loaded / total;
    printf("Loading...%f\n", a);
}
int main()
{
    emscripten_async_wget2_data("https://test-wasm.iii-cflab.com/mp/v1/tokens/validation", "GET", "", NULL, 1, onload, onerror, onprogress);
    return 0;
}
}