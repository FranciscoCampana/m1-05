function saludar(){
alert("Hola desde JavaScript!")
}


 /*manipulacion de un documento HTML */


      let logo = document.querySelector(".navbar-brand")
      

      //3) - Manipulación de comportamiento

      logo.onclick = cambiarLogo

      function cambiarLogo(){

        //1) - Manipulación de contenido.

          //js, busca         este elemento   remplazalo    esto. si fuera innerText no aplica reglas de HTML como poner en negrita
      logo.innerHTML = "noticias <strong>eXtremas</strong>"

      //2) - Manipulación de estructura.

      logo.style.color = "#f00"
      logo.title = "todas las noticias"
      logo.classList.add("text-uppercase")

      }

      function crearNoticia(titulo, autor, bajada, imagen){
      	let plantilla = `<article class="row noticia">
    
       <div class="col-12 col-lg-4 noticia-img">
          <img src="${imagen}" class="img-fluid">
        </div>

        <div class="col-12 col-lg-8 noticia-txt">
          <h3>${titulo}</h3>
          <p>${autor}</p>
          <p>${bajada}</p>
        </div>
         
      </article>`

      let ficha = document.createElement("div")
      ficha.classList.add("col-12", "col-md-6","col-lg-12")
      ficha.innerHTML = plantilla

      document.querySelector("#ultimas-noticias").appendChild(ficha)
      }