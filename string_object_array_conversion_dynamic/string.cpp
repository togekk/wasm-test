#include <stdio.h> // for 'printf' function
// #include <string.h> // for 'strlen' function
#include <string>   // for 'string'
#include <stdlib.h> // for 'free' function
#include <map>      // for 'map' type
#include <vector>   // for 'vector' type

using namespace std;

extern "C" {

// get length of the string

size_t getLen(char *s)
{
    size_t len = strlen(s);
    return len;
}

// vector<string> key_arr;
// typedef map<string, const char *> obj_type;
// obj_type obj;
// vector<obj_type> obj_arr;
// int count_id = 0;

// get object array from javascript
vector<string> key;
int value_id = 0;
typedef map<pair<int, string>, const char *> obj_type;
obj_type obj;

void getObjectFromJS(char *key_2, char *value, int array_length, int object_length)
{
    key.push_back(key_2);
    obj[make_pair(value_id / 4, key[value_id])] = value;
    value_id++;
}

char *getValueFromObject(int array_index, char *key_selected)
{
    return (char *)obj[make_pair(array_index, key_selected)];
    free(key_selected);
}
}
