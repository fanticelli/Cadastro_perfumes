(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_perfumes')) ?? [];
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const perfume = {
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    familia: obterFamilia(),
    fabricante: document.getElementById('fabricante').value,
    anoLancamento: document.getElementById('anoLancamento').value,
    preco: document.getElementById('preco').value
  }
  let bd_perfumes = getLocalStorage();
  bd_perfumes = [...bd_perfumes, perfume];
  setLocalStorage(bd_perfumes);

  atualizarTabela();
}

function obterFamilia(){
  const familias = document.getElementsByName('familia');

  const familiaSelect = [];

  for(const familia of familias){
    if(familia.checked){
      familiaSelect.push(familia.value);
    }
  }

  return familiaSelect;
}


function setLocalStorage(bd_perfumes) {
  localStorage.setItem('bd_perfumes', JSON.stringify(bd_perfumes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_perfumes = getLocalStorage();
  let index = 0;
  for (perfume of bd_perfumes) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${perfume.nome}</td>
        <td>${perfume.categoria}</td>
        <td>${Array.isArray(perfume.familia) ? perfume.familia.join(', ') : perfume.familia}</td>
        <td>${perfume.fabricante}</td>
        <td>${perfume.anoLancamento}</td>
        <td>${perfume.preco}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_perfumes = getLocalStorage();
  bd_perfumes.splice(index, 1);
  setLocalStorage(bd_perfumes);
  atualizarTabela();
}

//validar nome do perfume
function validarNome() { // Adaptação da função validar (10 pontos)
  const bd_perfumes = getLocalStorage();

  const nome = document.getElementById("nome");
  
  const feedbackNome = document.getElementById("feedbackNome");
  
  for (perfume of bd_perfumes) {
    if (perfume.nome == nome.value) {
      nome.setCustomValidity("Esse Perfume já foi adicionado!");
      feedbackNome.innerText = "Esse Perfume já foi adicionado!";
      return false;
    } else {
      nome.setCustomValidity("");
      feedbackNome.innerText = "Informe outro Perfume.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const nome = document.getElementById("nome");
const feedbackNome = document.getElementById("feedbackNome");
nome.addEventListener('input', validarNome);