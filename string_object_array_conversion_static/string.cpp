#include <stdio.h>  // for 'printf' function
#include <string.h> // for 'strlen' function
#include <stdlib.h> // for 'free' function

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

    class person
    {
      public:
        char *name;
        char *age;
        char *nationality;
        char *date_of_birth;
    };

    char **value = new char *[length];
    int value_id = 0;

    person obj[3];

    for (int i = 0; i < 24; i++)
    {
        if (i == 0)
        {
            strtok(str, "\"");
        }
        if (i % 2 != 0)
        {
            value[value_id] = strtok(NULL, "{,\":}");
            value_id++;
        }
        else
        {
            strtok(NULL, "{,\":}");
        }
    }

    for (int i = 0; i < 3; i++)
    {
        obj[i].name = value[i * 4];
        obj[i].age = value[i * 4 + 1];
        obj[i].nationality = value[i * 4 + 2];
        obj[i].date_of_birth = value[i * 4 + 3];
        printf("Name: %s\n", obj[i].name);
        printf("Age: %s\n", obj[i].age);
        printf("Nationality: %s\n", obj[i].nationality);
        printf("Date_of_birth: %s\n", obj[i].date_of_birth);
    }

    free(str);
}
}
