#include <stdio.h>  // for 'printf' function
#include <string.h> // for 'strlen' function
#include <stdlib.h> // for 'free' function
using namespace std;

extern "C" {

char *s = (char *)"String from C++";

// get memory address of the string

char *getOffset()
{
    return &s[0];
}

// get length of the string

size_t getLen()
{
    size_t len = strlen(s);
    return len;
}

// get string from javascript

void getString(char *str, int length)
{
    printf("%s\n", "Array from JavaScript to WASM");

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
