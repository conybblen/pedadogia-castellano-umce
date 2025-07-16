// Materias organizadas por semestres (I a X)
const semestres = [
  [
    { id: "1", name: "Introducción a los Estudios Literarios I", sct: 5, prereq: [] },
    { id: "2", name: "Panorama Histórico-Literario I", sct: 6, prereq: [] },
    { id: "3", name: "Contextos Socioculturales de los Procesos Educativos", sct: 4, prereq: [] },
    { id: "4", name: "Comunicación Escrita I", sct: 6, prereq: [] },
    { id: "5", name: "Lingüística General", sct: 5, prereq: [] },
  ],
  [
    { id: "6", name: "Introducción a los Estudios Literarios II", sct: 6, prereq: [] },
    { id: "7", name: "Panorama Histórico-Literario II", sct: 6, prereq: [] },
    { id: "8", name: "Psicología del Aprendizaje", sct: 4, prereq: [] },
    { id: "9", name: "Latín", sct: 5, prereq: [] },
    { id: "10", name: "Comunicación Escrita II", sct: 7, prereq: [] },
    { id: "11", name: "Fonética y Fonología del Español", sct: 6, prereq: [] },
  ],
  [
    { id: "12", name: "Temas y Tópicos Literarios I", sct: 4, prereq: [] },
    { id: "13", name: "Géneros Literarios I", sct: 4, prereq: [] },
    { id: "14", name: "Gramática del Español I", sct: 4, prereq: [] },
    { id: "15", name: "Comunicación Escrita III", sct: 5, prereq: [] },
    { id: "16", name: "Historia de la Lengua Española I", sct: 4, prereq: [] },
    { id: "17", name: "Segundo Idioma I", sct: 4, prereq: [] },
  ],
  [
    { id: "18", name: "Temas y Tópicos Literarios II", sct: 4, prereq: ["12"] },
    { id: "19", name: "Géneros Literarios II", sct: 6, prereq: ["13"] },
    { id: "20", name: "Gramática del Español II", sct: 4, prereq: ["14"] },
    { id: "21", name: "Comunicación Oral", sct: 5, prereq: ["15"] },
    { id: "22", name: "Historia de la Lengua Española II", sct: 4, prereq: ["16"] },
    { id: "23", name: "Currículum Educacional", sct: 4, prereq: [] },
    { id: "24", name: "Segundo Idioma II", sct: 4, prereq: ["17"] },
  ],
  [
    { id: "25", name: "Temas y Tópicos Literarios III", sct: 4, prereq: ["18"] },
    { id: "26", name: "Literatura y Sociedad I", sct: 6, prereq: ["19"] },
    { id: "27", name: "Gramática del Español III", sct: 4, prereq: ["20"] },
    { id: "28", name: "Evaluación Educacional", sct: 4, prereq: [] },
    { id: "29", name: "Segundo Idioma III", sct: 4, prereq: ["24"] },
  ],
  [
    { id: "30", name: "Temas y Tópicos Literarios IV", sct: 6, prereq: ["25"] },
    { id: "31", name: "Literatura y Sociedad II", sct: 4, prereq: ["26"] },
    { id: "32", name: "Español de América", sct: 5, prereq: [] },
    { id: "33", name: "Español de Chile", sct: 4, prereq: [] },
    { id: "34", name: "Semiótica y Comunicación", sct: 5, prereq: [] },
    { id: "35", name: "Complementario de la Especialidad", sct: 4, prereq: [] },
  ],
  [
    { id: "36", name: "Comprensión y Producción de Textos", sct: 4, prereq: [] },
    { id: "37", name: "Literatura y Estudios Transatlánticos", sct: 4, prereq: [] },
    { id: "38", name: "Didáctica de la Lengua y la Literatura I", sct: 6, prereq: [] },
    { id: "39", name: "Expresión Teatral", sct: 4, prereq: [] },
    { id: "40", name: "Orientación y Convivencia Educativa", sct: 4, prereq: [] },
    { id: "41", name: "Tipología Textual", sct: 5, prereq: [] },
  ],
  [
    { id: "42", name: "Literatura y Estudios Comparados", sct: 5, prereq: [] },
    { id: "43", name: "Didáctica de la Lengua y la Literatura II", sct: 6, prereq: ["38"] },
    { id: "44", name: "Seminario de Lingüística y Comunicación", sct: 4, prereq: [] },
    { id: "45", name: "Análisis del Discurso", sct: 5, prereq: [] },
  ],
  [
    { id: "46", name: "Seminario o Proyecto de Memoria de Título", sct: 10, prereq: [] },
    { id: "47", name: "Fortalecimiento de Competencias de Egreso", sct: 4, prereq: [] },
  ],
  [
    { id: "48", name: "Seminario o Proyecto de Memoria de Título", sct: 22, prereq: [] },
  ],
];

// Estado de materias aprobadas
const state = {};

const container = document.getElementById("malla-container");

function checkPrereq(prereq) {
  if (prereq.length === 0) return true;
  return prereq.every(id => state[id] === "approved");
}

function prereqText(prereq) {
  if (prereq.length === 0) return "";
  return "Prerrequisitos: " + prereq.join(", ");
}

function renderMalla() {
  container.innerHTML = "";

  semestres.forEach((subjects, index) => {
    const col = document.createElement("div");
    col.className = "semester-column";

    const header = document.createElement("div");
    header.className = "semester-header";
    header.textContent = `Semestre ${index + 1}`;
    col.appendChild(header);

    subjects.forEach(subj => {
      const div = document.createElement("div");
      div.className = "subject";
      div.textContent = subj.name;

      if (state[subj.id] === "approved") {
        div.classList.add("completed");
      } else if (!checkPrereq(subj.prereq)) {
        div.classList.add("locked");
      }

      div.setAttribute("data-prereq", subj.prereq.length ? `Prerrequisitos: ${subj.prereq.join(", ")}` : "");

      const sctDiv = document.createElement("div");
      sctDiv.className = "sct-label";
      sctDiv.textContent = `${subj.sct} SCT`;
      div.appendChild(sctDiv);

      div.onclick = () => {
        if (div.classList.contains("locked")) return;
        if (state[subj.id] === "approved") {
          delete state[subj.id];
        } else {
          state[subj.id] = "approved";
        }
        renderMalla();
      };

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}

renderMalla();
