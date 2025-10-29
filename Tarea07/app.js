function generarQR() { 
    let input1 = document.getElementById('input1').value.trim();
    let input2 = document.getElementById('input2').value.trim();
    let input3 = document.getElementById('input3').value.trim();
    let input4 = document.getElementById('input4').value.trim();
    let boton = document.getElementById('btnGenerar');
    let contenedorQR = document.getElementById('qr-code');

    // Validación: no permitir campos vacíos
    if (!input1 || !input2 || !input3 || !input4) {
        alert("Por favor, completa todos los campos antes de generar el QR.");
        return;
    }

    // Verificar si ya existe un QR generado
    if (document.querySelector('.qr-code')) {
        alert("Ya has generado un código QR. Solo se permite uno por vez.");
        return;
    }

    // Generar texto y QR
    let textoCompleto = `Nombre: ${input1}\nCorreo: ${input2}\nInstitución: ${input3}\nDependencia: ${input4}`;
    let qrCodeURL = 'https://api.qrserver.com/v1/create-qr-code/?size=350x200&data=' + encodeURIComponent(textoCompleto);

    let qrImg = document.createElement('img');
    qrImg.src = qrCodeURL;
    qrImg.alt = 'Código QR generado';
    qrImg.classList.add('qr-code');

    contenedorQR.appendChild(qrImg);

    // Deshabilitar el botón para evitar más de una petición
    boton.disabled = true;
    boton.textContent = "QR Generado";
}
