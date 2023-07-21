from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('i3a.html')
@app.route("/c")
def cpage():
    return render_template('i3c.html')


if __name__ == "__main__":
    app.run(debug=True, port=6001)





