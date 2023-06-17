
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.datasets import make_moons, make_circles, make_classification
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.gaussian_process.kernels import RBF
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.inspection import DecisionBoundaryDisplay

names = [
    "Nearest Neighbors",
    "Linear SVM",
    "RBF SVM",
    #"Gaussian Process",
    "Decision Tree",
    "Random Forest",
    "Neural Net",
    "AdaBoost",
    "Naive Bayes",
    "QDA",
]

classifiers = [
    KNeighborsClassifier(3),
    SVC(kernel="linear", C=0.025),
    SVC(gamma=2, C=1),
    #GaussianProcessClassifier(1.0 * RBF(1.0)),
    DecisionTreeClassifier(max_depth=5),
    RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
    MLPClassifier(alpha=1, max_iter=1000),
    AdaBoostClassifier(),
    GaussianNB(),
    QuadraticDiscriminantAnalysis(),
]

landmark_data = pd.read_csv("../Data/landmark_data.csv")
array = landmark_data.values
X = array[:,1:]
Y = array[:,0]


X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=26)
test_scores = []
train_scores = []
# iterate over classifiers
for name, clf in zip(names, classifiers):
    print(name)
    clf = make_pipeline(StandardScaler(), clf)
    clf.fit(X_train, y_train)
    test_scores.append(clf.score(X_test, y_test))
    train_scores.append(clf.score(X_train, y_train))

#ser = pd.Series([train_scores, test_scores], index=names)
df = pd.DataFrame([train_scores, test_scores], index = ["train", "test"], columns=names)
print(df)
df.to_csv("../Data/comparison_of_models.csv")