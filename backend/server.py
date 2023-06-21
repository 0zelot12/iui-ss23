from flask import Flask, request, jsonify
from flask_cors import CORS

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


@app.route("/process", methods=["POST"])
def process():
    # TODO: Process image data from the request
    base64_image = request.json["image"]["data"]
    base64_image_without_header = base64_image.split(",")[-1]
    image_data = base64.b64decode(base64_image_without_header)
    # png_image = Image.open(BytesIO(image_data))
    # png_image.show()

    random.shuffle(MOCK_RESULTS)

    return jsonify({"classification": MOCK_RESULTS[0], "hasError": False})
