from flask import Flask, flash, request, session, redirect, url_for, render_template
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'sdfhjwk5hj34k5hkjdh drt vdflfs;'
app.permanent_session_lifetime = timedelta(days=10)

@app.route("/login",methods=["POST","GET"])
def login():
    if request.method == 'POST':
        username = request.form['username']
        session['username'] = username
        session.permanent = True
        flash(f'Login successful!','info')
        return redirect(url_for('user'))
    elif 'username' in session:
        flash(f'Already logged in!','info')
        return redirect(url_for('user'))
    else:
        return render_template('i6login.html')

@app.route("/logout")
def logout():
    if "username" in session:
        username = session['username']
        #print(username)
        flash(f'{username} logged out!','info')
    session.pop('username',None)
    return redirect(url_for('login'))

@app.route("/")
@app.route("/user")
def user():
    if "username" in session:
        username = session['username']
        # return f"<h1>{username}</h1>"
        return render_template('i6user.html',username=username)
    else:
        flash(f'You are not logged in!','info')
        return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True, port=6001)





