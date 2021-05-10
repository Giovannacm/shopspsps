function loadorder(order) {
	let div = document.querySelector('#order');
	let p = document.createElement('p');
    let description = document.createTextNode(order);
    p.appendChild(description);
    div.appendChild(p);
}

window.onload = function(e) {
    loadorder(pedido);
}