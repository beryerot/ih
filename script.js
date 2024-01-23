let canvas;
let context;
let drawing = false;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = 'test.png';

    // Agrega un encabezado
    const header = document.getElementById('header');
    header.textContent = "Conecta los puntos para descubrir la figura escondida";

    function draw(e) {
        e.preventDefault();

        if (!drawing) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = '#000';

        context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    }

    function startDrawing(e) {
        drawing = true;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        context.beginPath();
        context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);

        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchmove', draw);
    }

    function endDrawing() {
        drawing = false;
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('touchmove', draw);

        document.getElementById('sendButton').style.display = 'block';
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', startDrawing);

    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('touchend', endDrawing);

    window.addEventListener('resize', function () {
        canvas.width = 300;
        canvas.height = 400;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
}

function enviarDibujo() {
    const sendButton = document.getElementById('sendButton');
    sendButton.innerHTML = 'Dibujo enviado';
    sendButton.classList.add('sent');
    sendButton.style.pointerEvents = 'none'; // Desactiva clics adicionales

}

document.addEventListener('DOMContentLoaded', init);
