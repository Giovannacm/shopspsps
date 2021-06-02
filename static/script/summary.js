var order = {};

function loadorder(order) {
	let p = document.querySelector('#delivery-deadline');
    p.innerHTML += " (" + order.delivery.time + " dias).";
    
    let div = document.querySelector('#cart');
    h2 = document.createElement('h2');
    h2.innerHTML = 'Total: R$ ' + order.payment.total;
    div.appendChild(h2);
}

function confirm() {
    var p = document.querySelector('#order-info');
    p.classList.remove('invisible');
    p.classList.add('visible');
    p.innerHTML = 'Pedido confirmado com sucesso!';

    var link = document.querySelector('#confirm-order');
    link.removeAttribute("onclick");
    link.style.cursor = "default";

    var myRequest = new XMLHttpRequest();
    myRequest.open("POST", "/confirm");
    myRequest.setRequestHeader('content-Type', 'application/json');
    myRequest.send(JSON.stringify(order));
}

window.onload = function(e) {
    order = JSON.parse(sessionStorage.getItem('order'));
    loadorder(order); //esse exibe pelo javascript o tempo de entrega e total (que estão fora do form)
}