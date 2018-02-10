#include <stdio.h>  // for 'printf' function
// #include <string.h> // for 'strlen' function
#include <string> // for 'string'
#include <stdlib.h> // for 'free' function
#include <map> // for 'map' type
#include <vector> // for 'vector' type

using namespace std;

extern "C" {

// get length of the string

size_t getLen(char* s)
{
    size_t len = strlen(s);
    return len;
}

// get object array from javascript

char* getObjectFromJS(char* arr, int key_length, int array_length, int array_index, char* key_selected)
{

    vector<string> key;
    char **value = new char *[key_length];
    int value_id;
    char* a;
    char* b;
    typedef map<string, const char *> obj_type;
    obj_type obj;
    vector<obj_type> obj_arr;

    for (int i = 0; i < array_length; i++) {
        value_id = 0;

        for (int j = 0; j < key_length *  3 + 1; j++)
        {
            if (j == 0) {
                if (i == 0)
                {
                    strtok(arr, "\"");
                }
            } else {
                if (j % 3 == 1) {
                    b = strtok(NULL, "{,\"}");
                    key.push_back(b);
                } else {
                    if (j % 3 == 0) {
                        a = strtok(NULL, "{,\"}");
                        value[value_id] = a;
                        obj[key[value_id]] = value[value_id];
                        value_id++;
                    } else {
                        strtok(NULL, "{,\"}");
                    }
                }
            }
        };

        obj_arr.push_back(obj);
    };

    char *result = (char*)obj_arr[array_index][key_selected];
    return result;
    
    free(key_selected);
    free(arr);
}
}
