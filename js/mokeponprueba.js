const sectionSeleccionarAtaque = document.getElementById("seleccion-ataque")
const botonMokeponJugador = document.getElementById("boton-mokepon")
const sectionSeleccionarMokepon = document.getElementById("seleccion-mokepon")
const spanMokeponJugador = document.getElementById("mokepon-jugador")
const spanMokeponEnemigo = document.getElementById("mokepon-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigos = document.getElementById("vidas-enemigos")
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetasMokepon = document.getElementById("contenedor-tarjetas-mokepon")
const contenedorAtaques = document.getElementById("contenedorAtaques")
const sectionReinicio = document.getElementById("reiniciar")
const sectionVerMapa = document.getElementById("mapa-view")
const mapa = document.getElementById("mapa")
const margen = 15
const anchoMaximoMapa = 500
const zonaSegura= {
    x:50, y:50, ancho:50, alto:50
}
const ataqueMap = {
    "🔥": "FUEGO", "💥": "EXPLOSIÓN", "🌋": "ERUPCIÓN",
    "💧": "AGUA", "💦": "LLUVIA", "🌊": "TSUNAMI",
    "🌱": "TIERRA", "🌵": "DESERTIFICACIÓN", "🗻": "TERREMOTO",
    "❄": "HIELO", "🌨": "NEVADA", "🏔": "AVALANCHA",
    "⚡": "RAYO", "✨": "DESCARGA", "🌩": "TEMPESTAD",
    "⚓": "ACERO", "⚔": "SABLE", "☄": "METEORO"
}
const condicionesVictoria = {
    "AGUA": "FUEGO", "TIERRA": "RAYO", "FUEGO": "HIELO", "HIELO": "AGUA", "RAYO": "ACERO", "ACERO": "TIERRA",
    "LLUVIA": "EXPLOSIÓN"||"FUEGO", "DESERTIFICACIÓN": "DESCARGA"||"RAYO", "EXPLOSIÓN": "NEVADA"||"HIELO", "NEVADA": "LLUVIA"||"AGUA", "DESCARGA": "SABLE"||"ACERO", "SABLE": "DESERTIFICACIÓN"||"TIERRA",
    "TSUNAMI": "ERUPCIÓN"||"EXPLOSIÓN"||"FUEGO", "TERREMOTO": "TEMPESTAD"||"DESCARGA"||"RAYO", "ERUPCIÓN": "AVALANCHA"||"NEVADA"||"HIELO", "AVALANCHA": "TSUNAMI"||"LLUVIA"||"AGUA", "TEMPESTAD": "METEORO"||"SABLE"||"ACERO", "METEORO": "TERREMOTO"||"DESERTIFICACIÓN"||"TIERRA"
}
const hipodoge_ataques = [
    {nombre:"💧", id:"boton-agua"},{nombre:"💦", id:"boton-agua"},{nombre:"🌊", id:"boton-agua"},{nombre:"🌱", id:"boton-tierra"},{nombre:"🔥", id:"boton-fuego"},{nombre:"❄", id:"boton-hielo"},{nombre:"⚡", id:"boton-rayo"},{nombre:"⚓", id:"boton-acero"}
]
const capipepo_ataques = [
    {nombre:"🌱", id:"boton-tierra"},{nombre:"🌵", id:"boton-tierra"},{nombre:"🗻", id:"boton-tierra"},{nombre:"🔥", id:"boton-fuego"},{nombre:"💧", id:"boton-agua"},{nombre:"❄", id:"boton-hielo"},{nombre:"⚡", id:"boton-rayo"},{nombre:"⚓", id:"boton-acero"}

]
const ratigueya_ataques = [
    {nombre:"❄", id:"boton-hielo"},{nombre:"🌨", id:"boton-hielo"},{nombre:"🏔", id:"boton-hielo"},{nombre:"🔥", id:"boton-fuego"},{nombre:"💧", id:"boton-agua"},{nombre:"🌱", id:"boton-tierra"},{nombre:"⚡", id:"boton-rayo"},{nombre:"⚓", id:"boton-acero"}

]
const langostelvis_ataques = [
    {nombre:"🔥", id:"boton-fuego"},{nombre:"💥", id:"boton-fuego"},{nombre:"🌋", id:"boton-fuego"},{nombre:"💧", id:"boton-agua"},{nombre:"🌱", id:"boton-tierra"},{nombre:"❄", id:"boton-hielo"},{nombre:"⚡", id:"boton-rayo"},{nombre:"⚓", id:"boton-acero"}

]
const pydos_ataques = [
    {nombre:"⚡", id:"boton-rayo"},{nombre:"✨", id:"boton-rayo"},{nombre:"🌩", id:"boton-rayo"},{nombre:"🔥", id:"boton-fuego"},{nombre:"💧", id:"boton-agua"},{nombre:"🌱", id:"boton-tierra"},{nombre:"❄", id:"boton-hielo"},{nombre:"⚓", id:"boton-acero"}

]
const tucapalma_ataques = [
    {nombre:"⚓", id:"boton-acero"},{nombre:"⚔", id:"boton-acero"},{nombre:"☄", id:"boton-acero"},{nombre:"🔥", id:"boton-fuego"},{nombre:"💧", id:"boton-agua"},{nombre:"🌱", id:"boton-tierra"},{nombre:"❄", id:"boton-hielo"},{nombre:"⚡", id:"boton-rayo"}

]
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionMokepon
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma
let mokeponJugador
let mokeponJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botonHielo
let botonRayo
let botonAcero
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 5
let vidasEnemigos = 5
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
let porcentajeTamañoX
let porcentajeTamañoY
mapaBackground.src = "./assets/Mapas/mokemap.png"
let anchoPantalla = window.innerHeight - 2 * margen
let alturaPantalla
alturaPantalla = anchoPantalla * 600 / 800
mapa.width = anchoPantalla
mapa.height = alturaPantalla
class Mokepon{
    constructor(nombre, imagen, vida, imagenMapa){
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80 
        this.x = aleatorio(0, mapa.width - this.ancho) 
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaImagen = new Image()
        this.mapaImagen.src = imagenMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaImagen,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")
let langostelvis = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", 5, "./assets/langostelvis.png")
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 5, "./assets/pydos.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 5, "./assets/tucapalma.png")
let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", 200, 430)
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", 30, 450)
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png", 500, 420)
let langostelvisEnemigo = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", 5, "./assets/langostelvis.png", 600, 50)
let pydosEnemigo = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 5, "./assets/pydos.png", 150, 100)
let tucapalmaEnemigo = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 5, "./assets/tucapalma.png", 300, 300)
hipodoge.ataques.push(...hipodoge_ataques)
capipepo.ataques.push(...capipepo_ataques)
ratigueya.ataques.push(...ratigueya_ataques)
langostelvis.ataques.push(...langostelvis_ataques)
pydos.ataques.push(...pydos_ataques)
tucapalma.ataques.push(...tucapalma_ataques)
hipodogeEnemigo.ataques.push(...hipodoge_ataques)
capipepoEnemigo.ataques.push(...capipepo_ataques)
ratigueyaEnemigo.ataques.push(...ratigueya_ataques)
langostelvisEnemigo.ataques.push(...langostelvis_ataques)
pydosEnemigo.ataques.push(...pydos_ataques)
tucapalmaEnemigo.ataques.push(...tucapalma_ataques)
mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    mokepones.forEach((mokepon) =>{
        opcionMokepon = 
        `<input type="radio" name="mokepones" id=${mokepon.nombre} />
        <label class= "tarjeta" for=${mokepon.nombre}>
            <p class="nombre-mokepon">${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label><br>`
        contenedorTarjetasMokepon.innerHTML += opcionMokepon
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputPydos = document.getElementById("Pydos")
        inputTucapalma = document.getElementById("Tucapalma")
    })
    botonMokeponJugador.addEventListener("click", seleccionarMokeponJugador)
}
function seleccionarMokeponJugador(){
    if(inputHipodoge.checked){
        spanMokeponJugador.innerHTML = inputHipodoge.id
        mokeponJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMokeponJugador.innerHTML = inputCapipepo.id
        mokeponJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMokeponJugador.innerHTML = inputRatigueya.id
        mokeponJugador = inputRatigueya.id
    }else if(inputLangostelvis.checked){
        spanMokeponJugador.innerHTML = inputLangostelvis.id
        mokeponJugador = inputLangostelvis.id
    }else if(inputPydos.checked){
        spanMokeponJugador.innerHTML = inputPydos.id
        mokeponJugador = inputPydos.id
    }else if(inputTucapalma.checked){
        spanMokeponJugador.innerHTML = inputTucapalma.id
        mokeponJugador = inputTucapalma.id
    }else{
        alert("No has seleccionado a ningun Mokepon")
        return
    }
    sectionSeleccionarMokepon.style.display = "none"
    botonMokeponJugador.disabled = true
    extraerAtaques(mokeponJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}
function extraerAtaques(mokeponJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mokeponJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = 
        `<button id=${ataque.id} class="boton-ataque btnAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra  = document.getElementById("boton-tierra")
    botonHielo = document.getElementById("boton-hielo")
    botonRayo = document.getElementById("boton-rayo")
    botonAcero = document.getElementById("boton-acero")
    botones = document.querySelectorAll(".btnAtaque")
}
function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const ataque = ataqueMap[e.target.textContent]
            if (ataque){
                ataqueJugador.push(ataque);
                console.log(ataqueJugador)
                boton.style.background = "#4CAF50"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}
function seleccionarMokeponEnemigo(enemigo){
    spanMokeponEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}
function ataqueAleatorioEnemigo(){
    console.log("Ataque Enemigo", ataquesMokeponEnemigo)
    if (ataquesMokeponEnemigo.length === 0) {
        console.log("El mokepon enemigo no tiene ataques disponibles.")
        return
    }
    let indiceAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    let ataqueSeleccionado = ataquesMokeponEnemigo[indiceAleatorio]
    ataquesMokeponEnemigo.splice(indiceAleatorio, 1)
    let nombreAtaque = ataqueMap[ataqueSeleccionado.nombre]
    if(!nombreAtaque){
        nombreAtaque = ataqueSeleccionado.nombre
    }
    ataqueEnemigo.push(nombreAtaque)
    console.log(ataqueEnemigo)
    iniciarCombate()
}
function iniciarCombate(){
    if(ataqueJugador.length === 8){
        combate()
    }
}
function indexOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        indexOponentes(index, index)
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            crearMensaje("EMPATE")
        }else if (condicionesVictoria[ataqueJugador[index]] === ataqueEnemigo[index]){
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(condicionesVictoria[ataqueEnemigo[index]] === ataqueJugador[index]){
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigos.innerHTML = victoriasEnemigo
        }else{
            crearMensaje("Error en el combate")
        }
    }
    revisarVidas()
}
function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeConclusion("EMPATE!! Fue una pelea muy ajustada, tengan un trago 🥤")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeConclusion("FELICIDADES!! Has ganado la ronda toma una 🍔")
    }else{
        crearMensajeConclusion("HAS PERDIDO!! Suerte a la proxima ten 🍬")
    }
}
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeConclusion(conclusion){
    sectionMensajes.innerHTML = conclusion
    crearBotonReinicio()
}
function crearBotonReinicio(){
    let botonReiniciar = document.createElement("button")
    botonReiniciar.innerHTML = "Reiniciar"
    botonReiniciar.className = "boton-reinicio"
    sectionReinicio.appendChild(botonReiniciar)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function pintarCanvas(){
    mokeponJugadorObjeto.x = mokeponJugadorObjeto.x + mokeponJugadorObjeto.velocidadX
    mokeponJugadorObjeto.y = mokeponJugadorObjeto.y + mokeponJugadorObjeto.velocidadY
    verificarBordes(mokeponJugadorObjeto, mapa)
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mokeponJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    tucapalmaEnemigo.pintarMokepon()
    pydosEnemigo.pintarMokepon()
    langostelvisEnemigo.pintarMokepon()
    if(mokeponJugadorObjeto.velocidadX !==0 || mokeponJugadorObjeto.velocidadY !==0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(langostelvisEnemigo)
        revisarColision(pydosEnemigo)
        revisarColision(tucapalmaEnemigo)
    }
}
function moverArriba(){
    mokeponJugadorObjeto.velocidadY = -5
}
function moverIzquierda(){
    mokeponJugadorObjeto.velocidadX = -5
}
function moverDerecha(){
    mokeponJugadorObjeto.velocidadX = 5
}
function moverAbajo(){
    mokeponJugadorObjeto.velocidadY = 5
}
function detenerMovimiento(){
    mokeponJugadorObjeto.velocidadX = 0
    mokeponJugadorObjeto.velocidadY = 0
}
function presionUnaTecla(event){
    switch (event.key) {
        case "w":
            moverArriba()
            break
        case "s":
            moverAbajo()
            break
        case "a":
            moverIzquierda()
            break
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa(){
    if(anchoPantalla / alturaPantalla > 4/3){
        mapa.width = alturaPantalla * 4/3
        mapa.height = alturaPantalla
    }else{
        mapa.width = anchoPantalla
        mapa.height = anchoPantalla * 3/4
    }
    if(anchoPantalla > anchoMaximoMapa){
        anchoPantalla - anchoMaximoMapa - margen
    }
    mokeponJugadorObjeto = obtenerMokeponObjeto(mokeponJugador)
    console.log(mokeponJugadorObjeto, mokeponJugador)
    asignarPosicionInicial()
    intervalo = setInterval(pintarCanvas, 40)
    window.addEventListener("keydown", presionUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerMokeponObjeto(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mokeponJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    const arribaMokepon = mokeponJugadorObjeto.y + 10
    const abajoMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.alto - 10
    const derechaMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.ancho - 10
    const izquierdaMokepon = mokeponJugadorObjeto.x + 10
    if(abajoMokepon < arribaEnemigo || arribaMokepon > abajoEnemigo || derechaMokepon < izquierdaEnemigo || izquierdaMokepon > derechaEnemigo){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMokeponEnemigo(enemigo)
}
function verificarBordes(mokepon, mapa){
    if (mokepon.x < 0) {
        mokepon.x = 0;
        mokepon.velocidadX = 0;
    }
    if (mokepon.x + mokepon.ancho > mapa.width) {
        mokepon.x = mapa.width - mokepon.ancho;
        mokepon.velocidadX = 0;
    }
    if (mokepon.y < 0) {
        mokepon.y = 0;
        mokepon.velocidadY = 0;
    }
    if (mokepon.y + mokepon.alto > mapa.height) {
        mokepon.y = mapa.height - mokepon.alto;
        mokepon.velocidadY = 0;
    }
}
function asignarPosicionInicial(){
    mokeponJugadorObjeto.x = zonaSegura.x
    mokeponJugadorObjeto.y = zonaSegura.y
}
window.addEventListener("load", iniciarJuego)
