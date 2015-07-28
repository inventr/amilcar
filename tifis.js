var tablero;
var contador = 0;
var teclas =
{
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var fondo = {
    imagenURL: "fondo.png",
    imagenURL2: "fondo.1.png",
    imagenOK: false
};
var tifis = {
    frenteOK: false,
    atrasOK: false,
    derOK: false,
    izqOK: false,
    velocidad: 20,
    x: 0,
    y: 0
};
var liz = {
    imagenOK: false,
    x: 400,
    y: 200
};

var messajeinit = {
     imagenOK: false,
    x: 80,
    y: 80
};


function inicio()
{
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");

    fondo.imagen = new Image();
    fondo.imagen.src = fondo.imagenURL;
    fondo.imagen.onload = confirmarFondo;
    
    
  

    tifis.frente = new Image();
    tifis.frente.src = "diana-frente.png";
    tifis.frente.onload = confirmarFrente;

    tifis.atras = new Image();
    tifis.atras.src = "diana-atras.png";
    tifis.atras.onload = confirmarAtras;

    tifis.izq = new Image();
    tifis.izq.src = "diana-izq.png";
    tifis.izq.onload = confirmarIzq;

    tifis.der = new Image();
    tifis.der.src = "diana-der.png";
    tifis.der.onload = confirmarDer;

    liz.imagen = new Image();
    liz.imagen.src = "liz.png";
    liz.imagen.onload = confirmarLiz;
    
    messajeinit.imagen = new Image();
    messajeinit.imagen.src = "vecina.png",
    messajeinit.imagen.onload = confirmarMensaje;
    


    document.addEventListener("keydown", teclado);

}
function teclado(evento)
{
    //console.log( "x :" + tifis.x +  " y :" + tifis.y  );
   
    
    
    var codigo = evento.keyCode;
    var locallimit ;
    if(codigo == teclas.UP)
    {
        tifis.y -= tifis.velocidad;
        if(tifis.y==200 && (tifis.x>=180 && tifis.x<=220))
        {
            tifis.y += tifis.velocidad;
            locallimit = ("choque up");
        }else if (tifis.y==360 && tifis.x>120){
            tifis.y += tifis.velocidad;
            locallimit = ("choque up 2");
        }
        else if (tifis.y==200 && tifis.x<=120){
            tifis.y += tifis.velocidad;
            locallimit = ("choque up 2");
        }  
        else if (tifis.y==-20 ){
            tifis.y += tifis.velocidad;
            
        }  
        
    }
    if(codigo == teclas.DOWN)
    {
        tifis.y += tifis.velocidad;
       if (tifis.y==160 && tifis.x<=120) {
            tifis.y -= tifis.velocidad;
           locallimit = ("Limite Bajando");
       } else if (tifis.y>300 && tifis.x>120){
             tifis.y -= tifis.velocidad;
            locallimit = ("Limite Bajando barrera 2");
       } 
       else if (tifis.y==460 ){
             tifis.y -= tifis.velocidad;   
               locallimit = ("Limite del mapa");
       } 
           

       
    }
    if(codigo == teclas.LEFT)
    {
        tifis.x -= tifis.velocidad;
        
        if(tifis.x<=120 && (tifis.y==180 || tifis.y==200))
        {
            tifis.x += tifis.velocidad;
            
        } else if (tifis.y<=180 && tifis.x==220){
             tifis.x += tifis.velocidad;
              locallimit = ("limite Izquiro");
       } else if ( tifis.x==-20){
             tifis.x += tifis.velocidad;
             
       } 
       

    }
    if(codigo == teclas.RIGHT)

    {
        tifis.x += tifis.velocidad;
        if (tifis.x==180 && tifis.y<220)
        {
            tifis.x -= tifis.velocidad;
            locallimit = ("limite derecha");
        }else if(tifis.x==140 && (tifis.y==320 || tifis.y==340 || tifis.y==360)){
            tifis.x -= tifis.velocidad;
        }else if(tifis.x==480){
            tifis.x -= tifis.velocidad;
        }
    }
    
    
    
    if (tifis.x==liz.x && tifis.y==liz.y) {
        //alert("se le pego la mariqeura");
        if (contador==0) {
            fondo.imagen.src = fondo.imagenURL2;
             liz.y = 0;
             liz.x = 200;
             contador++;
        

            messajeinit.imagen = new Image();
            messajeinit.imagen.src = "vecina2.png",
            messajeinit.imagen.onload = confirmarMensaje;

        }else{
            //alert("Haz encontrado a Amilcar Jose");
            //var vid = document.getElementById("myVideo");
            messajeinit.imagen = new Image();
            messajeinit.imagen.src = "vecina3.png",
            messajeinit.imagen.onload = confirmarMensaje;
         
            myVideo.play(); 
        }
        
    }
    
    dibujar(codigo);
    
     document.getElementById('posicion').innerHTML = "x :" + tifis.x +  " y :" + tifis.y + " limit :" + locallimit + "normal";
     messajeinit.imagenOK = false;
     
}
function confirmarFondo()
{
    fondo.imagenOK = true;
    dibujar();
}

function confirmarFrente()
{
    tifis.frenteOK = true;
    dibujar();
}
function confirmarAtras()
{
    tifis.atrasOK = true;
    dibujar();
}
function confirmarIzq()
{
    tifis.izqOK = true;
    dibujar();
}
function confirmarDer()
{
    tifis.derOK = true;
    dibujar();
}

function confirmarLiz()
{
    liz.imagenOK = true;
    dibujar();
}

function confirmarMensaje()
{
    messajeinit.imagenOK = true;
    dibujar();
}


function dibujar(direccion)
{
    if(fondo.imagenOK)
    {
        tablero.drawImage(fondo.imagen, 0, 0);    
    }

    var tifisOrientada = tifis.frente;

    if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
    {
        if(direccion == teclas.DOWN || direccion == undefined)
        {
            tifisOrientada = tifis.frente;
        }
        else if(direccion == teclas.UP)
        {
            tifisOrientada = tifis.atras;
        }
        else if(direccion == teclas.LEFT)
        {
            tifisOrientada = tifis.izq;
        }
        else if(direccion == teclas.RIGHT)
        {
            tifisOrientada = tifis.der;
        }
    }
    tablero.drawImage(tifisOrientada, tifis.x, tifis.y);

    if(liz.imagenOK)
    {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }
    
    if(messajeinit.imagenOK)
    {
        tablero.drawImage(messajeinit.imagen, messajeinit.x, messajeinit.y);
    }
}