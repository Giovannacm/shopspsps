from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3


app = Flask( __name__ )
app.secret_key = 'random string'


@app.route("/", methods=['POST', 'GET'])
def index():
	conn = sqlite3.connect('data.db')
	
	if request.method == 'POST':
		result = request.form

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
		conn.close()

		if 'user' in session:
			return render_template("index.html", products=products, username=session['user'][0][1]) #user name
	else:
		cursor = conn.execute("SELECT * FROM products")
		products = cursor.fetchall()
		conn.close()

		if 'user' in session:
			return render_template("index.html", products=products, username=session['user'][0][1]) #user name
	
	return render_template("index.html", products=products)


@app.route("/login", methods=['POST', 'GET'])
def login():
	conn = sqlite3.connect('data.db')
	
	if request.method == 'POST':
		email = request.form.get('email')
		password = request.form.get('password')
		
		cursor = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
		user = cursor.fetchall()

		if len(user) == 0:
			error = "Email ou senha inválidos!"

			cursor = conn.execute("SELECT * FROM products")
			products = cursor.fetchall()

			conn.close()

			return render_template("index.html", products=products, error=error)
		else:
			session['user'] = user
		
	conn.close()

	return redirect(url_for('index'))
	

@app.route('/logout')
def logout() :
	session.pop('user', None)

	return redirect(url_for('index'))


@app.route("/sign_up", methods=['POST', 'GET'])
def sign_up():
	conn = sqlite3.connect('data.db')

	if request.method == 'POST':
		email = request.form.get('email')
		password = request.form.get('password')
		name = request.form.get('name')
		cpf = request.form.get('cpf')
		birthday = request.form.get('birthday')
		phone = request.form.get('phone')

		cursor = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
		user = cursor.fetchall()

		if len(user) == 0: #se não tem ninguem com mesmo e-mail e senha, insere no banco, seleciona essa pessoa para colocar na sessão
			conn.execute("""INSERT INTO users (name, email, password, cpf, birthday, phone) VALUES (?, ?, ?, ?, ?, ?);""", (name, email, password, cpf, birthday, phone))
			conn.commit()

			cursor = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
			user = cursor.fetchall()

		session['user'] = user
	
	conn.close()

	return redirect(url_for('index'))


@app.route("/checkout")
def checkout():
	if 'user' in session:
		conn = sqlite3.connect('data.db')

		cursor = conn.execute("SELECT * FROM adresses WHERE user_id = ?", (session['user'][0][0],)) #user id
		address = cursor.fetchall()

		conn.close()
	
		if len(address) != 0:
			return render_template("checkout.html", user=session['user'][0], address=address)
		else:
			return render_template("checkout.html", user=session['user'][0])
	return render_template("checkout.html")


@app.route("/summary", methods=['POST', 'GET'])
def summary():
	conn = sqlite3.connect('data.db')

	if request.method == 'POST':
		result = request.form

		if not 'user' in session: #se o usuario não esta na sessao, inserimos no banco de dados
			email = request.form.get('email')
			password = request.form.get('password')
			name = request.form.get('name')
			cpf = request.form.get('cpf')
			birthday = request.form.get('birthday')
			phone = request.form.get('phone')

			conn.execute("""INSERT INTO users (name, email, password, cpf, birthday, phone) VALUES (?, ?, ?, ?, ?, ?);""", (name, email, password, cpf, birthday, phone))
			conn.commit()

			cursor = conn.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
			user = cursor.fetchall()

			session['user'] = user

		address = request.form.get('address')
		number = request.form.get('number')
		complement = request.form.get('complement')
		district = request.form.get('district')
		city = request.form.get('city')
		state = request.form.get('state')
		cep = request.form.get('cep')

		cursor = conn.execute("SELECT * FROM adresses WHERE address = ? AND a_number = ? AND user_id = ?", (address, number, session['user'][0][0]))
		address_r = cursor.fetchall()

		if len(address_r) == 0:
			conn.execute("""INSERT INTO adresses (user_id, address, a_number, complement, district, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?);""", (session['user'][0][0], address, number, complement, district, city, state, cep)) #user id
			conn.commit()
			
		conn.close()

		return render_template("summary.html", result=result)


@app.route("/confirm", methods=['POST', 'GET'])
def confirm():
	#quando o usuario clicar no botão confirmar pedido, criar a tabela do pedido com os atributos e, para cada pedido, criar as linhas na order_products
	
	return redirect(url_for('index'))

app.run(debug = True)