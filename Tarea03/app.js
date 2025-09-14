
const carrito = [];
const ingresa = prompt("Ingresar fruta al carro");
carrito.push(ingresa)

// confirm para opcion entre aceptar o no
while(confirm("Quieres agregar otra fruta en el carrito?")){
    const ingresa = prompt("Que otra fruta quieres agregar?");
    carrito.push(ingresa);
}

console.log("Usted compro");

// For of para mostrar cada elemnto del arreglo
for (let ingresa of carrito){
    console.log(ingresa);
}