const mallaData = {
  "1° Año - I Semestre": [
    { nombre: "Introducción a los Estudios Literarios I", sct: 5 },
    { nombre: "Panorama Histórico-Literario I", sct: 6 },
    { nombre: "Contextos Socioculturales de los Procesos Educativos", sct: 4 },
    { nombre: "Comunicación Escrita I", sct: 6 },
    { nombre: "Lingüística General", sct: 5 },
  ],
  "1° Año - II Semestre": [
    { nombre: "Introducción a los Estudios Literarios II", sct: 6, prerequisitos: ["Introducción a los Estudios Literarios I"] },
    { nombre: "Panorama Histórico-Literario II", sct: 6, prerequisitos: ["Panorama Histórico-Literario I"] },
    { nombre: "Psicología del Aprendizaje", sct: 4 },
    { nombre: "Latín", sct: 5 },
    { nombre: "Comunicación Escrita II", sct: 7, prerequisitos: ["Comunicación Escrita I"] },
    { nombre: "Fonética y Fonología del Español", sct: 6 },
  ],
  "2° Año - III Semestre": [
    { nombre: "Temas y Tópicos Literarios I", sct: 4 },
    { nombre: "Géneros Literarios I", sct: 4 },
    { nombre: "Gramática del Español I", sct: 4 },
    { nombre: "Comunicación Escrita III", sct: 5 },
    { nombre: "Historia de la Lengua Española I", sct: 4 },
    { nombre: "Segundo Idioma I", sct: 4 },
  ],
  "2° Año - IV Semestre": [
    { nombre: "Temas y Tópicos Literarios II", sct: 4 },
    { nombre: "Géneros Literarios II", sct: 6 },
    { nombre: "Gramática del Español II", sct: 4 },
    { nombre: "Comunicación Oral", sct: 5 },
    { nombre: "Historia de la Lengua Española II", sct: 4 },
    { nombre: "Currículum Educacional", sct: 4 },
    { nombre: "Segundo Idioma II", sct: 4 },
  ],
  "3° Año - V Semestre": [
    { nombre: "Temas y Tópicos Literarios III", sct: 4 },
    { nombre: "Literatura y Sociedad I", sct: 6 },
    { nombre: "Gramática del Español III", sct: 4 },
    { nombre: "Evaluación Educacional", sct: 4 },
    { nombre: "Segundo Idioma III", sct: 4 },
  ],
  "3° Año - VI Semestre": [
    { nombre: "Temas y Tópicos Literarios IV", sct: 6 },
    { nombre: "Literatura y Sociedad II", sct: 4 },
    { nombre: "Investigación Educacional", sct: 4 },
    { nombre: "Español de América", sct: 5 },
    { nombre: "Complementario de la Especialidad", sct: 4 },
  ],
  "4° Año - VII Semestre": [
    { nombre: "Comprensión y Producción de Textos", sct: 4 },
    { nombre: "Literatura y Estudios Transatlánticos", sct: 4 },
    { nombre: "Didáctica de la Lengua y la Literatura I", sct: 6 },
    { nombre: "Expresión Teatral", sct: 4 },
    { nombre: "Orientación y Convivencia Educativa", sct: 4 },
    { nombre: "Seminario de Lingüística y Comunicación", sct: 4 },
    { nombre: "Tipología Textual", sct: 5 },
  ],
  "4° Año - VIII Semestre": [
    { nombre: "Literatura y Estudios Comparados", sct: 5 },
    { nombre: "Didáctica de la Lengua y la Literatura II", sct: 6 },
    { nombre: "Análisis del Discurso", sct: 5 },
  ],
  "5° Año - IX Semestre": [
    { nombre: "Seminario o Proyecto de Memoria de Título", sct: 10 },
    { nombre: "Fortalecimiento de Competencias de Egreso", sct: 4 },
  ],
  "5° Año - X Semestre": [
    { nombre: "Seminario o Proyecto de Memoria de Título", sct: 22 },
  ],
};

const aprobados = new Set();

function tienePrerrequisitos(ramo, aprobados) {
  if (!ramo.prerequisitos) return true;
  return ramo.prerequisitos.every(pr => aprobados.has(pr));
}

function crearMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  for (const [semestre, ramos] of Object.entries(mallaData)) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    const title = document.createElement("h2");
    title.textContent = semestre;
    semestreDiv.appendChild(title);

    for (const ramo of ramos) {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";

      const aprobado = aprobados.has(ramo.nombre);
      const habilitado = tienePrerrequisitos(ramo, aprobados);

      ramoDiv.classList.toggle("aprobado", aprobado);
      ramoDiv.classList.toggle("bloqueado", !habilitado && !aprobado);

      ramoDiv.innerHTML = `
        <span>${ramo.nombre}</span>
        <span class="sct">${ramo.sct} SCT</span>
      `;

      if (habilitado) {
        ramoDiv.addEventListener("click", () => {
          if (aprobados.has(ramo.nombre)) {
            aprobados.delete(ramo.nombre);
          } else {
            aprobados.add(ramo.nombre);
          }
          crearMalla();
        });
      }

      semestreDiv.appendChild(ramoDiv);
    }

    container.appendChild(semestreDiv);
  }
}

crearMalla();

