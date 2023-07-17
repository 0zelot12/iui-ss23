import pandas as pd
from sklearn import model_selection
import sklearn.svm
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import cv2
import mediapipe as mp
import pandas as pd
import glob
import os
from csv import writer

import numpy as np
import joblib
import pickle

# returns the model
def load_model():
    filename = 'model.pickle'
    loaded_model = pickle.load(open(filename, "rb"))
    return loaded_model

# saves a given model
def save_model(svm_classifier):
    filename = 'model.pickle'
    pickle.dump(svm_classifier, open(filename, "wb"))

# final function used for trainign of the final model
def save_and_train_model():
    landmark_data = pd.read_csv("../Data/landmark_data.csv")
    array = landmark_data.values
    X = array[:, 1:]
    Y = array[:, 0]
    X_train, X_test, y_train, y_test = model_selection.train_test_split(X, Y, test_size=0.25, random_state=26)
    real_data = pd.read_csv("../Data/landmark_data_realDataSet.csv")
    array_real = real_data.values
    X_real = array_real[:, 1:]
    Y_real = array_real[:, 0]
    X_train_real, X_test_real, y_train_real, y_test_real = model_selection.train_test_split(X_real, Y_real, test_size=0.25,
                                                                            random_state=26)
    X_train = np.vstack((X_train, X_train_real))
    y_train = np.hstack((y_train, y_train_real))
    X_test = np.vstack((X_test, X_test_real))
    y_test = np.hstack((y_test, y_test_real))
    classifier = KNeighborsClassifier(n_neighbors=1, algorithm="auto", weights="distance", p=2)
    classifier.fit(X_train, y_train)
    save_model(classifier)

# just some testing stuff (only for trying out abit)
def test_func():
    landmark_data = pd.read_csv("../Data/landmark_data.csv")
    array = landmark_data.values
    X = array[:,1:]
    Y = array[:,0]

    X_train, X_test, Y_train, Y_test = model_selection.train_test_split(X, Y, test_size=0.25, random_state=26)
    print("test Shapes: ", X_test.shape, Y_test.shape)
    print("train Shapes: ", X_train.shape, Y_train.shape)

    svm_lin_classifier = sklearn.svm.SVC(gamma=0.001, kernel="linear")
    svm_lin_classifier.fit(X_train, Y_train)
    #predicted = svm_lin_classifier.predict(X_test)
    print("Score for scm Lin train: ",svm_lin_classifier.score(X_train, Y_train))
    print("Score for scm Lin test: ", svm_lin_classifier.score(X_test, Y_test))

    svm_classifier = sklearn.svm.SVC(gamma=3, C=1)
    svm_classifier.fit(X_train, Y_train)
    print("Score for scm train: ",svm_classifier.score(X_train, Y_train))
    print("Score for scm test: ", svm_classifier.score(X_test, Y_test))

    knn_classifier = KNeighborsClassifier(3)
    knn_classifier.fit(X_train, Y_train)
    print("Score for knn train: ",knn_classifier.score(X_train, Y_train))
    print("Score for knn test: ", knn_classifier.score(X_test, Y_test))
