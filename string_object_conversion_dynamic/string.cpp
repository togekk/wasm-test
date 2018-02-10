#include <stdio.h>  // for 'printf' function
#include <string.h> // for 'strlen' function
#include <stdlib.h> // for 'free' function
#include <map>

using namespace std;

extern "C" {

// get memory address of the string
// char *sendArrayToJS()
// {
//     for (int i = 0; i < array_length; i++)
//     {
//         str.append(s[i]);
//         if (i != array_length - 1)
//         {
//             str.append(",");
//         }
//     };
//     str2 = (char *)str.c_str();
//     return &str2[0];
// }

// size_t getLen()
// {
//     size_t len = strlen(str2);
//     return len;
// }

// // // get length of the string

// size_t getLen()
// {
//     size_t len = strlen(s);
//     return len;
// }

// get string from javascript

void getObjectFromJS(char *str, int length)
{

    printf("%s\n", "***** Object from JavaScript to WASM *****");

    char key_find[] = "nationality";

    char **key = new char *[length];
    char **value = new char *[length];
    int key_id, value_id = 0;
    map<const char *, const char *> obj;

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
        printf("%s\n", obj[key[i]]);
    }
    
    free(str);
}
}
