from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    # Render the HTML template
    return render_template('test.html')

@app.route('/hallo/<path:filename>')
def serve_static(filename):
    # Serve static files from the 'static' directory
    return send_from_directory('hallo', filename)

if __name__ == '__main__':
    app.run(debug=True,port=6001)
