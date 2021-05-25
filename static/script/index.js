var categorias = ["Ração", "Coleira", "Brinquedo", "Higiene", "Outros"];
var carrinho = [];

var input = document.querySelector('#input-search')
input.onkeypress = function(e){
	if (!e) 
		e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter')
    {
    	let active = document.querySelector('.category-selected');
		if(active != null)
			active.classList.remove('category-selected');

	    filterproducts(input.value);
    }
}

function selected(object) {
	let active = document.querySelector('.category-selected');
	if(active != null)
		active.classList.remove('category-selected');

	object.classList.add('category-selected');

	filterproducts(object.id);
}

function filterproducts(category) {
	let items = document.querySelector('#items');
	console.log(items.childNodes);

	for(var child=items.firstChild; child!==null; child=child.nextSibling) {
		if(child.nodeName == 'DIV') {
			let item_category = child.querySelector('.item-category').innerHTML;
			let h1 = child.getElementsByTagName('h1')[0].innerHTML;

			if(item_category.toLowerCase().includes(category.toLowerCase()) || h1.toLowerCase().includes(category.toLowerCase())) //Se está na categoria ou nome
			{
				child.classList.remove('invisible');
				child.classList.add('visible');
			}
			else
			{
				child.classList.remove('visible');
				child.classList.add('invisible');
			}
		}
	}
}

function filtervisibility() { //usa categorias de data.js
	let menu = document.querySelector('#menu');
	let menu_categories = menu.querySelector('#categories');
	let filter = menu.querySelector('#price-filter');
	let info = document.querySelector('#info');
	let categories = menu_categories.getElementsByTagName('p');
	let container = document.querySelector('.container');
	let a = menu.getElementsByTagName('a');
	let items = document.querySelector('#items');
	let login_div = document.querySelector('#login-div');

	if(menu.className == "close") {
		container.style["grid-template-columns"] = "10vw 10vw 80vw";
		info.className = "open";
		menu.className = "open";
		filter.className = "visible";
		info.innerHTML = "Desenvolvido por: Álvaro, Giovanna e Marcelo.";
		items.style.width = "75vw";
		items.style.transition = "width 0s";
		login_div.style.left = "20vw";

		for(var i = categories.length - 1; i >= 0; --i)
		{
			categories[i].innerHTML = categorias[i];
			a[i].classList.remove("category-close");
		}
	}
	else if(menu.className == "open") {
		container.style["grid-template-columns"] = "7vw 3vw 90vw";
		info.className = "close";
		menu.className = "close";
		filter.className = "invisible";
		info.innerHTML = "";
		items.style.width = "85vw";
		items.style.transition = "width 0.1s linear 0.1s";
		login_div.style.left = "10vw";

		for(var i = categories.length - 1; i >= 0; --i)
		{
			categories[i].innerHTML = "";
			a[i].classList.add("category-close");
		}
	}
}

function setMax(object) {
	let min_value = object.value;
	let max_price = document.querySelector('#max-price');

	if(min_value >= max_price.value) {
		max_price.value = min_value;
		let p_price = document.querySelector('#p-max-price');
		p_price.innerHTML = 'R$' + max_price.value;
	}
}

function setMin(object) {
	let max_value = object.value;
	let min_price = document.querySelector('#min-price');

	if(max_value <= min_price.value) {
		min_price.value = max_value;
		let p_price = document.querySelector('#p-min-price');
		p_price.innerHTML = 'R$' + min_price.value;
	}
}

function setPrice(object) {
	let id = object.id;
	let p_price = document.querySelector('#p-' + id);

	p_price.innerHTML = 'R$' + object.value;
}

function addproduct(id) { //usa carrinho e produtos de data.js
	let item = document.querySelector('#item-' + id);
	let p = item.querySelector('#cont-item-' + id);
	
	let cont = parseInt(p.innerHTML);

	if(cont < 99)
	{
		cont++;
		let incart = carrinho.find(object => object.product.id == id);

		if(incart == undefined)
		{
			let product = produtos.find(object => object.id == id);
			carrinho.push({quantity: 1, product: product});
		}
		else
		{
			incart.quantity++;
		}
	}

	p.innerHTML = cont.toString();

	let cont2 = document.querySelector('#cont-cart');
	let aux = 0;
	for(var i=0 ; i<carrinho.length ; i++) {
		aux += carrinho[i].quantity;
	}
	cont2.innerHTML = aux.toString();
}

function removeproduct(id) { //usa carrinho de data.js
	let item = document.querySelector('#item-' + id);
	let p = item.querySelector('#cont-item-' + id);

	let cont = parseInt(p.innerHTML);

	if(cont > 0)
	{
		cont--;
		let incart = carrinho.find(object => object.product.id == id);

		if(incart.quantity == 1)
		{
			let index = carrinho.indexOf(incart);

			if (index > -1) {
  				carrinho.splice(index, 1);
			}
		}
		else
		{
			incart.quantity--;
		}
	}

	p.innerHTML = cont.toString();

	let cont2 = document.querySelector('#cont-cart');
	let aux = 0;
	for(var i=0 ; i<carrinho.length ; i++) {
		aux += carrinho[i].quantity;
	}
	cont2.innerHTML = aux.toString();
}

function checkout(cart) { //usa carrinho de data.js
	let tosend = JSON.stringify(carrinho);
	sessionStorage.setItem('cart', tosend);
}

function login() {
	let div = document.querySelector('#login-div');
	
	if(div.className == 'invisible')
		div.className = 'visible';
	else
	{
		div.className = 'invisible';
		let register_div = div.querySelector('#register-div');
		register_div.innerHTML = '';
		let h3 = div.querySelector('#register-link');
		h3.setAttribute("onclick", "signUp()");
	}
}

function signUp() {
	let div = document.querySelector('#login-div');
	let form = div.querySelector('#form-user');
	form.action = "/sign_up";
	let h3 = form.querySelector('#register-link');
	h3.removeAttribute("onclick");
	let register_div = form.querySelector('#register-div');

	let label = document.createElement('label');
	label.innerHTML = 'Nome completo';
	let input = document.createElement("input");
	input.type = "text";
	input.name = "name";
	input.id = "name";
	input.required = true;
	label.appendChild(input);
	register_div.appendChild(label);

	label = document.createElement('label');
	label.innerHTML = 'CPF';
	input = document.createElement("input");
	input.type = "tel";
	input.name = "cpf";
	input.id = "cpf";
	input.required = true;
	input.placeholder = "Ex: 123.123.123-12"
	label.appendChild(input);
	register_div.appendChild(label);

	label = document.createElement('label');
	label.innerHTML = 'Data de nascimento (opcional)';
	input = document.createElement("input");
	input.type = "date";
	input.name = "birthday";
	input.id = "birthday";
	label.appendChild(input);
	register_div.appendChild(label);

	label = document.createElement('label');
	label.innerHTML = 'Telefone';
	input = document.createElement("input");
	input.type = "tel";
	input.name = "phone";
	input.id = "phone";
	input.required = true;
	input.placeholder = "Ex: (12) 1234-1234"
	label.appendChild(input);
	register_div.appendChild(label);
}