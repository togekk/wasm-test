#include <stdio.h>
#include <emscripten.h>
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include <string>
#include <algorithm>

using namespace std;
using namespace rapidjson;

extern "C" {
void onload(unsigned handle, void *userData, void *data, unsigned size)
{
    printf("Loading Complete.\n");
    char *data_2 = (char *)data;
    data_2[strlen(data_2) - 1] = '\0';
    data_2[strlen(data_2) - 2] = '\0';
    printf("%s\n", data_2);

    // 1. Parse a JSON string into DOM.
    // const char *json = "{\"resources\": [{\"name\": \"eipaasssoroot@gmail.com\", \"user_id\": \"9443219e-8f16-45f0-b0e3-05f9bffb7062\", \"user_role\": \"admin\"}]}";
    Document d;
    d.Parse(data_2);

    // // 2. Modify it by DOM.
    printf("%s\n", d["resources"][0]["user_id"].GetString());
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
    emscripten_async_wget2_data("https://my-api.com", "GET", "", NULL, 1, onload, onerror, onprogress);
    return 0;
}
}