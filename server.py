from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask( __name__ )

@app.route("/", methods=['POST', 'GET'])
def index():
	conn = sqlite3.connect('data.db')
	
	if request.method == 'POST':
		result = request.form

		if 'price-order' in result.keys(): #foi enviado o form de filtro de preços
			min_price = result['min-price']
			max_price = result['max-price']
			price_order = result['price-order']

			if price_order == 'Menor preço':
				cursor = conn.execute("SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY price ASC", (min_price, max_price))
			elif price_order == 'Maior preço':
				cursor = conn.execute("SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY price DESC", (min_price, max_price))
			else:
				cursor = conn.execute("SELECT * FROM products WHERE price BETWEEN ? AND ?", (min_price, max_price))

			products = cursor.fetchall()
			return render_template("index.html", products=products)
		else: #foi enviado o form de login
			cursor = conn.execute("SELECT * FROM products")
			products = cursor.fetchall()
			return render_template("index.html", products=products, result=result)
	else:
		cursor = conn.execute("SELECT * FROM products")
		products = cursor.fetchall()
		return render_template("index.html", products=products)

	conn.close()

@app.route("/checkout")
def checkout():
	return render_template("checkout.html")

@app.route("/summary", methods=['POST', 'GET'])
def summary():
	if request.method == 'POST':
		result = request.form
		return render_template("summary.html", result=result)

app.run(debug = True)