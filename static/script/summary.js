var order = {};

function loadorder(order) {
	let div = document.querySelector('#user');
	let h2 = document.createElement('h2');
    h2.innerHTML = "Pedido para: ";
    let p = document.createElement('p');
    p.innerHTML = order.user.name + " | " + order.user.email + " | " + order.user.phone;
    div.appendChild(h2);
    div.appendChild(p);

    div = document.querySelector('#delivery');
    h2 = document.createElement('h2');
    h2.innerHTML = "Entregar em: ";
    p = document.createElement('p');
    p.innerHTML = order.delivery.address + ", " + order.delivery.number + " (" + order.delivery.complement + "), " + order.delivery.district + ", " + order.delivery.city + " - " + order
    .delivery.state, order.delivery.cef;
    div.appendChild(h2);
    div.appendChild(p);

    h2 = document.createElement('h2');
    h2.innerHTML = "Tipo de entrega: ";
    p = document.createElement('p');
    p.innerHTML = order.delivery.delivery_method + " (" + order.delivery.time + " dias).";
    div.appendChild(h2);
    div.appendChild(p);

    div = document.querySelector('#cart');
    h2 = document.createElement('h2');
    h2.innerHTML = "Tipo de pagamento: ";
    p = document.createElement('p');
    p.innerHTML = order.payment.payment_method;
    div.appendChild(h2);
    div.appendChild(p);

    h2 = document.createElement('h2');
    h2.innerHTML = 'Total: R$ ' + order.payment.total;
    div.appendChild(h2);
}

function confirm() {
    document.querySelector('#confirm-order').disabled = true;
    var p = document.querySelector('#order-info');
    p.classList.remove('invisible');
    p.classList.add('visible');
    p.innerHTML = 'Pedido confirmado com sucesso!';
}

window.onload = function(e) {
    order = JSON.parse(sessionStorage.getItem('order'));
    //loadorder(order); //esse exibe pelo javascript
}