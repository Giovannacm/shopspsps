from flask import Flask, render_template, request
import sqlite3

app = Flask( __name__ )

@app.route("/", methods=['POST', 'GET'])
def index():
	conn = sqlite3.connect('data.db')
	cursor = conn.execute("""SELECT * FROM products""")
	products = cursor.fetchall()

	if request.method == 'POST':
		result = request.form
		return render_template("index.html", products=products, result=result)
	else:
		return render_template("index.html", products=products)

@app.route("/checkout")
def checkout():
	return render_template("checkout.html")

@app.route("/summary", methods=['POST', 'GET'])
def summary():
	if request.method == 'POST':
		result = request.form
		return render_template("summary.html", result=result)

app.run(debug = True)