document.addEventListener("keyup", e => {

    if (e.target.matches("#search")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".article").forEach(search => {
            search.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?search.classList.remove("filter")
            :search.classList.add("filter")
        })

    }

})

let btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup')

btnAbrirPopup.addEventListener('click', function(){
    overlay.classList.add('active')
    popup.classList.add('active')

})

btnCerrarPopup.addEventListener('click', function(){
    overlay.classList.remove('active')
    popup.classList.remove('active')

})

let btnAbrirPopup2 = document.getElementById('btn-abrir-popup2'),
    overlay2 = document.getElementById('overlay2'),
    popup2 = document.getElementById('popup2'),
    btnCerrarPopup2 = document.getElementById('btn-cerrar-popup2')

btnAbrirPopup2.addEventListener('click', function(){
    overlay2.classList.add('active')
    popup2.classList.add('active')

})

btnCerrarPopup2.addEventListener('click', function(){
    overlay2.classList.remove('active')
    popup2.classList.remove('active')

})


