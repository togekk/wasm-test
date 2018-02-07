#include <stdio.h>   // for 'printf' function
#include <string.h>  // for 'strlen' function
#include <stdlib.h>  // for 'free' function

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
    
// void getString(char *str)
// {
//     printf("%s\n", str);
//     int Module.intArrayFromString(str);
//     printf("%s\n", str);
// }

void getStringArray(int *arr, int length) {
  for (int i = 0; i < length; i++){
    printf("%s\n", (char*) arr[i]);
  }
    free(arr);
    
}
    
}
