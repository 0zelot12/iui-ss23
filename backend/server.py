from flask import Flask

app = Flask(__name__)


@app.route("/process")
def process():
    return "<h1>Processing image</h1>"
