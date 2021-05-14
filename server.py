from flask import Flask, render_template, request

app = Flask( __name__ )

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/checkout")
def checkout():
	return render_template("checkout.html")

@app.route("/summary", methods=['POST', 'GET'])
def summary():
	if request.method == 'POST':
		result = request.form
		return render_template("summary.html", result=result)

app.run(debug = True)