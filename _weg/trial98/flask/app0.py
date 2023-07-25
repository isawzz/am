from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "<h1>hallo app0</h1>"

if __name__ == "__main__":
    app.run(port=6001,debug=True)

















