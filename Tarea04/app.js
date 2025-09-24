var productos = [
    { nombre: 'camisa', precio: 300 },
    { nombre: 'pantalon', precio: 500 },
    { nombre: 'zapatos', precio: 400 },
    { nombre: 'sombrero', precio: 200 }
];

var carrito = [];

// Función para mostrar el menú de productos
function mostrarMenu() {
    var menu = "Seleccione una opción:\n";
    for (var i = 0; i < productos.length; i++) {
        menu += (i + 1) + ". Agregar " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }

    menu += (productos.length + 1) + ". Ver Carrito y Total\n";
    menu += (productos.length + 2) + ". Modificar Carrito\n";
    menu += (productos.length + 3) + ". Menú Administrador\n";
    menu += (productos.length + 4) + ". Salir\n";

    return menu;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    var productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    console.log('Producto "' + productoSeleccionado.nombre + '" agregado al carrito.');
}

// Función para mostrar el carrito y el total
function mostrarCarritoYTotal() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        var mensajeCarrito = "Carrito de compras:\n";
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
            total += carrito[i].precio;
        }
        mensajeCarrito += "\nTotal: $" + total;
        console.log(mensajeCarrito);
    }
}

// Función para modificar el carrito
function modificarCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío, no hay nada que modificar.");
        return;
    }

    var menuCarrito = "Seleccione el número del producto que desea eliminar del carrito:\n";
    for (var i = 0; i < carrito.length; i++) {
        menuCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
    }
    menuCarrito += (carrito.length + 1) + ". Cancelar\n";

    var opcion = Number(prompt(menuCarrito));

    if (opcion >= 1 && opcion <= carrito.length) {
        var eliminado = carrito.splice(opcion - 1, 1);
        console.log("Se eliminó del carrito: " + eliminado[0].nombre);
    } else {
        console.log("Acción cancelada o inválida.");
    }
}

// Función menú administrador
function menuAdministrador() {
    var opcionAdmin;
    do {
        opcionAdmin = Number(prompt(
            "Menú Administrador:\n" +
            "1. Agregar producto al catálogo\n" +
            "2. Ver catálogo\n" +
            "3. Salir\n"
        ));

        if (isNaN(opcionAdmin) || opcionAdmin < 1 || opcionAdmin > 3) {
            console.log("Opción no válida, intenta de nuevo.");
        } else if (opcionAdmin === 1) {
            var nombre = prompt("Ingrese el nombre del nuevo producto:");
            var precio = Number(prompt("Ingrese el precio del producto:"));
            if (nombre && !isNaN(precio) && precio > 0) {
                productos.push({ nombre: nombre, precio: precio });
                console.log("Producto agregado: " + nombre + " - $" + precio);
            } else {
                console.log("Datos inválidos, no se agregó el producto.");
            }
        } else if (opcionAdmin === 2) {
            console.log("Catálogo actual:");
            for (var i = 0; i < productos.length; i++) {
                console.log((i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio);
            }
        }
        // si opcionAdmin = 3, sale del menú
    } while (opcionAdmin !== 3);

    console.log("Saliendo del menú administrador...");
}

// Bucle principal de la tienda
var opcion;
do {
    opcion = Number(prompt(mostrarMenu()));

    if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 4) {
        console.log("Opción no válida, por favor intenta de nuevo.");
    } else if (opcion >= 1 && opcion <= productos.length) {
        agregarAlCarrito(opcion - 1);
    } else if (opcion === productos.length + 1) {
        mostrarCarritoYTotal();
    } else if (opcion === productos.length + 2) {
        modificarCarrito();
    } else if (opcion === productos.length + 3) {
        menuAdministrador();
    }
} while (opcion !== productos.length + 4);

console.log("Gracias por visitar la tienda.");
