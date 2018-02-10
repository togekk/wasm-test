#include <stdio.h>  // for 'printf' function
// #include <string.h> // for 'strlen' function
#include <string> // for 'strlen' function
#include <stdlib.h> // for 'free' function
#include <map>
#include <vector>

using namespace std;

extern "C" {

// get length of the string

size_t getLen(char* s)
{
    size_t len = strlen(s);
    return len;
}

// // // get length of the string

// size_t getLen()
// {
//     size_t len = strlen(s);
//     return len;
// }

// get string from javascript

char* getObjectFromJS(char *str, int length, char* key_selected)
{

    vector<string> key;
    char **value = new char *[length];
    int key_id = 0;
    int value_id = 0;
    map<string, const char *> obj;
    
    for (int i = 0; i < 8; i++)
    {
        if (i == 0)
        {
            strtok(str, "\"");
        }
        if (i % 2 == 0)
        {
            key[key_id] = strtok(NULL, ",\":}");
            key_id++;
        }
        else
        {
            value[value_id] = strtok(NULL, ",\":}");
            value_id++;
        }
    }

    for (int i = 0; i < 4; i++)
    {
        obj[key[i]] = value[i];
    }

    char *result = (char*)obj[key_selected];
    
    return result;
    
    free(key_selected);
    free(str);
}
}
