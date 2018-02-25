#include <stdio.h>  // for 'printf' function
#include <string>   // for 'strtok' & 'strcmp'
#include <stdlib.h> // for 'free' function
#include <map>      // for 'map' type
#include <limits.h>
// #include <vector>   // for 'vector' type
// #include <boost/tokenizer.hpp>
// #include <iostream>

using namespace std;

extern "C" {

#define NO_OF_CHARS 256

// A utility function to get maximum of two integers

int max(int a, int b)
{
    return (a > b) ? a : b;
}

// The preprocessing function for Boyer Moore's bad character heuristic

void badCharHeuristic(char *str, int size, int badchar[NO_OF_CHARS])
{
    int i;
    // Initialize all occurrences as -1
    for (i = 0; i < NO_OF_CHARS; i++)
        badchar[i] = -1;
    // Fill the actual value of last occurrence of a character
    for (i = 0; i < size; i++)
        badchar[(int)str[i]] = i;
}

void search(char *txt, char *pat)

{
    int m = strlen(pat);
    int n = strlen(txt);
    int badchar[NO_OF_CHARS];
    badCharHeuristic(pat, m, badchar);
    int s = 0; // s is shift of the pattern with respect to text
    while (s <= (n - m))
    {
        int j = m - 1;
        while (j >= 0 && pat[j] == txt[s + j])
            j--;
        if (j < 0)
        {
            // printf("pattern occurs at shift = %d\n", s);
            s += (s + m < n) ? m - badchar[txt[s + m]] : 1;
        }
        else
            s += max(1, j - badchar[txt[s + j]]);
    }
}

// get object array from javascript

// int arrayIndexOf(char *arr, char *value_selected, int arr_length, int key_length)
// {
//     char *a;
//     int id = 0;
//     int id_found = -1;
//     int len = strlen(value_selected);

//     strtok(arr, "\"");

//     do
//     {

//         a = strtok(NULL, "{,\"}");
//         if (memcmp(a, value_selected, len) == 0)
//         {
//             id_found = id;
//         }
//         id++;

//     } while (memcmp(a, value_selected, len) != 0 && id < arr_length * key_length * 3);

//     // if (id_found >= 0) {
//     //     return id_found / key_length / 3;
//     // } else {
//     //     return -1;
//     // }
//     return id;

//     free(value_selected);
//     free(arr);
// }

// vector<string> key;
// int value_id = 0;
// typedef map<pair<int, string>, string> obj_type;
// obj_type obj;
// int *len;

// void getObjectFromJS(char *obj_arr, int array_length, int object_length)
// {
//     char *a;
//     char *key;
//     // printf("%s\n", obj_arr);
//     strtok(obj_arr, "\"");
//     for (int i = 0; i < array_length; i++)
//     {
//         for (int j = 0; j < object_length * 2; j++)
//         {
//             a = strtok(NULL, "{,\":}");
//             if (j % 2 == 0)
//                 key = a; //key
//             if (j % 2 == 1)
//             {
//                 obj[make_pair(i, key)] = a; //value
//             }
//         }
//     }
//     free(obj_arr);
// }

int arrayIndexOf(char *arr, char *value)
{
    // int id_found;
    // int count;

    // for (int i = 0; i < array_length; i++)
    // {
    //     for (int j = 0; j < object_length; j++)
    //     {
    //         if (boost::iequals(obj[make_pair(i, key_2)], value))
    //         {
    //             id_found = value_id;
    //             // break;
    //         }
    //         count++;
    //     }
    // }
    // return count;
    // printf("%s\n", arr);
    search(arr, value);

    return 0;
}
}
