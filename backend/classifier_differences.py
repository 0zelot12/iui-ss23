
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import plotly
from plotly.subplots import make_subplots
import csv
import seaborn as sns
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


# function to record results for different models
def write_csv_for_different_classifiers_performance():
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

# function to record results for different parameters used in the training of the KNN
def write_csv_for_different_parameter_performance_knn():
    with open('../Data/knn_param_test.csv', 'w', newline='') as csvfile:
        fieldnames = ['neighbours', 'weight', 'algorithm', 'p', 'data', 'success Rate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        algorithm = ['auto', 'ball_tree', 'kd_tree', 'brute']
        p = [1,2]
        neighbours = range(1,5,1)
        weights = ['uniform', 'distance']
        landmark_data = pd.read_csv("../Data/landmark_data.csv")
        array = landmark_data.values
        X = array[:,1:]
        Y = array[:,0]
        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=26)
        real_data = pd.read_csv("../Data/landmark_data_realDataSet.csv")
        array_real = real_data.values
        X_real = array_real[:, 1:]
        Y_real = array_real[:, 0]
        X_train_real, X_test_real, y_train_real, y_test_real = train_test_split(X_real, Y_real, test_size=0.25,
                                                                                random_state=26)
        X_train = np.vstack((X_train, X_train_real))
        y_train = np.hstack((y_train, y_train_real))
        X_test = np.vstack((X_test, X_test_real))
        y_test = np.hstack((y_test, y_test_real))
        # iterate over classifiers
        for a in algorithm:
            for w in weights:
                for aktP in p:
                    for n in neighbours:
                        print(a)
                        clf = KNeighborsClassifier(n_neighbors=n, algorithm=a, weights=w, p=aktP)
                        clf.fit(X_train, y_train)
                        writer.writerow({'neighbours': n, 'weight': w, 'algorithm': a, 'p': aktP, 'data': 'train',
                                         'success Rate': clf.score(X_train, y_train)})
                        writer.writerow({'neighbours': n, 'weight': w, 'algorithm': a, 'p': aktP, 'data': 'test',
                                         'success Rate': clf.score(X_test, y_test)})
        #ser = pd.Series([train_scores, test_scores], index=names)

    csvfile.close()

# function to record results for different parameters used in the training of the SVM
def write_csv_for_different_parameter_performance_svm():
    with open('../Data/svm_param_test.csv', 'w', newline='') as csvfile:
        fieldnames = ['kernel', 'C', 'degree', 'gamma', 'data', 'success Rate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        kernel = ['linear', 'poly', 'rbf', 'sigmoid']
        C = np.arange(0.1,1,0.1)
        degree = range(0,3,1)
        gamma = ['auto', 'scale']
        landmark_data = pd.read_csv("../Data/landmark_data.csv")
        array = landmark_data.values
        X = array[:,1:]
        Y = array[:,0]
        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=26)
        real_data = pd.read_csv("../Data/landmark_data_realDataSet.csv")
        array_real = real_data.values
        X_real = array_real[:, 1:]
        Y_real = array_real[:, 0]
        X_train_real, X_test_real, y_train_real, y_test_real = train_test_split(X_real, Y_real, test_size=0.25, random_state=26)
        X_train = np.vstack((X_train,X_train_real))
        y_train = np.hstack((y_train, y_train_real))
        X_test = np.vstack((X_test, X_test_real))
        y_test = np.hstack((y_test, y_test_real))
        # iterate over classifiers
        for k in kernel:
            for g in gamma:
                for aktC in C:
                    for d in degree:
                        print(k)
                        clf = SVC(kernel=k, gamma=g, C=aktC, degree=d)
                        clf.fit(X_train, y_train)
                        writer.writerow({'kernel': k, 'gamma': g, 'C': aktC, 'degree': d, 'data': 'train',
                                         'success Rate': clf.score(X_train, y_train)})
                        writer.writerow({'kernel': k, 'gamma': g, 'C': aktC, 'degree': d, 'data': 'test',
                                         'success Rate': clf.score(X_test, y_test)})
        #ser = pd.Series([train_scores, test_scores], index=names)

    csvfile.close()

# plotting function for the comparison of the models
def plot_csv():
    data = pd.read_csv("../Data/comparison_of_models.csv")
    data = data.T
    data = data.rename(columns={0:"Success-Rate for Train Data", 1:"Success-Rate for Test Data"})
    data = data.drop(["Unnamed: 0"])

    data['training Method'] = data.index
    data1 = data.loc[:,["training Method", "Success-Rate for Train Data"]]
    data2 = data.loc[:,["training Method", "Success-Rate for Test Data"]]
    data1["Used Data"] ="Train Data"
    data2["Used Data"] ="Test Data"
    data1 = data1.rename(columns={"Success-Rate for Train Data": "Success-Rate"}, errors="raise")
    data2 = data2.rename(columns={"Success-Rate for Test Data": "Success-Rate"}, errors="raise")
    data_list = [data1, data2]

    data = pd.concat(data_list)
    print(data)
    plt.figure(figsize=(17,5))
    ax = sns.barplot(data, y="training Method", x = "Success-Rate", hue="Used Data", edgecolor = "black", palette = sns.color_palette("Set2"))
    sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))
    ax.bar_label(ax.containers[0], size =10, padding =3)
    ax.grid(True)
    #ax.set_xlim(0,8000000)
    plt.title('Success Rate for different training Methods')
    sns.despine()
    plt.tight_layout()
    plt.show()

# plotting function for the different parameters in the training of the models
def plot_param_tests():
    knn_test = pd.read_csv('../Data/knn_param_test.csv')
    svm_test = pd.read_csv('../Data/svm_param_test.csv')

    knn_test["data_nr"]=knn_test["data"]
    svm_test["data_nr"] = svm_test["data"]

    knn_test = knn_test.replace({'data_nr': {"train": 0,"test": 1}})
    svm_test = svm_test.replace({'data_nr': {"train": 0, "test": 1}})

    knn_test["success range"] = knn_test["success Rate"].round(2)
    svm_test["success range"] = svm_test["success Rate"].round(2)

    svm_test = svm_test[svm_test['success range'] > 0.4]
    svm_test = svm_test[svm_test['data'] == "test"]
    knn_test = knn_test[knn_test['data'] == "test"]

    my_dimensions1 = [
        {'label': 'neighbours', 'values': knn_test["neighbours"]},
        {"label": "weight", "values": knn_test["weight"]},
        {"label": "algorithm", "values": knn_test["algorithm"]},
        {"label": "p", "values": knn_test["p"]},
        {"label": "Success Rate", "values": knn_test["success range"]}]

    my_dimensions2 = [
        {'label': 'kernel', 'values': svm_test["kernel"]},
        {"label": "gamma", "values": svm_test["gamma"]},
        {"label": "C", "values": svm_test["C"]},
        {"label": "degree", "values": svm_test["degree"]},
        {"label": "Success Rate", "values": svm_test["success range"]}]

    color1 = [(x - knn_test['success range'].min()) / (knn_test['success range'].max() - knn_test['success range'].min()) for x in knn_test['success range']]
    colorscale1 = [[0.0, 'green'], [0.5, 'yellow'], [1.0, 'red']]
    color2 = [(x - svm_test['success range'].min()) / (svm_test['success range'].max() - svm_test['success range'].min()) for
        x in svm_test['success range']]
    colorscale2 = [[0.0, 'green'], [0.95, 'yellow'], [1.0, 'red']]

    fig = go.Figure(go.Parcats(dimensions=my_dimensions1, line={'color': color1, 'colorscale': colorscale1, 'shape': 'hspline'},
                   hoveron='color', hoverinfo='all'))
    fig.update_traces(dimensions=[{"categoryorder":"category descending"}], selector=dict(type='parcats'))
    fig.show()

    fig2 = go.Figure(go.Parcats(dimensions=my_dimensions2, line={'color': color2, 'colorscale': colorscale2, 'shape': 'hspline'},
                   hoveron='color', hoverinfo='all'))
    fig2.update_traces(dimensions=[{"categoryorder": "category descending"}], selector=dict(type='parcats'))
    fig2.show()

