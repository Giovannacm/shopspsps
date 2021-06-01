var order = {};

function loadorder(order) {
	let p = document.querySelector('#delivery-deadline');
    p.innerHTML += " (" + order.time + " dias).";
    
    let div = document.querySelector('#cart');
    h2 = document.createElement('h2');
    h2.innerHTML = 'Total: R$ ' + order.total;
    div.appendChild(h2);
}

function confirm() { //mandar order para o flask armazenar o pedido no banco de dados
    document.querySelector('#confirm-order').disabled = true;
    var p = document.querySelector('#order-info');
    p.classList.remove('invisible');
    p.classList.add('visible');
    p.innerHTML = 'Pedido confirmado com sucesso!';
    console.log(order);
}

window.onload = function(e) {
    order = JSON.parse(sessionStorage.getItem('order'));
    loadorder(order); //esse exibe pelo javascript o tempo de entrega e total (que estão fora do form)
}