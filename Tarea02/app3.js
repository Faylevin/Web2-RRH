// 3 Números

let num1 = parseInt(prompt("Ingresa el primer numero"));

let num2 = parseInt(prompt("Ingresa el segundo numero"));

let num3 = parseInt(prompt("Ingresa el tercer numero"));

if (num1 === num2 && num2 === num3) {
    console.log("Los tres números son iguales: " + num1);

} else {

    if (num1 >= num2 && num1 >= num3) {
        console.log("El número mayor es: " + num1);

    } else if (num2 >= num1 && num2 >= num3) {
        console.log("El número mayor es: " + num2);

    } else {
        console.log("El número mayor es: " + num3);
    }

    if (num1 <= num2 && num1 <= num3) {
        console.log("El número menor es: " + num1);

    } else if (num2 <= num1 && num2 <= num3) {
        console.log("El número menor es: " + num2);

    } else {
        console.log("El número menor es: " + num3);
    }

    if (num1 === num2 || num1 === num3 || num2 === num3) {
        console.log("Hay al menos dos números iguales.");
    }
}