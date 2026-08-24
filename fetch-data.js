const cardsSection = document.querySelector(".cards");
const filters = document.querySelectorAll(".filter__select");
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
const input = document.querySelector('#input-js')
const pagination = document.querySelector('.pagination')


let currentPage = 1;
let allJobs = [];
let filteredJobs = [];

const RESULTS_PER_PAGE = 3;

btnNext.addEventListener('click', () => {
    let totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
    if(currentPage < totalPages) {
      currentPage++
      renderCards()
    }
  })

  btnPrev.addEventListener('click', () => {
    let totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
    if(currentPage > 1) {
      currentPage--
      renderCards()
    }
  })



function renderCards() {
  cardsSection.innerHTML = "";
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  let jobsToRender = filteredJobs.slice(start, end)
  

  for (let i = 0; i < jobsToRender.length; i++) {
    const job = jobsToRender[i];
    const article = document.createElement("article");

    article.className = "card";
    article.dataset.modalidad = job.data.modalidad;
    article.dataset.nivel = job.data.nivel;
    article.dataset.technology = job.data.technology;

    article.innerHTML = `
          <div>
            <h3>${job.titulo}</h3>
            <p class="company">${job.empresa} | ${job.ubicacion}</p>
            <p class="descripcion">${job.descripcion}</p>
          </div>
          <a href="./card.html" class="btn-important">Aplicar</a>`;

    cardsSection.appendChild(article);
  }

  
}




function filtrarEmpleos() {
  const techValue = document.querySelector("#filter-technology").value;
  const modalidadValue = document.querySelector("#filter-modalidad").value;
  const experienceValue = document.querySelector("#filter-nivel").value;

  const textoBusqueda = input.value.toLowerCase().trim()
  
  
  
  filteredJobs = allJobs.filter((job) => {
    const coincideTitulo = textoBusqueda === "" || job.titulo.toLowerCase().includes(textoBusqueda);

      const coincideFiltro = coincideTitulo &&
      (techValue === "todos" || job.data.technology.includes(techValue)) &&
      (modalidadValue === "todos" || job.data.modalidad === modalidadValue) &&
      (experienceValue === "todos" || job.data.nivel === experienceValue);
      

      return coincideFiltro;
  });
  renderCards()
  let totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
  pagination.innerHTML = "";
  pagination.appendChild(btnPrev)
  for(let i = 1; i < totalPages + 1; i++) {
        const button = document.createElement('button')
        button.textContent = `${i}`
        
        pagination.appendChild(button)
        pagination.appendChild(btnNext)
      }
  currentPage = 1;
}

input.addEventListener('input', filtrarEmpleos)





// Solo si existe la sección en la página actual, ejecuta el fetch
if (cardsSection) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((jobs) => {
      allJobs = jobs;
      filteredJobs = jobs;

      renderCards();

      if (filters.length > 0) {
        filtrarEmpleos();
        filters.forEach((filter) => {
          filter.addEventListener("change", () => {
            filtrarEmpleos();
            renderCards();
          });
        });
      }
    })
    .catch((error) => console.error("Error cargando los empleos:", error));
}
