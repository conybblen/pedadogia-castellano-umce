const semestres = [
  {
    numero: 1,
    materias: [
      { nombre: "Introducción a Estudios I", sct: 3, prerequisitos: [] },
      { nombre: "Panorama Histórico I", sct: 3, prerequisitos: [] },
      { nombre: "Comunicación Escrita I", sct: 3, prerequisitos: [] },
      { nombre: "Fundamentos de la Educación", sct: 4, prerequisitos: [] },
      { nombre: "Psicología General", sct: 4, prerequisitos: [] },
      { nombre: "Metodología de la Investigación", sct: 3, prerequisitos: [] },
    ],
  },
  {
    numero: 2,
    materias: [
      { nombre: "Introducción a Estudios II", sct: 3, prerequisitos: ["Introducción a Estudios I"] },
      { nombre: "Panorama Histórico II", sct: 3, prerequisitos: ["Panorama Histórico I"] },
      { nombre: "Comunicación Escrita II", sct: 3, prerequisitos: ["Comunicación Escrita I"] },
      { nombre: "Didáctica General", sct: 4, prerequisitos: ["Fundamentos de la Educación"] },
      { nombre: "Psicología del Desarrollo", sct: 4, prerequisitos: ["Psicología General"] },
      { nombre: "Estadística Aplicada", sct: 3, prerequisitos: ["Metodología de la Investigación"] },
    ],
  },
  {
    numero: 3,
    materias: [
      { nombre: "Introducción a Estudios III", sct: 3, prerequisitos: ["Introducción a Estudios II"] },
      { nombre: "Panorama Histórico III", sct: 3, prerequisitos: ["Panorama Histórico II"] },
      { nombre: "Comunicación Escrita III", sct: 3, prerequisitos: ["Comunicación Escrita II"] },
      { nombre: "Didáctica de la Lengua", sct: 4, prerequisitos: ["Didáctica General"] },
      { nombre: "Psicología Educacional", sct: 4, prerequisitos: ["Psicología del Desarrollo"] },
      { nombre: "Diseño de Investigación", sct: 3, prerequisitos: ["Estadística Aplicada"] },
    ],
  },
  {
    numero: 4,
    materias: [
      { nombre: "Literatura I", sct: 4, prerequisitos: ["Comunicación Escrita III"] },
      { nombre: "Lingüística I", sct: 4, prerequisitos: ["Comunicación Escrita III"] },
      { nombre: "Didáctica de la Literatura", sct: 4, prerequisitos: ["Didáctica de la Lengua"] },
      { nombre: "Evaluación Educativa", sct: 4, prerequisitos: ["Diseño de Investigación"] },
      { nombre: "Práctica Profesional I", sct: 5, prerequisitos: ["Didáctica General"] },
    ],
  },
  {
    numero: 5,
    materias: [
      { nombre: "Literatura II", sct: 4, prerequisitos: ["Literatura I"] },
      { nombre: "Lingüística II", sct: 4, prerequisitos: ["Lingüística I"] },
      { nombre: "Didáctica del Castellano", sct: 4, prerequisitos: ["Didáctica de la Lengua"] },
      { nombre: "Práctica Profesional II", sct: 5, prerequisitos: ["Práctica Profesional I"] },
    ],
  },
  {
    numero: 6,
    materias: [
      { nombre: "Seminario de Investigación Educativa", sct: 4, prerequisitos: ["Diseño de Investigación"] },
      { nombre: "Taller de Titulación", sct: 5, prerequisitos: ["Práctica Profesional II"] },
      { nombre: "Seminario de Literatura", sct: 4, prerequisitos: ["Literatura II"] },
      { nombre: "Lingüística Aplicada", sct: 4, prerequisitos: ["Lingüística II"] },
    ],
  },
];

const aprobados = new Set();

function estaAprobado(nombre) {
  return aprobados.has(nombre);
}

function puedeHabilitar(materia) {
  return materia.prerequisitos.every(prereq => aprobados.has(prereq));
}

function toggleAprobado(nombre) {
  if (aprobados.has(nombre)) {
    aprobados.delete(nombre);
  } else {
    aprobados.add(nombre);
  }
  renderMalla();
}

function renderMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  semestres.forEach(sem => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${sem.numero}`;
    divSemestre.appendChild(titulo);

    sem.materias.forEach(materia => {
      const aprobado = estaAprobado(materia.nombre);
      const habilitado = puedeHabilitar(materia) || aprobado;

      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      if (aprobado) divRamo.classList.add("aprobado");
      else if (!habilitado) divRamo.classList.add("bloqueado");

      divRamo.textContent = materia.nombre;

      // SCT en span aparte a la derecha
      const spanSCT = document.createElement("span");
      spanSCT.className = "sct";
      spanSCT.textContent = `${materia.sct} SCT`;
      divRamo.appendChild(spanSCT);

      // Tooltip con prerequisitos
      if (materia.prerequisitos.length > 0) {
        divRamo.classList.add("tooltip");
        divRamo.setAttribute("data-tooltip", "Prerrequisitos: " + materia.prerequisitos.join(", "));
      }

      if (!habilitado) {
        divRamo.onclick = null;
      } else {
        divRamo.onclick = () => toggleAprobado(materia.nombre);
      }

      contenedor.appendChild(divSemestre);
      divSemestre.appendChild(divRamo);
    });
  });
}

// Inicializamos
renderMalla();
