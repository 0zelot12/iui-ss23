import pandas as pd
from sklearn import model_selection
import sklearn.svm
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import joblib
import pickle


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

def load_model():
    filename = 'model.pickle'
    loaded_model = pickle.load(open(filename, "rb"))
    return loaded_model

def save_model(svm_classifier):
    filename = 'model.pickle'
    pickle.dump(svm_classifier, open(filename, "wb"))
