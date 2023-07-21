from flask import Flask, jsonify, send_from_directory

#app = Flask(__name__)
app = Flask(__name__)

#static_folder = 'bau/p2'

@app.route('/')
def index():
    return send_from_directory(static_folder,'index.html')

@app.route('/welcome')
def welcome():
    return jsonify(message='Hello, Flask!')

if __name__ == '__main__':
    app.run(port = 6001)
