# Converts the given image into a tiled image

import cv2
import sys
import numpy as np

import os

print("Reading image...", sys.argv[1])

img_path = sys.argv[1]
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)


based_folder = sys.argv[2]
tile_size = 32

for row in range(0, img.shape[0], tile_size):
    for col in range(0, img.shape[1], tile_size):
        tile = img[row:row+tile_size, col:col+tile_size]
        cv2.imwrite(f"{based_folder}/{row}_{col}.png", tile)


# cv2.waitKey(0)