function selected(object) {
	let active = document.querySelector('.category-selected');
	if(active != null)
		active.classList.remove('category-selected');

	object.classList.add('category-selected');

	filterproducts(object.id);
}

function loadcart(products) {
	let items = document.querySelector('#cart-items');
	items.innerHTML = "";

	for(var i=0 ; i<products.length ; i++) {
		let div = document.createElement('div');
		div.id = 'item-' + products[i].id;
		items.appendChild(div);

		let p = document.createElement('p');
		p.className = 'item-category';
		let category = document.createTextNode(products[i].category);
    	p.appendChild(category);
    	div.appendChild(p);

    	let img = document.createElement('img');
        img.src = products[i].img;
        div.appendChild(img);

        let h1 = document.createElement('h1');
		let name = document.createTextNode(products[i].name + " - R$" + products[i].price);
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
		img.src = "icons/more.png";
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
		img.src = "icons/less.png";
    	a.appendChild(img);
    	buttons.appendChild(a);

    	div.appendChild(buttons);
	}
}

function filterproducts(category) {
	let items = document.getElementById('items').getElementsByTagName('div');

	for(var i=0; i< items.length; i++ )
	{
		let child = items[i];
	 	
	 	if(child.id == category)
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

function filtervisibility() {
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

		for(var i = categories.length - 1; i >= 0; --i)
		{
			categories[i].innerHTML = "";
			a[i].classList.add("category-close");
		}
	}
}

function loadDeliveryInfo() {
    var val = document.querySelector('#delivery-method').value;
    var opts = document.querySelector('#delivery-methods').childNodes;
    var p = document.querySelector('#delivery-info');

    for(var i = 0; i < opts.length; i++) {
     	if (val === 'Transportadora') {
        	p.innerHTML = 'Prazo para entrega: ' + (Math.floor(Math.random() * 8) + 2) + ' dias.';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	} 
      	else if (val === 'Correios') {
        	p.innerHTML = 'Prazo para entrega: ' + (Math.floor(Math.random() * 8) + 2) + ' dias.';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
      	else if (val === 'Retirar na loja') {
        	p.innerHTML = 'Retirar no endereço: Rua Bosque Florido, 960, Pirapozinho - São Paulo em: ' + (Math.floor(Math.random() * 8) + 2) + ' dias.';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
    }

    if(val == '') {
    	p.classList.add('invisible');
    	p.classList.remove('visible');
    }
}

function loadPaymentInfo() {
    var val = document.querySelector('#payment-method').value;
    var opts = document.querySelector('#payment-methods').childNodes;
    var p = document.querySelector('#payment-info');

    for(var i = 0; i < opts.length; i++) {
     	if (val === 'Dinheiro') {
        	p.innerHTML = 'Disponível apenas para retirada na loja!';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	} 
      	else if (val === 'Cartão de crédito') {
        	p.innerHTML = 'Disponível apenas para retirada na loja!';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
      	else if (val === 'Cartão de débito') {
        	p.innerHTML = 'Disponível apenas para retirada na loja!';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
      	else if (val === 'Depósito') {
        	p.innerHTML = 'Depositar em: AGÊNCIA: 0123 | CONTA: 12345-5';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
      	else if (val === 'Transferência') {
        	p.innerHTML = 'Transferir em: AGÊNCIA: 0123 | CONTA: 12345-5';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
      	else if (val === 'Pix') {
        	p.innerHTML = 'Pix para: CNPJ: 12.123.123/0001-13';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	}
    }

    if(val == '') {
    	p.classList.add('invisible');
    	p.classList.remove('visible');
    }
}

window.onload = function(e) {
	console.log(carrinho);
}