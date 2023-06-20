import numpy as np
import cv2
import mediapipe as mp
import pandas as pd
import glob
import os
from csv import writer


def get_labels_images(filepath):
    with open('../Data/archive_data.csv', 'a') as f_object:

        writer_object = writer(f_object)
        #directory = '../Data/archive/dataset5/C/d'     #You can choose between these two lines to either go ll
        for directory in glob.glob(filepath):           #through all directorys or solect one (i dit it until d)
            name = str(directory[-1])
            print(name)
            for file in glob.glob(directory + '/color_*.png'):
                #images.append(file)
                head,tail = os.path.split(file)
                #print(tail)
                pic = cv2.imread(file)
                try:
                    skel_pic=detect_skeleton(pic, name)
                    savepath = "../Data/skeleton_pics/" + name + "/"+ tail
                    cv2.imwrite(savepath, skel_pic)
                    skel_pic_vector = build_pic_vector(skel_pic)
                    skel_pic_vector = np.hstack((name,skel_pic_vector))
                    skel_pic_vector = skel_pic_vector.tolist()
                    #print(skel_pic_vector)
                    writer_object.writerow(skel_pic_vector)
                except :
                    print("no landmarks detected for ", name)

        f_object.close()

def build_pic_vector(img):
    #img = cv2.imread(file)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #print(img.shape)
    img = cv2.resize(img, (15982, 1))
    #img = img / 255.
    return img[0]


def detect_skeleton(frame, name):
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=True)
    mp_drawing_utils = mp.solutions.drawing_utils
    #frame_overwritten = frame.copy()
    #print(frame.shape)
    frame_overwritten = np.zeros(frame.shape, dtype=np.uint8)
    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    #print(results.multi_hand_landmarks)
    for hand_landmarks in results.multi_hand_landmarks:
        mp_drawing_utils.draw_landmarks(frame_overwritten, hand_landmarks,
                                           mp_hands.HAND_CONNECTIONS)


    #cv2.imshow("Result", frame_overwritten)
    #cv2.waitKey()
    return frame_overwritten


def preprocess_image(x):
    x = x.reshape(28, 28)  # convertin it into 28 x 28 image
    x = x.astype(np.uint8)
    x = cv2.cvtColor(x, cv2.COLOR_GRAY2BGR)
    #print(x)

    return x

#frame = cv2.imread("../Data/archive/dataset5/C/a/color_0_0004.png")
#frame = frame.astype(np.uint8)
#print(frame.shape)
#frame = cv2.cvtColor(frame, cv2.COLOR_BGR2BGR)
#detect_skeleton(frame)
#train_data = pd.read_csv("../Data/sign_mnist_train.csv")
#pic = preprocess_image(np.array(train_data.iloc[0,1:]))
#detect_skeleton(pic)

dataset_dir = os.path.abspath('../Data/archive/dataset5/C/*')
data_dict = get_labels_images(dataset_dir)

#cv2.imshow("test", pic)
#cv2.waitKey()
#cv2.imwrite("grayscale_from_mnist.jpg", pic)