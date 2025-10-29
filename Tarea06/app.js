let turno = "X";
let juegoTerminado = false;

function jugada(celda) {
    if (celda.textContent === "" && !juegoTerminado) {
        celda.textContent = turno;
        verificarGanador();
        turno = turno === "X" ? "O" : "X";
    }
}

function verificarGanador() {
    const celdas = Array.from(document.getElementsByTagName("td"));
    const combinaciones = [
        [0,1,2], [3,4,5], [6,7,8], // filas
        [0,3,6], [1,4,7], [2,5,8], // columnas
        [0,4,8], [2,4,6]           // diagonales
    ];

    for (let combo of combinaciones) {
        const [a, b, c] = combo;
        if (celdas[a].textContent &&
            celdas[a].textContent === celdas[b].textContent &&
            celdas[a].textContent === celdas[c].textContent) {
            document.getElementById("mensaje").textContent =
                "¡Ganó " + celdas[a].textContent + "!";
            juegoTerminado = true;
            return;
        }
    }

    if (celdas.every(c => c.textContent !== "") && !juegoTerminado) {
        document.getElementById("mensaje").textContent = "Empate";
        juegoTerminado = true;
    }
}

function reiniciar() {
    const celdas = document.getElementsByTagName("td");
    for (let c of celdas) {
        c.textContent = "";
    }
    turno = "X";
    juegoTerminado = false;
    document.getElementById("mensaje").textContent = "";
}
