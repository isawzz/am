from flask import Flask, render_template, redirect, url_for 

app = Flask(__name__)

@app.route('/')
@app.route('/<name>')
def index(name='amanda'):
    return render_template('i2a.html',content=name,p=25)

@app.route('/num/<n>')
def show_num(n):
    #print(int(n))
    return n
    #render_template('i2b.html',num=int(n))

@app.route('/num2/<n>')
def show_num2(n):
    return render_template('i2b.html',num=int(n))

if __name__ == "__main__":
    app.run(port=6001,debug=True)

















