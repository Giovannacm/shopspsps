var order = {};

function gettotal(products) {
    let total = 0;
    for(var i=0 ; i<products.length ; i++)
        total += parseFloat(products[i].quantity) * parseFloat(products[i].product.price);

    return total;
}

function loadorder(order) {
    console.log(order);
	let div = document.querySelector('#user');
	let h2 = document.createElement('h2');
    let description = document.createTextNode(order.user.name + " | " + order.user.phone + " | " + order.user.email);
    h2.appendChild(description);
    div.appendChild(h2);

    div = document.querySelector('#delivery');
    let p = document.createElement('p');
    p.innerHTML = order.delivery.address + ", " + order.delivery.number + " (" + order.delivery.complement + "), " + order.delivery.district + ", " + order.delivery.city + " - " + order
    .delivery.state;
    div.appendChild(p);

    p = document.createElement('p');
    p.innerHTML = order.delivery.delivery_method + " | ";
    div.appendChild(p);

    div = document.querySelector('#cart');
    h2 = document.createElement('h2');
    h2.innerHTML = 'Total: R$ ' + gettotal(order.cart);
    div.appendChild(h2);
}

window.onload = function(e) {
    order = JSON.parse(sessionStorage.getItem('order'));
    loadorder(order);
}