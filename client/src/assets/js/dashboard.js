/* Funcion para activar el link cuando pase el cursor por encima de la opcion menu */

var lista = document.querySelectorAll('.nav li');
function activarLink() {
    lista.forEach((item) => 
        item.classList.remove('active'));
    this.classList.add('active');
}

lista.forEach((item) =>
    item.addEventListener('mouseover', activarLink));

/* Funcion para mostrar/ocultar menu */

var toggle = document.querySelector('.toggle');
var nav = document.querySelector('.nav');
var container = document.querySelector('.container');

toggle.onclick = function(){
    nav.classList.toggle('active');
    container.classList.toggle('active');
}


//OCULTAR/MOSTRAR MENU DE USUARIO
var perfilUsuario = document.querySelector('.perfil-usuario');

// Agregar un evento de clic para mostrar/ocultar el menú
perfilUsuario.onclick = function(e) {
    // Prevenir que el clic en el menú se propague al contenedor de la foto de perfil
    e.stopPropagation();
    
    // Alternar la clase 'active' en el contenedor de perfil
    perfilUsuario.classList.toggle('active');
};

// Agregar un evento para cerrar el menú si se hace clic fuera de él
document.addEventListener('click', function(e) {
    if (!perfilUsuario.contains(e.target)) {
        perfilUsuario.classList.remove('active');
    }
});



// ABRIR EL MODAL 
const OpenModal = document.querySelector('.boton_raro');
const modal = document.querySelector('.modal');
const CloseModal = document.querySelector('.close__modal');
const formulario = document.getElementById("miFormulario");

OpenModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.add('modal--show');
});

CloseModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.remove('modal--show');
    formulario.reset();
});


// JS DE LA LISTA DE PERMISOS 

function filterOptions() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const options = document.getElementById("options").getElementsByTagName("label");

    for (let i = 0; i < options.length; i++) {
      const labelText = options[i].textContent.toLowerCase();
      options[i].style.display = labelText.includes(searchInput) ? "block" : "none";
    }
  }

  function selectAll(checkbox) {
    const checkboxes = document.querySelectorAll("#options input[type='checkbox']");
    checkboxes.forEach(cb => {
      if (cb !== checkbox) {
        cb.checked = checkbox.checked;
      }
    });
  } 


    // Abrir o cerrar el desplegable
    function toggleDropdown() {
        const options = document.getElementById("options");
        const isVisible = options.style.display === "block";
        options.style.display = isVisible ? "none" : "block";
      }
    
      // Cerrar el desplegable si el usuario hace clic fuera de él
      document.addEventListener("click", function (event) {
        const dropdown = document.querySelector(".dropdown");
        const options = document.getElementById("options");
    
        if (!dropdown.contains(event.target)) {
          options.style.display = "none";
        }
      });
    
      // Cerrar el desplegable al presionar "Escape"
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          document.getElementById("options").style.display = "none";
        }
      });



