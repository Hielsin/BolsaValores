//Antes de enviar los datos del formulario debemos de validar el CAPTCHA

document.addEventListener("DOMContentLoaded", 
function() 
{
document.getElementById("frmregistrar").addEventListener('submit', revisarform2); 
});

function revisarform2(evento) 
{
evento.preventDefault();
//Si el CAPTCHA es el mismo de la imagen entonces enviará los datos a registrar.php
if(validarrecaptcha2()===true) 
{
       this.submit();
}	
else //Caso contrario limpiará el formulario
{
 document.getElementById("frmregistrar").reset();
}
}
//Creación del CAPTCHA
var codvai2='';
function crearrecaptcha2() 
{
codvai2='';
var cantidadtexto=4;
var vericodigovai=document.getElementById("vericodigovai2");
vericodigovai.value='';
var letrasynumeros=new Array(0,1,2,3,4,5,6,7,8,9,'A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
for(var i=0;i<cantidadtexto;i++) 
{
    var x=Math.floor(Math.random()*34);
    codvai2+=letrasynumeros[x];
}
if(codvai2.length!=cantidadtexto) {
    crearrecaptcha2();
}
vericodigovai.innerHTML=codvai2;
}
//Validación del CAPTCHA
function validarrecaptcha2() 
{
var codingresado=document.getElementById("txtrecaptcha2").value.toUpperCase();
if(codingresado!=codvai2)
{
    alert("reCAPTCHA Incorrecto, intenta de nuevo");
    crearrecaptcha2();
    document.getElementById("txtusuario2").focus();
    return false;
}else {
    return true;
}
}