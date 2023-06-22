from flask import Flask, request, jsonify
from flask_cors import CORS

from skeletion_detection import convert_input_pic
from svm_training import load_model

import base64
import random

from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)

MOCK_RESULTS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]

classifier = load_model()

@app.route("/process", methods=["POST"])
def process():
    base64_image = request.json["image"]["data"]
    base64_image_without_header = base64_image.split(",")[-1]
    image_data = base64.b64decode(base64_image_without_header)
    png_image = Image.open(BytesIO(image_data))
    landmarks = convert_input_pic(png_image)

    if len(landmarks) == 0:
        return jsonify({"classification": None, "error": "NO_LANDMARKS"})
    
    # prediction = classifier.predict(landmarks)
    # print(prediction)

    random.shuffle(MOCK_RESULTS)

    return jsonify({"classification": MOCK_RESULTS[0], "error": None})
