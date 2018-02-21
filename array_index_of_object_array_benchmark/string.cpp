#include <stdio.h>  // for 'printf' function
#include <string>   // for 'strtok' & 'strcmp'
#include <stdlib.h> // for 'free' function
#include <map>      // for 'map' type
#include <vector>   // for 'vector' type

using namespace std;

extern "C" {

// get object array from javascript

int arrayIndexOf(char *arr, char *value_selected, int arr_length, int key_length)
{
    char *a;
    int id = 0;
    int id_found = -1;
    int len = strlen(value_selected);

    strtok(arr, "\"");

    do
    {

        a = strtok(NULL, "{,\"}");
        if (memcmp(a, value_selected, len) == 0)
        {
            id_found = id;
        }
        id++;

    } while (memcmp(a, value_selected, len) != 0 && id < arr_length * key_length * 3);

    // if (id_found >= 0) {
    //     return id_found / key_length / 3;
    // } else {
    //     return -1;
    // }
    return id;

    free(value_selected);
    free(arr);
}

vector<string> key;
int value_id = 0;
typedef map<pair<int, string>, const char *> obj_type;
obj_type obj;
int *len;

void getObjectFromJS(char *key_2, char *value, int array_length, int object_length)
{
    key.push_back(key_2);
    obj[make_pair(value_id / object_length, key[value_id])] = value;
    value_id++;
}

int arrayIndexOf2(char *key_2, char *value, int array_length, int object_length)
{
    int id_found;
    int count;
    int len = strlen(value);

    for (int i = 0; i < array_length; i++)
    {
        for (int j = 0; j < object_length; j++)
        {
            if (memcmp(obj[make_pair(i, key_2)], value, len) == 0)
            {
                // id_found = value_id;
                break;
            }
            count++;
        }
    }

    return count;
}
}
