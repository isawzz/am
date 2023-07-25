from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('i1.html')
@app.route("/login",methods=["POST","GET"])
def login():
    if request.method == 'POST':
        username = request.form['username']
        return redirect(url_for('user',usr=username))
    else:
        return render_template('i4login.html')
@app.route("/<usr>")
def user(usr):
    return f"<h1>{usr}</h1>"

if __name__ == "__main__":
    app.run(debug=True, port=6001)





