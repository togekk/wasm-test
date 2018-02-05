#include <stdio.h>
#include <string.h>
#include <stdlib.h>

extern "C" {

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

}
