
var toDo = JSON.parse(localStorage.getItem("to do")); //asettaa listan local storagesta muuttujaan toDo
    if(toDo == null){  //jos taulukko on tyhjä = local storagessa ei ole mitään, taulukko luodaan. 
        toDo = [];
    }else{
    lataaLista(); //kutsutaan funktiota joka lataa local storageen tallennetun listan. 
    }

taustaVari() //hakee tallennetun taustavärin ja emojin local storagesta
emoji()



document.getElementById('addBtn').addEventListener('click', lisaaListalle); //kuuntelija add-napille
function lisaaListalle(){ //funktio ottaa tekstikentän "task" arvon (value) 
    let listalle = document.getElementById('task').value;
    document.getElementById("task").value = '';//nollaa tekstinsyöttäkentän 

        if (listalle == "" || listalle.length < 3){ // syötteen tarkistus. Ohjelma ei anna syottää tyhjää arvoa eikä lyhyempää kuin 3 merkkiä
            
            document.getElementById('errorMessage').innerHTML = "Invalid input. Add at least three characters!";
            document.getElementById('task').style.backgroundColor = 'pink';
  
            
        }
        else {
            addItem(listalle); // kun menee tarkistuksesta läpi, kutsuu funtiota addItem, jolle annetaan tallennettu arvo parametrinä.
            document.getElementById('task').style.backgroundColor = 'white'; 
            document.getElementById('errorMessage').innerHTML = "";
        }
};

function addItem(i) {
    var li = document.createElement('li'); // luo listaelementin ja tallentaa sen muuttujaan. 
    li.appendChild(document.createTextNode(i)); //  Luodaan uusi elementti createElement-metodilla ja appendChild() -metodi lisää elementin listan loppuun, lähde: https://www.w3schools.com/jsref/met_node_appendchild.asp. 
    li.className = 'item';
    //document.getElementById('lista').appendChild(li); //hakee kohdan HTML-koodista Id:llä 

    
    toDo.push(i); // lisää arvon i listalle
    localStorage.setItem("to do", JSON.stringify(toDo)); //tallennetaan local storageen
  
    lataaLista2()
}

function lataaLista(){

   var listaMuistista  = JSON.parse(localStorage["to do"]);
  
   for (i = 0; i < listaMuistista.length; ++i) {
    var li = document.createElement('li');
    li.className = 'item';
    li.innerText = listaMuistista[i] ;
    document.getElementById("lista2").appendChild(li);   
}
}; 

function lataaLista2(){ //tässä on ajatusvirhe, joten koodiblokki toistuu kahdesti melkein identtisenä. lataalista() lataa vanhat tiedot local storagesta... 
                        //ja lataalista2() päivittää listaa sitä mukaan, kun lisäyksiä tehdään
localStorage["to do"] = JSON.stringify(toDo);
var listaMuistista = stored_datas = JSON.parse(localStorage["to do"]);

for (i = 0; i < listaMuistista.length; ++i) {
 var li = document.createElement('li');
 li.className = 'item';
 li.innerText = listaMuistista[i] ;

}   document.getElementById("lista2").appendChild(li);
}; 


document.getElementById("lista2").addEventListener("click", function(event) { // Jouduin tähän googlailemaan aika paljon apuja, lähde: https://www.w3schools.com/jsref/event_target.asp
  if (event.target.matches("li.item")) {  // event.target palauttaa sen arvon, jota klikattiin: tässä takistetaan, onko luokan nimi oikea.
    event.target.innerHTML = '<s>'+event.target.outerHTML+'</s>';
    event.target.style.color = 'grey'; //muokkaa listalta klikatun elementin ulkonäköä. 
  }
}); 

document.getElementById("lista2").addEventListener("dblclick", function(event) { 
    if (event.target.matches("li.item")) {  
        event.target.remove();
    }
  }); 
      

document.getElementById('deleteList').addEventListener('click', poistaLista);
function poistaLista(){
    localStorage.clear(); //tyhjentää local storagen
    location.reload(); // lataa sivun uudelleen
    document.getElementById('lista2').innerHTML = ''; //tyhjentää elementit listalta
}

document.getElementById('deleteList').addEventListener("mouseover", annaVaroitus);
document.getElementById('deleteList').addEventListener("mouseout", poistaVaroitus);

function annaVaroitus(){
document.getElementById('warning').innerHTML = "Delete all entries?";
}

function poistaVaroitus(){
document.getElementById('warning').innerHTML = "";
}


var laatikko = document.getElementById('header')
var vaihtaja = document.getElementById('colorChanger'),
colors = ['salmon', 'purple', 'orange', '#69DDC1',];
emojis = ['&#128552;', '&#128580;', '&#128522;', '&#128526;',];

    //hakee värejä ja emojeja taulukosta klikkauksien mukaan (shift ja push)
    vaihtaja.onclick = function () {
    var color = colors.shift();
    colors.push(color);

    var emoji = emojis.shift();
    emojis.push(emoji);

    localStorage.setItem('bgcolor', color); //värin tallennus local storageen
    laatikko.style.backgroundColor = color; 

    localStorage.setItem('emoji', emoji); //värin tallennus local storageen
    document.getElementById('colorChanger').innerHTML = emoji;
   
    };

function taustaVari(){
    var valittuVari = localStorage.getItem('bgcolor'); 
    document.getElementById('header').style.backgroundColor = valittuVari;

    var valittuEmoji = localStorage.getItem('emoji'); 
    document.getElementById('colorChanger').innerHTML = valittuEmoji;

}

function emoji(){
    
    var valittuEmoji = localStorage.getItem('emoji'); 
    if (valittuEmoji == null){
        document.getElementById('colorChanger').innerHTML = '&#128526;';
    } else {
    document.getElementById('colorChanger').innerHTML = valittuEmoji;

    }
   };