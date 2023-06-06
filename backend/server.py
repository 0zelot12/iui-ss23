from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/process", methods=["POST"])
def process():
    # TODO: Process image data from the request
    return jsonify(
        [
            {"classification": "A", "hasError": False},
            {"classification": "B", "hasError": False},
            {"classification": "C", "hasError": False},
            {"classification": "D", "hasError": False},
        ]
    )
