var cart = [];
let categorias = ["Compra", "Usuário", "Entrega", "Pagameto"];
let delivery_time;

function selected(object) {
	let active = document.querySelector('.category-selected');
	if(active != null)
		active.classList.remove('category-selected');

	object.classList.add('category-selected');

	filterproducts(object.id);
}

function gettotal(products) {
    let total = 0;
    for(var i=0 ; i<products.length ; i++)
        total += parseFloat(products[i].quantity) * parseFloat(products[i].product.price);

    return total;
}

function loadcart(products) {
    let items = document.querySelector('#cart-items')
    let table = items.getElementsByTagName('tbody')[0];

	for(var i=0 ; i<products.length ; i++) {
		let tr = document.createElement('tr');
		tr.id = 'item-' + products[i].product.id;
        table.appendChild(tr);

		let td = document.createElement('td');
        let p = document.createElement('p');
        let description = document.createTextNode(products[i].product.id);
        p.appendChild(description);
        td.appendChild(p);
        tr.appendChild(td);

        td = document.createElement('td');
        p = document.createElement('p');
        p.className = 'item-category';
        description = document.createTextNode(products[i].product.category);
        p.appendChild(description);
        td.appendChild(p);
        tr.appendChild(td);

        td = document.createElement('td');
        
        p = document.createElement('p');
        p.className = 'product';
        
        let img = document.createElement('img');
        img.src = "static/" + products[i].product.img; //voltando na pasta
        p.appendChild(img);
        tr.appendChild(td);

        description = document.createTextNode(products[i].product.name);
        p.appendChild(description);
        td.appendChild(p);

        td = document.createElement('td');
        p = document.createElement('p');
        description = document.createTextNode('R$ ' + products[i].product.price.toFixed(2));
        p.appendChild(description);
        td.appendChild(p);
        tr.appendChild(td);

        td = document.createElement('td');
        p = document.createElement('p');
        p.className = 'quantity';
        description = document.createTextNode(products[i].quantity);
        p.appendChild(description);
        td.appendChild(p);

        a = document.createElement('a');
        a.className = "delete";
        a.setAttribute('onclick','deleteproduct(' + products[i].product.id + ')');
        img = document.createElement('img');
        img.src = "static/icons/delete.png";
        a.appendChild(img);
        p.appendChild(a);

        tr.appendChild(td);

        td = document.createElement('td');
        td.classList.add('total');
        p = document.createElement('p');
        let total = products[i].product.price * products[i].quantity;
        description = document.createTextNode('R$ ' + total.toFixed(2));
        p.appendChild(description);
        td.appendChild(p);
        tr.appendChild(td);
    }

    p = document.createElement('p');
    p.id = 'total-order';
    description = document.createTextNode('Total: R$ ' + gettotal(products).toFixed(2));
    p.appendChild(description);

    items.appendChild(p);
}

function deleteproduct(id) {
    let items = document.querySelector('#cart-items')
    let table = items.getElementsByTagName('tbody')[0];
    let tablerow = table.querySelector('#item-' + id);

    let incart = cart.find(object => object.product.id == id);
    let index = cart.indexOf(incart);

    if (index > -1) {
        cart.splice(index, 1);
        table.removeChild(tablerow);

        let p = document.querySelector('#total-order')
        p.innerHTML = 'Total: R$ ' + gettotal(cart).toFixed(2);
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
    delivery_time = Math.floor(Math.random() * 8) + 2;

    for(var i = 0; i < opts.length; i++) {
     	if (val === 'Transportadora') {
        	p.innerHTML = 'Prazo para entrega: ' + (delivery_time +2) + ' dias.';
        	p.classList.remove('invisible');
    		p.classList.add('visible');
      	} 
      	else if (val === 'Correios') {
        	p.innerHTML = 'Prazo para entrega: ' + (delivery_time) + ' dias.';
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

function summary() {
    var order = {};

    order.cart = cart;

    let usuario = {
        name: document.querySelector('#name').value,
        cpf: document.querySelector('#cpf').value,
        email: document.querySelector('#email').value,
        birthday: document.querySelector('#birthday').value,
        gender: document.querySelector('#gender-f').checked == true ? 'f' : 'm',
        phone: document.querySelector('#phone').value
    }
    order.user = usuario;
    
    let entrega = {
        address: document.querySelector('#address').value,
        number: document.querySelector('#number').value,
        complement: document.querySelector('#complement').value,
        district: document.querySelector('#district').value,
        city: document.querySelector('#city').value,
        state: document.querySelector('#state').value,
        cep: document.querySelector('#cep').value,
        delivery_method: document.querySelector('#delivery-method').value,
        time: delivery_time
    }
    order.delivery = entrega;

    let pagamento = {
        payment_method: document.querySelector('#payment-method').value,
        total: gettotal(cart).toFixed(2)
    }
    order.payment = pagamento;

    let tosend = JSON.stringify(order);
    sessionStorage.setItem('order', tosend);
}

window.onload = function(e) {
    cart = JSON.parse(sessionStorage.getItem('cart'));
    loadcart(cart);
}