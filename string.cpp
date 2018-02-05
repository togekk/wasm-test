#include <stdio.h>
#include <string.h>
#include <stdlib.h>

extern "C" {

int main()
{
    // printf("hello, world!\n");
    return 0;
}

// typedef struct
// {
//     size_t size;
//     char *data;
// } data_buffer;

// data_buffer buffer = {0};

char *s = (char *)"String from C++";

char *getOffset()
{
    return &s[0];
}

size_t getLen()
{
    size_t len = strlen(s);
    return len;
}

void getString(char *str)
{
    printf("%s\n", str);
    free(str);
}

// int *append(int *str, int len)
// {
//     // int a;
//     // for (int i = len + 1; i < len + 5; i++)
//     // {
//     //     str[i] = 72;
//     // }
//     return &str[1];
//     // strcat(str, " fuck");
//     // char *str = buffer.data;
//     // size_t len = strlen(str);
//     // return str;
// }
}
