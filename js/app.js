let palabrita; 
let cantAciertos = 0;
let cantErrores = 0;
let enable =false; 
let caracteresIngresados = [];
let palabrasAhorcado =["amor","altura","laser","ella","ellas","ellos","ahora","vida","dinero","ayer","verdad","noche","mujeres","hombres","cuerpo","familia","siempre","salud","servicio","votas","agua","estrella","trabajo","porque","porque","durante","madre","negro","blanco","triste","primero","haber","vivir","momento","estado","contar","mosca","caballo","peruano","cuarto","ciencia","letras","pollo","perro","recursos","mensual","correo"];


let body = document.querySelector("body");
let iniciarJuegoBtn = document.querySelector("#iniciarJuego");
let agregarPalabraBtn = document.querySelector("#nuevaPalabra");

let mainContainer = document.querySelector("#mainDisplay");
let inputFrases = document.getElementById("inputFrase");
let adviceDiv = document.getElementById("adviceDiv");
let saveCancelBtn = document.getElementById("saveCancelBtn");
let guardarRemplazarbtn = document.getElementById("guardarRemplazarbtn");
let cancelarBtn = document.getElementById("cancelarBtn");
let saveCancelNewWord = document.getElementById("saveCancelNewWord");
let muestrPalabraPantalla = document.getElementById("muestraPalabraPantalla");

let nuevoDesistirDiv = document.getElementById("nuevoDesistirDiv");
let nuevoJuegoDiv = document.getElementById("nuevoJuegoDiv");
let nuevoJuegoBtn = document.getElementById("nuevoJuegoBtn");
let desistirBtn = document.getElementById("desistirBtn");
let ahorcadoDiv = document.getElementById("ahorcadoDiv");

let palabrasCorrectas = document.getElementById("palabrasCorrectas");
let palabrasEquivocadas = document.getElementById("palabrasEquivocadas");

let mensajeDerrota = document.getElementById("mensajeDerrota");


let source = `img/Personajes/p${cantErrores}.png`;
let imagen = document.getElementById("imagen");

iniciarJuegoBtn.addEventListener("click",displayIniciarJuego);
agregarPalabraBtn.addEventListener("click",diplayMenuAgregarPalabra);
desistirBtn.addEventListener("click",returnMenu);
guardarRemplazarbtn.addEventListener("click",reciveFrase);
inputFrases.addEventListener("click",inputWord);
nuevoJuegoBtn.addEventListener("click",nuevoJuego);

window.addEventListener('keydown', keyFunction);

function keyFunction(event)
{
	let spans = document.querySelectorAll("#spanLetras");
	let recibeTecla = event.key;
	let recibeCodigoTecla = event.keyCode;
	let letraMayus = recibeTecla.toUpperCase();

	if(recibeCodigoTecla >=65 && recibeCodigoTecla <= 90)
	{
		if(caracteresIngresados.includes(letraMayus))
		{
			return null;
		}
		else
		{
			caracteresIngresados.push(letraMayus);
		}

		let acerto = false; 
		for(let i = 0; i<palabrita.length;i++)
		{
			if(letraMayus == palabrita[i]){
				spans[i].innerHTML = letraMayus;
				acerto = true; 
				cantAciertos++;
			}
		}
		if(acerto == false ){
			let palabraEquivocadaDisplay = document.createElement("span");
			palabraEquivocadaDisplay.classList.add("equivocadas");
			palabraEquivocadaDisplay.innerHTML = letraMayus;
			palabrasEquivocadas.appendChild(palabraEquivocadaDisplay);
			cantErrores++;
			let source = `img/Personajes/p${cantErrores}.png`;
			let imagen = document.getElementById("imagen");
			imagen.src = source;
		}

		if(cantErrores === 9){
		mensajeDerrota.style.visibility = "visible";
		let palabraCorrecta = palabrita.join('');
		mensajeDerrota.textContent = "Fin Del Juego !! la palabra era "+ palabraCorrecta ;
		window.removeEventListener('keydown', keyFunction);
		}
		else if(cantAciertos == palabrita.length)
		{
			mensajeGanador.style.visibility = "visible";
			window.removeEventListener('keydown', keyFunction);
		}
	}
}

function numeroAleatorio()
{
	let numberRandom = Math.floor(Math.random()*palabrasAhorcado.length);
	return numberRandom;	
}

function displayIniciarJuego() {
	enable = true;
	agregarPalabraBtn.style.visibility = "collapse";
	iniciarJuegoBtn.style.visibility = "collapse";

	ahorcadoDiv.style.visibility = "visible";

	palabrasCorrectas.style.visibility = "visible";
	palabrasEquivocadas.style.visibility = "visible";

	btnNuevoJuego();
	btnDesistir();

	let recibePalabra = muestrPalabra(numeroAleatorio());

	drawLines(recibePalabra);

	window.addEventListener('keydown', keyFunction);
}

function nuevoJuego()
{
	cantAciertos = 0;
	cantErrores = 0;
	caracteresIngresados = [];
	ahorcadoDiv.style.visibility = "visible";
	mensajeGanador.style.visibility = "collapse";
	mensajeDerrota.style.visibility ="collapse";
	palabrasCorrectas.style.visibility = "visible";
	palabrasEquivocadas.style.visibility = "visible";
	palabrasCorrectas.innerHTML = "";
	palabrasEquivocadas.innerHTML = "";
	mensajeDerrota.style.visibility = "collapse";
	btnNuevoJuego();
	btnDesistir();
	let recibePalabra = muestrPalabra(numeroAleatorio());
	drawLines(recibePalabra);
	source = `img/Personajes/p1.png`;
	imagen = document.getElementById("imagen");
	imagen.src = source;

	window.addEventListener('keydown', keyFunction);
}

function diplayMenuAgregarPalabra()
{
	agregarPalabraBtn.style.visibility = "collapse";
	iniciarJuegoBtn.style.visibility = "collapse";
	window.removeEventListener("keydown", keyFunction);
	inputFrase();
	adviceMessage()
	btnGuardarReemplazar();
}

function btnGuardarReemplazar()
{
	guardarRemplazarbtn = document.getElementById("guardarRemplazarbtn");
	guardarRemplazarbtn.classList.add("blueButton");
	guardarRemplazarbtn.classList.add("sizeButton");
	guardarRemplazarbtn.style.visibility ="visible";



	cancelarBtn = document.getElementById("cancelarBtn");
	cancelarBtn.classList.add("greyButton");
	cancelarBtn.classList.add("sizeButton");
	cancelarBtn.style.visibility ="visible";

	cancelarBtn.addEventListener("click",returnMenu);
}

function inputFrase()
{
	inputFrases = document.getElementById("inputFrase");
	inputFrases.style.visibility ="visible";
	 


}

function adviceMessage()
{
	adviceDiv.style.visibility = "visible";
	
}

function btnNuevoJuego()
{
	nuevoJuegoBtn.classList.add("blueButton");
	nuevoJuegoBtn.classList.add("sizeButton");
	nuevoJuegoBtn.style.visibility="visible";
}

function btnDesistir()
{
	desistirBtn.classList.add("greyButton");
	desistirBtn.classList.add("sizeButton");
	desistirBtn.style.visibility="visible";
}

function returnMenu()
{
	let iniciarJuegoBtn = document.getElementById("iniciarJuego");
	iniciarJuegoBtn.style.visibility ="visible";

	let agregarPalabraBtn = document.getElementById("nuevaPalabra");
	agregarPalabraBtn.style.visibility ="visible";


	let inputFrase = document.getElementById("inputFrase");
	inputFrase.style.visibility = "collapse";

	let adviceDiv = document.getElementById("adviceDiv");
	adviceDiv.style.visibility = "collapse";

	let guardarRemplazarbtn= document.getElementById("guardarRemplazarbtn");
	guardarRemplazarbtn.style.visibility = "collapse";

	let cancelarBtn= document.getElementById("cancelarBtn");
	cancelarBtn.style.visibility = "collapse";

	let saveCancelNewWord= document.getElementById("saveCancelNewWord");
	saveCancelNewWord.style.visibility = "collapse";

	let saveCancelBtn= document.getElementById("saveCancelBtn");
	saveCancelBtn.style.visibility = "collapse";

	let desistirBtn = document.getElementById("desistirBtn");
	desistirBtn.style.visibility = "collapse";

	let nuevoJuegoBtn = document.getElementById("nuevoJuegoBtn");
	nuevoJuegoBtn.style.visibility = "collapse";

	let ahorcadoDiv = document.getElementById("ahorcadoDiv");
	ahorcadoDiv.style.visibility="collapse";

	let palabrasCorrectas = document.getElementById("palabrasCorrectas");
	palabrasCorrectas.style.visibility = "collapse";

	let nuevoDesistirDiv = document.getElementById("nuevoDesistirDiv");
	nuevoDesistirDiv.style.visibility = "collapse";

	let  palabrasEquivocadas = document.getElementById("palabrasEquivocadas");
	palabrasEquivocadas.style.visibility = "collapse";

	let mensajeDerrota = document.getElementById("mensajeDerrota");
	mensajeDerrota.style.visibility = "collapse";

	let mensajeGanador = document.getElementById("mensajeGanador");
	mensajeGanador.style.visibility = "collapse";

	let nuevoJuegoDiv = document.getElementById("nuevoJuegoDiv");
	nuevoJuegoDiv.style.visibility = "collapse";

	palabrasCorrectas.innerHTML = "";
	palabrasEquivocadas.innerHTML = "";

	iniciarJuegoBtn.addEventListener("click",displayIniciarJuego);
	agregarPalabraBtn.addEventListener("click",diplayMenuAgregarPalabra);

	source = `img/Personajes/p1.png`;
	cantAciertos = 0;
	cantErrores = 0;
	imagen = document.getElementById("imagen");
	imagen.src = source;
	caracteresIngresados = [];
}

function inputWord(event)
{
	if(event.pointerId === 1){
		document.getElementById("inputFrase").value="";
	}
}

function reciveFrase()
{
	let palabra = inputFrases.value;
	let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	let validacion = format.test(palabra);
	let tieneEspacio = /\s/.test(palabra);
	let tieneNumeros = /\d/.test(palabra);

	if(palabra === "Ingresa Palabra aqui" || palabra === "" || validacion === true || tieneEspacio == true || tieneNumeros == true )
	{
		inputFrases.value = "Ingresa Palabra aqui";
	}
	else if(palabra !="Ingresa Palabra aqui")
	{
		palabrasAhorcado.push(palabra);
		inputFrases.value = "Ingresa Palabra aqui";
		btnNuevoJuego();
		btnDesistir();
		nuevoJuegoDiv.style.visibility="visible";

		let inputFrase = document.getElementById("inputFrase");
		inputFrase.style.visibility = "collapse";

		let adviceDiv = document.getElementById("adviceDiv");
		adviceDiv.style.visibility = "collapse";

		let guardarRemplazarbtn= document.getElementById("guardarRemplazarbtn");
		guardarRemplazarbtn.style.visibility = "collapse";

		let cancelarBtn= document.getElementById("cancelarBtn");
		cancelarBtn.style.visibility = "collapse";

		ahorcadoDiv.style.visibility = "visible";

		palabrasCorrectas.style.visibility = "visible";
		palabrasEquivocadas.style.visibility = "visible";

		returnMenu();

	}
}


function muestrPalabra(numberRandom)
{
	let numeroAleatorio = numberRandom;
	let palabra = palabrasAhorcado[numeroAleatorio];
	let palabraMayus = palabra.toUpperCase();
	return palabraMayus;
}

function drawLines(palabra)
{
	palabrita = palabra.split('');

	palabrita.forEach(element => {
		let palabraDisplay = document.createElement("span");
		palabraDisplay.classList.add("Correctas");
		palabraDisplay.setAttribute("id","spanLetras");
		palabrasCorrectas.appendChild(palabraDisplay);
	});
}


