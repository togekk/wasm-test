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

    for (int i = 0; i < 8; i++)
    {
        if (i == 0)
        {
            strtok(str, "\"");
        }
        if (i % 2 != 0)
        {
            value[value_id] = strtok(NULL, ",\":}");
            value_id++;
        }
        else
        {
            strtok(NULL, ",\":}");
        }
    }

    person obj;
    obj.name = value[0];
    obj.age = value[1];
    obj.nationality = value[2];
    obj.date_of_birth = value[3];

    printf("Name: %s\n", obj.name);
    printf("Age: %s\n", obj.age);
    printf("Nationality: %s\n", obj.nationality);
    printf("Date_of_birth: %s\n", obj.date_of_birth);

    free(str);
}
}
