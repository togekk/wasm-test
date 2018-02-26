#include <stdio.h>
#include <emscripten.h>

extern "C" {

int loaded_count = 0;
int total = 8;

void onload(unsigned handle, void *userData, void *data, unsigned size)
{
    printf("Loading Complete.\n");
    loaded_count++;
    float a = loaded_count / total * 100;
    printf("%f %f\n", loaded_count / total, a);
}
void onerror(unsigned handle, void *userData, int status, const char *message)
{
    printf("Error!\n");
}
void onprogress(unsigned handle, void *userData, int loaded, int total)
{
    printf("Loading...\n");
}
int main()
{
    char **a;
    a[0] = "https://c1.staticflickr.com/1/425/31987276322_e2c3ca8f08_o.jpg";
    a[1] = "https://c1.staticflickr.com/1/500/31292096464_7fff3afb91_o.jpg";
    a[2] = "https://c1.staticflickr.com/1/639/31984481622_21f64c3316_o.jpg";
    a[3] = "https://c1.staticflickr.com/1/290/32014565831_c5018c88be_o.jpg";
    a[4] = "https://c1.staticflickr.com/1/452/32133092055_083747ced8_o.jpg";
    a[5] = "https://c1.staticflickr.com/5/4684/39527614922_75b92e933d_o.jpg";
    a[6] = "https://c1.staticflickr.com/5/4680/24689695907_ec4e59abfe_o.jpg";
    a[7] = "https://c1.staticflickr.com/5/4737/24689707587_5469905292_o.jpg";
    for (int i = 0; i < total; i++)
        emscripten_async_wget2_data(a[i], "GET", "", NULL, 1, onload, onerror, onprogress);
    return 0;
}
}