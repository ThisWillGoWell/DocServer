from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route("/something", methods=["POST"])
def do_something():
    data = request.json
    return str(data)


if __name__ == '__main__':
    app.run()


