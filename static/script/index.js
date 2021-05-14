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

function loadproducts(products) {
	let items = document.querySelector('#items');
	items.innerHTML = "";

	for(var i=0 ; i<products.length ; i++) {
		let div = document.createElement('div');
		div.id = 'item-' + products[i].id;
		div.className = 'item';
		div.classList.add('visible');
		items.appendChild(div);

		let p = document.createElement('p');
		p.className = 'item-category';
		let category = document.createTextNode(products[i].category);
    	p.appendChild(category);
    	div.appendChild(p);

    	let img = document.createElement('img');
        img.src = "static/" + products[i].img;
        div.appendChild(img);

        let h1 = document.createElement('h1');
		let name = document.createTextNode(products[i].name + " - R$" + products[i].price.toFixed(2));
    	h1.appendChild(name);
    	div.appendChild(h1);

    	p = document.createElement('p');
		let description = document.createTextNode(products[i].description);
    	p.appendChild(description);
    	div.appendChild(p);

    	let buttons = document.createElement('div');
		buttons.id = 'buttons';

    	let a = document.createElement('a');
    	a.className = "more";
    	a.setAttribute('onclick',`addproduct(${products[i].id})`);
    	img = document.createElement('img');
		img.src = "static/icons/more.png";
    	a.appendChild(img);
    	buttons.appendChild(a);

    	p = document.createElement('p');
    	p.innerHTML = "0";
    	p.id = 'cont-item-' + products[i].id;
    	buttons.appendChild(p);

    	a = document.createElement('a');
    	a.className = "less";
    	a.setAttribute('onclick',`removeproduct(${products[i].id})`);
    	img = document.createElement('img');
		img.src = "static/icons/less.png";
    	a.appendChild(img);
    	buttons.appendChild(a);

    	div.appendChild(buttons);
	}
}

function filterproducts(category) {
	let items = document.querySelector('#items');

	for(var child=items.firstChild; child!==null; child=child.nextSibling) {
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

function filtervisibility() { //usa categorias de data.js
	let menu = document.querySelector('#menu');
	let info = document.querySelector('#info');
	let categories = menu.getElementsByTagName('p');
	let container = document.querySelector('.container');
	let a = menu.getElementsByTagName('a');
	let items = document.querySelector('#items');

	if(menu.className == "close") {
		container.style["grid-template-columns"] = "10vw 10vw 80vw";
		info.className = "open";
		menu.className = "open";
		info.innerHTML = "Desenvolvido por: Álvaro, Giovanna e Marcelo.";
		items.style.width = "75vw";
		items.style.transition = "width 0s";

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
		info.innerHTML = "";
		items.style.width = "85vw";
		items.style.transition = "width 0.1s linear 0.1s";

		for(var i = categories.length - 1; i >= 0; --i)
		{
			categories[i].innerHTML = "";
			a[i].classList.add("category-close");
		}
	}
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

window.onload = function(e) {
	loadproducts(produtos, false);
}