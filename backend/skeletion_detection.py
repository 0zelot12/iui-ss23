import numpy as np
import cv2
import mediapipe as mp
import pandas as pd
import glob
import os
from csv import writer
#from typing import NoneType

#function that writes a csv with all the lanmark image data and saves the image with printed landmarks
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

#function that writes a csv with all the lanmark-vectors
def get_labels_vectors(filepath):
    with open('../Data/landmark_data2.csv', 'a') as f_object:

        writer_object = writer(f_object)
        #directory = '../Data/archive/dataset5/C/d'     #You can choose between these two lines to either go ll
        for directory in glob.glob(filepath):           #through all directorys or solect one (i dit it until d)
            name = str(directory[-1])
            print(name)
            for file in glob.glob(directory + '/color_*.png'):
                pic = cv2.imread(file)
                skel_landmarks=detect_skeleton(pic)
                #print(skel_landmarks)
                if skel_landmarks is not None:
                    #print("not null")
                    skel_landmarks = skel_landmarks[0]
                    skel_landmarks = normalise_handlandmarks(skel_landmarks)
                    landmark_list = []
                    landmark_list.append(name)
                    for akt_mark in skel_landmarks.landmark:
                        landmark_list.append(akt_mark.x)
                        landmark_list.append(akt_mark.y)
                        landmark_list.append(akt_mark.z)
                    writer_object.writerow(landmark_list)
                    #print("landmarks detected for ", name)
        f_object.close()

# returns the landmark-vektor for an input picture
def build_pic_vector(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (15982, 1))
    return img[0]

# draws the detected skeleton into a picture (for display purposes)
def return_skeleton_pic(frame):
    #frame = pil_to_cv(frame)
    mp_hands = mp.solutions.hands
    mp_drawing_utils = mp.solutions.drawing_utils
    frame_overwritten = frame.copy()
    landmarks = detect_skeleton(frame)
    for hand_landmarks in landmarks:
        mp_drawing_utils.draw_landmarks(frame_overwritten, hand_landmarks,mp_hands.HAND_CONNECTIONS)

    return frame_overwritten

# detects the landmarks of the hand-skeleton in a picture
def detect_skeleton(frame):
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=True)
    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    return results.multi_hand_landmarks

# normalizes the given landmarks (wrist is origin)
def normalise_handlandmarks(landmark):
    ctr = 0
    for hand_point in landmark.landmark:
        if ctr == 0:
            wrist_landmark_x = hand_point.x
            wrist_landmark_y = hand_point.y
            wrist_landmark_z = hand_point.z
            hand_point.x = 0
            hand_point.y = 0
            hand_point.z = 0
        else:
            hand_point.x = hand_point.x - wrist_landmark_x
            hand_point.y = hand_point.y - wrist_landmark_y
            hand_point.z = hand_point.z - wrist_landmark_z
        ctr = ctr +1
    return landmark

# returns the picture in the right datatype
def preprocess_image(x):
    x = x.reshape(28, 28)  # convertin it into 28 x 28 image
    x = x.astype(np.uint8)
    x = cv2.cvtColor(x, cv2.COLOR_GRAY2BGR)
    return x

# preprocessing function for input pictures of the frontend
def pil_to_cv(img):
    nimg = np.array(img)
    return cv2.cvtColor(nimg, cv2.COLOR_RGB2BGR)

# whole detection function for the frontend
def convert_input_pic(image):
    img = pil_to_cv(image)
    resized_img = cv2.resize(img, (122, 132))
    skel_landmarks = detect_skeleton(resized_img)
    if skel_landmarks is None:
        return []
    else:
        skel_landmarks = skel_landmarks[0]
        skel_landmarks = normalise_handlandmarks(skel_landmarks)
        landmark_list = []
        for akt_mark in skel_landmarks.landmark:
            landmark_list.append(akt_mark.x)
            landmark_list.append(akt_mark.y)
            landmark_list.append(akt_mark.z)
        return landmark_list

