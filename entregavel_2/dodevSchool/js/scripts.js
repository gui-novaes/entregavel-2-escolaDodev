////////////////////////////////////////////////////////////////////////
////////////////// FAÇA O SEU CÓDIGO AQUI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////

// 1° PASSO - Crie uma classe "Aluno" com as propriedades: Nome, Idade e Nota;
class Aluno {
  Nome;
  Idade;
  Nota;

  // 2° PASSO - Crie um construtor que prencha as 3 propriedades;
  constructor(nome, idade, nota){
    this.Nome = nome;
    this.Idade = idade;
    this.Nota = Number(nota);
  }
}

// Array
// 3° PASSO - Crie um array para armazenar os Alunos cadastrados
let arrayAlunos = [];

//funções projeto

// 4° PASSO - Crie uma função "CadastrarAluno()" que recebe três parâmetros: nome, idade e nota. Nesta função crie um novo objeto de aluno com as informações recebidas via parâmetro, adicione esse objeto ao array de alunos e retorne o objeto Aluno. Antes de salvar no array, valide se já não existe um objeto com o mesmo Nome, para evitar duplicidade.
function CadastrarAluno(nome, idade, nota, array) {
  // verifica se o nome já existe no array
  let cadastroAluno = new Aluno(nome, idade, nota);
  if(!array.some(aluno => aluno.Nome == nome))   // '!' significa não, not , se não tiver esse nome , dá o push
    array.push(cadastroAluno)
  return cadastroAluno;
}

// 5° PASSO - Cria uma função "OrdenarPorNota()" que recebe um array de alunos como parâmetro e ordene o array da menor para a maior nota e retorne o array ordenado
function OrdenarPorNota(arrayAlunos) {
  return arrayAlunos.sort((a, b) => a.Nota - b.Nota);
}

// 6° PASSO - Crie uma função "OrdenarPorIdade()" que recebe um array de alunos como parâmetro e ordene o array da maior para a menor idade e retorne o array ordenado;
function OrdenarPorIdade(arrayAlunos) {
  return arrayAlunos.sort((a, b) => b.Idade - a.Idade)
}

// 7° PASSO - Crie uma função "OrdenarPorNome()" que recebe um array de alunos como parâmetro e ordene o array em ordem alfabética com base no nome e retorne o array ordenado; (essa é um desafio, se necessário façam uma pesquisa)
function OrdenarPorNome(arrayAlunos) {
  return arrayAlunos.sort((a, b) => a.Nome.localeCompare(b.Nome))
}

// 8° PASSO - Crie uma função "CalcularMedia()" que recebe um array de alunos como parâmetro e calcule a média das notas e retorne a media calculada
function CalcularMedia(arrayAlunos){
  let notasMedia = [];
  arrayAlunos.forEach(valor => {notasMedia.push(valor.Nota)})

  let somaValoresMedia = notasMedia.reduce((accumulator, value) => accumulator + value, 0);
  let mediaFinal = somaValoresMedia / notasMedia.length;
  return mediaFinal
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function ExcluirAluno(array, nome) {
  let index
  let removido = false
  array.forEach(aluno => {
    if (aluno.Nome == nome) {
      index = array.indexOf(aluno)
      removido = true
    }
  })
  array.splice(index, 1)
  return removido
}

function PesquisarAluno(array, nome) {
  let pesquisa = false
  array.forEach(aluno => {
    if (aluno.Nome.includes(nome)) {
      pesquisa = true
    }
  })

  return pesquisa
}

// Seleção de elementos
const alunoForm = document.querySelector("#aluno-form");
const alunoInput = document.querySelector("#aluno-input");
const alunoInput2 = document.querySelector("#aluno-input-2");
const alunoInput3 = document.querySelector("#aluno-input-3");
const alunoList = document.querySelector("#aluno-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveAluno = (nome, idade, nota, done = 0, save = 1) => {
  let objetoAluno = CadastrarAluno(nome, idade, nota, arrayAlunos)

  const aluno = document.createElement("div");
  aluno.classList.add("aluno");

  const alunoNome = document.createElement("h3");
  alunoNome.innerText = objetoAluno.Nome;
  aluno.appendChild(alunoNome);

  const alunoIdade = document.createElement("h3");
  alunoIdade.innerText = objetoAluno.Idade;
  aluno.appendChild(alunoIdade);

  const alunoNota = document.createElement("h3");
  alunoNota.innerText = objetoAluno.Nota;
  aluno.appendChild(alunoNota);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-aluno");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  aluno.appendChild(deleteBtn);

  // Utilizando dados da localStorage

  alunoList.appendChild(aluno);
  

  const media = document.querySelector("#media");
  media.textContent = CalcularMedia(arrayAlunos).toFixed(2)

  alunoInput.value = "";
  alunoInput2.value = "";
  alunoInput3.value = "";

};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  alunoForm.classList.toggle("hide");
  alunoList.classList.toggle("hide");
};

const getBuscarAluno = (busca) => {
  const alunos = document.querySelectorAll(".aluno");

  let pesquisa = PesquisarAluno(arrayAlunos, busca)

  if (pesquisa) {
    alunos.forEach((aluno) => {
      const alunoNome = aluno.querySelector("h3").innerText.toLowerCase();

      aluno.style.display = "flex";

      if (!alunoNome.includes(busca)) {
        aluno.style.display = "none";
      }
    });
  };
}



const filterAlunos = (filterValue) => {
  const alunos = document.querySelectorAll(".aluno");

  switch (filterValue) {
    case "nota":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorNota(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    case "idade":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorIdade(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    case "nome":
      alunos.forEach((aluno) => {
        aluno.remove()
      })
      arrayAlunos = OrdenarPorNome(arrayAlunos)
      arrayAlunos.forEach((aluno) => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, done = 0, save = 1))
      break;

    default:
      break;
  }
};

// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = alunoInput.value;
  const inputValue2 = alunoInput2.value;
  const inputValue3 = alunoInput3.value;

  if (inputValue && inputValue2 && inputValue3) {
    saveAluno(inputValue, inputValue2, inputValue3);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let alunoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    alunoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("remove-aluno")) {
    alunoTitle = parentEl.querySelector("h3").innerText
    let removido = ExcluirAluno(arrayAlunos, alunoTitle)
    if (removido) {
      parentEl.remove();

      // Utilizando dados da localStorage

    }

  }
});

searchInput.addEventListener("keyup", (e) => {
  const busca = e.target.value;

  getBuscarAluno(busca);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterAlunos(filterValue);
});

// Local Storage

// const loadAlunos = () => {

//   arrayAlunos.forEach((aluno) => {
//     saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, 0);
//   });
// };

// loadAlunos();
