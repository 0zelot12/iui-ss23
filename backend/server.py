from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np

from skeletion_detection import convert_input_pic
from svm_training import load_model

import base64

from PIL import Image
from io import BytesIO
import uuid

app = Flask(__name__)
CORS(app)

classifier = load_model()


@app.route("/process", methods=["POST"])
def process():
    base64_image = request.json["image"]["data"]
    base64_image_without_header = base64_image.split(",")[-1]
    image_data = base64.b64decode(base64_image_without_header)
    png_image = Image.open(BytesIO(image_data))
    landmarks = convert_input_pic(png_image)

    if len(landmarks) == 0:
        return jsonify({"id": None, "classification": None, "error": "NO_LANDMARKS"})

    prediction = classifier.predict(np.array(landmarks).reshape(1, -1))

    return jsonify({"id": uuid.uuid4(), "classification": prediction[0], "error": None})
