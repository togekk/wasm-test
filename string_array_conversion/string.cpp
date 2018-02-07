#include <stdio.h>  // for 'printf' function
#include <string.h> // for 'strlen' function
#include <string>   // for 'strlen' function
#include <stdlib.h> // for 'free' function
using namespace std;

extern "C" {

const char *s[] = {"Tom", "Mary", "Stacy", "Tiffany", "Emily", "John", "Michael"};
string str;
int array_length = sizeof(s) / sizeof(*s);
char *str2;

// get memory address of the string
char *sendArrayToJS()
{
    for (int i = 0; i < array_length; i++)
    {
        str.append(s[i]);
        if (i != array_length - 1)
        {
            str.append(",");
        }
    };
    str2 = (char *)str.c_str();
    return &str2[0];
}

size_t getLen()
{
    size_t len = strlen(str2);
    return len;
}

// // // get length of the string

// size_t getLen()
// {
//     size_t len = strlen(s);
//     return len;
// }

// get string from javascript

void getArrayFromJS(char *str, int length)
{

    printf("%s\n", "***** Array from JavaScript to WASM *****");

    char **arr = new char *[length];

    for (int i = 0; i < length; i++)
    {
        if (i == 0)
        {
            arr[i] = strtok(str, ",");
        }
        else
        {
            arr[i] = strtok(NULL, ",");
        }
    }

    for (int i = 0; i < length; i++)
    {
        printf("%s\n", arr[i]);
    }

    free(str);
}
}
