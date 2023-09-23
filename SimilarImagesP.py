import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
from DeepImageSearch import Index, LoadData, SearchImage

# All Images paths add here
code = "data/"
image_list = LoadData().from_folder(folder_list=['data/'])
Index(image_list+image_list).Start()

# print("\n ******in SimilarImages file******** \n")
# Functions

# for i in image_list:
#     print(i)


def getSimilarImages(lst, n=6):
    result = {}
    for no, img in lst.items():
        print(f'\n no = {no} and imgNmae = {img}\n')
        indx = image_list.index(f'{code}{img}')
        imgLst = SearchImage().get_similar_images(
            image_path=image_list[indx], number_of_images=5)
        result[img] = imgLst
    return result


# for i in image_list:
#     print(i)

print(len(image_list))
a = SearchImage().get_similar_images(
    image_path=image_list[0], number_of_images=5)
print(a)
