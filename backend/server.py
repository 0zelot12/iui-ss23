from flask import Flask, request, jsonify
from flask_cors import CORS

import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)


@app.route("/process", methods=["POST"])
def process():
    # TODO: Process image data from the request
    images = request.json["images"]
    for image in images:
        base64_image = image["data"]
        base64_image_without_header = base64_image.split(",")[-1]
        image_data = base64.b64decode(base64_image_without_header)
        png_image = Image.open(BytesIO(image_data))
        png_image.show()

    return jsonify(
        [
            {"classification": "A", "hasError": False},
            {"classification": "B", "hasError": False},
            {"classification": "C", "hasError": False},
            {"classification": "D", "hasError": False},
        ]
    )
