//Agregar el evento click al boton
let bnStart = document.querySelector(".start")
console.log(bnStart)

bnStart.addEventListener("click", () =>{
    console.log("Inicia el Juego")
});

//Sintaxis para cargar una imágen
const trexito = new Image()
trexito.src = "Pictures/trex1.webp"


const cactusIMG =new Image();
cactusIMG.src ="Pictures/cactus1.webp"

const huesoIMG = new Image();
huesoIMG.src = "Pictures/hueso.png"

//Seleccionar Canvas

let lienzo = document.getElementById ("lienzo")
let ctx = lienzo.getContext("2d")

//Lista de enemigos /otros elementos

const nopalitos = [];
const huesos = [];


//Nuestro personaje --> class  //UTILIZAR CLASES PARA DECLARAR UN PERSONA CON SUS CARACTERÍSTICAS.
class Trex{
    constructor (x,y,w,h,color,vida,imagen){
        this.x=x; 
        this.y=y;
        this.w=w;
        this.h=h;
        this.color= color;
        this.vida=vida;
        this.imagen = imagen
        this.saltando = false;
    }
    avanzar (){
        console.log("Avanza",this.x);
        if(this.x + this.w <340){
        this.x += 10
    }
    }
    retroceder (){
        if(this.x>0){
        this.x -= 10
    }
    }
    saltar (){
        console.log("Saltar");
        if(this.x<250   ){
        this.saltando=true
    }

    }
    agacharse (){
        console.log("Agacharse");
        
    }
    //Plasma nuestro dinosaurio en la estructura del recuadro
    dibujarse (){
        
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        ctx.drawImage(this.imagen, this.x,this.y,this.w,this.h)
    } 
    //imagen
    // ctx.drawImage(this.imagen, this.x,this.Y)
    morirse(){
    }
    disparar(){
        console.log("disparar")
        const huesito = new Hueso (this.x + this.w, this.y + 10, 20, 40, huesoIMG);
        huesos.push(huesito);
        console.log(huesito)
    }
    
}

class Cactus{
    constructor(x,y,w,h,imagen,nivel){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
        this.nivel=nivel
    }
    dibujarse(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h)
        this.x -= 1;
        if(this.nivel === "facil"){
            this.x-=1
        }else
        this.x-=3
    }
}

/* CLASE-HUESO -------------------------------------*/

class Hueso{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h)
        this.x +=3
    }
}



//Nuestro ---> cactus

//Dibujar linea

function drawFloor(){
    ctx.beginPath()
    ctx.moveTo(0,190)
    ctx.lineTo(338,190)
    ctx.stroke()
    ctx.closePath()
}

drawFloor()

//Mostrar el nomobre del juego

function mostrarDatos(distancia,score,vida){
    ctx.fillStyle = "black"
    ctx.font = "20px Arial";
    ctx.fillText("T-REX",135,25);
    //Distancia
    ctx.fillText(`${distancia}m`,20,25)
    //Score
    ctx.fillText(`Score:${score}`,230,25)
    ctx.fillText(`Vida:${vida}`,230,55)
}
mostrarDatos()

//Escuchar las teclas

//SINTAXIS BÁSICA PARA QUE NUESTRO JUEGO DETECTE EL TECLADO Y LOS VALORES DE CADA TECLA.

function teclas(dinosaurio){
    
    document.addEventListener("keyup",(evento) => {
        
        switch(evento.code){
            case "KeyF":
                dinosaurio.disparar()
            break
            case "Space":
                dinosaurio.saltar()
            break;
            case "ArrowRight":
                dinosaurio.avanzar("Pal frente")
            break
            case "ArrowLeft":
                dinosaurio.retroceder()
            break
            case "ArrowUp":
                console.log("Pa rriba")
            break
            case "ArrowDown":
                dinosaurio.saltando
            break
        }   
    });

}

//Crear enemigos.
function crearCactus(){
    const num = Math.floor(Math.random()*50)
    
    if(num === 3)
    {const cactus =new Cactus (300,130,30,60,cactusIMG,"facil");
    nopalitos.push(cactus);
        
    }
    
}

// SINTAXIS PARA INICIAR EL JUEGO
function iniciarJuego(){
    let distancia = 0;
    const dinosaurio = new Trex(20,140,30,50,"green",100, trexito)
    teclas(dinosaurio);
    console.log(dinosaurio)
    dinosaurio.dibujarse();

    

    setInterval(() =>{
        ctx.clearRect(0,0,338,230);
        //MostrarDatos
        mostrarDatos(distancia,0,dinosaurio.vida);
        distancia += 1
        
        //DibujarPiso
        drawFloor();
        dinosaurio.dibujarse()
        
        

        //Esta saltando?? y "gravedad"
    if (dinosaurio.saltando === true) {
        console.log("saltanndo");
        //altura maxima de salto
        if (dinosaurio.y > 20) {
          dinosaurio.y -= 15;
          dinosaurio.x +=5;
        } else {
          console.log("bajate");
          dinosaurio.saltando = false;
        }
      }
  
      //no estas saltando??
      if (dinosaurio.saltando === false && dinosaurio.y < 130) {
        dinosaurio.y += 15;
        dinosaurio.x +=5
      }
        
        //Dibujar enemigos/elementro extra

        nopalitos.forEach((cactus,index) => {
        cactus.dibujarse()
        if(cactus.x <= dinosaurio.x+dinosaurio.w){
            // console.log("Choco")
            //Eliminar elemento de nopalitos al chocar
           //array.splice
           nopalitos.splice(index,1)
           dinosaurio.vida -= 25;
           if(dinosaurio.vida<100){
            console.log("Has perdido")
           }
        }
        });

        //Proyectil
    huesos.forEach((hueso, hIndex) => {
        hueso.dibujarse();
        nopalitos.forEach((cactus, cIndex) => {
          // console.log("posicion x cactus", cactus.x, " - ", hueso.x);
          if (hueso.x + hueso.w >= cactus.x) {
            // quitar el hueso y el cactus
            huesos.splice(hIndex, 1);
            nopalitos.splice(cIndex, 1);
            dinosaurio.score += 1;
          }
        });
      });
        
        crearCactus();
    },1000/30)
}

iniciarJuego()

//Agregar la imagen del trex
//Crear los cactus
//Brincar
//Recibir daño trex
//contador de avance
//Score
//Perder
//Trex disparo
//Agregar sonido
//Ganar
//Reiniciar juego