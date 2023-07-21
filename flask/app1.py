from flask import Flask, render_template, redirect, url_for 

app = Flask(__name__)

@app.route('/')
def i1_func(): return render_template('i1.html')

@app.route('/<name>')
def user(name):
    return f'Hello {name}!'

@app.route('/admin')
def admin():
    return redirect(url_for('i1_func'))

@app.route('/adminhello')
def adminhello(): 
    r = url_for('user',name='Admin'); 
    return redirect(r)

if __name__ == "__main__":
    app.run(port=6001, debug=True)

















