const cardsSection = document.querySelector(".cards");
if(cardsSection) {
const botones = document.querySelectorAll(".btn-important");
cardsSection.addEventListener("click", () => {
  const element = event.target;

  if (element.classList.contains("btn-important")) {
    element.textContent = "Gracias por aplicar";
    element.classList.add("disabled");
    element.disabled = true;
  }
});
}



// botones.forEach(boton => {
  //   boton.addEventListener('click', () => {
    //     boton.textContent = "Gracias por aplicar";
    //     boton.classList.add('disabled');
    //     boton.disabled = true;
    // })
    // })
    