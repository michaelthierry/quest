
const perguntas = document.querySelector(".pergunta");
const opcoes = document.querySelector(".opcoes");
const quantidadeOpcao = document.querySelector(".opcoes");
const animacao = document.querySelector(".animation");
const fundo = document.querySelector("#body");
const form = document.querySelector("#form-id");
const areOpcao = document.getElementById('areaOpcao');
const frameBt2 = document.getElementById('frame-button2')
const images = [
    'img/img01.jpg',
    'img/img02.jpg',
    'img/img03.jpg',
    'img/img04.jpg',
    'img/img05.jpg',
    'img/img06.jpg',
    'img/img07.jpg',
    'img/img08.jpg',
    'img/img09.jpg',
    'img/img10.jpg',
];

let indiceQuestao = 0;
let clickedButtonValue = '';
var index=1;
let botao_clicado = [];

import questions from './scripts/questions.js';

// adiciona a função carregar questão ao botao iniciar
document.getElementById('iniciar').addEventListener('click', carregaQuestao);

// Exibe mensagem no fim da pesquisa
function fimPesquisa(){

    console.log("enviado");
    opcoes.innerHTML = '';
    perguntas.innerHTML = '';
    const div = document.createElement("div");
    div.innerHTML = `
    <h3 id="quest">
        Obrigado por responder, até mais! 
    </h3>
    `;

    perguntas.appendChild(div);
    deletButtonsNavegate();
    /*setTimeout(() => {
        location.reload(); // Recarrega a página após 2 segundos
    }, 5000);*/
}
// carrega a proxima questão
function proximaQuestao(e){
    // verifica se o indice é menor quantidade de questões 
    if(indiceQuestao < questions.length - 1){
        // incrementa o indice
        indiceQuestao++;
        botao_clicado.push(e);
        // chama a função para carregar questão seguinte
        carregaQuestao();
        console.log("valor Index "+`${e}`);
    }else{
        console.log("fim");
    }
    
}
// carrega a questão anterior
function anteriorQuestao(e){
    // verifica se o indie
    if(indiceQuestao > 0){
        indiceQuestao--;
        index--;
        carregaQuestao();
    }else{
        console.log("primeira questão");
    }
}
// cria botão de enviar resposta
function enviarResposta(e){
    // adiciona a opção vetor
    botao_clicado.push(e);
    perguntas.innerHTML='';
    opcoes.innerHTML = '';
    
    const div = document.createElement("div");
    div.innerHTML = `
        <button type="submit" id="iniciar">
           Enviar
        </button>
    `;
    console.log("valor Index "+`${e}`);
    div.addEventListener('click', (evento) => {
        evento.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data.botao_clicado = botao_clicado;
        const jsonData = JSON.stringify(data);
        //console.log(jsonData);
        var e = {
            "botao_clicado": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        };
        console.log("Enviando JSON:", e);
        
        fetch('https://script.google.com/macros/s/AKfycby4GxOSku7aaoddB7QPU0DDVFHcKw_J8x-B_2cXQCSu7uOFXv5H7y2gNdPxEfF86Cq2KA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:'no-cors',
            body: JSON.stringify(e)
        })
        .then(data => {
            console.log('Resposta recebida:', data);
            fimPesquisa();
        })
        .catch(error => {
            console.log('Erro:', error);
        });
        
        //fimPesquisa();
        // (async() => {
        //     const w = await write([['1'], ['2']]) 
        //     console.log(w)
        // })      

    });
    opcoes.appendChild(div);
}
// carrega questões na tela de questões
function carregaQuestao(){
    // verifica se o bota iniciar chamou e o remove
    const div = document.getElementById('iniciar');
    if(div){
        div.remove();
    }
    
    // pega a quantidade de resposta da questão
    quantidadeOpcao.innerHTML = `${indiceQuestao + 1} / ${questions.length}`;
    // pega a pergunta da lista de perguntas no indice indicado
    const item = questions[indiceQuestao];
    //pega a pergunta do item
    perguntas.innerHTML = `<h4 id="quest">${item.questao}</h4>`
    // Caso seja a ultima questão: os botões devem chamar a função de enviar respostas
    if(indiceQuestao == questions.length - 1){
        insereUltimosBotoes(item);
        
    }else{

        if(indiceQuestao == 0){
            createButonProx();
        }else{
            createButonProx();
            createButonBack();
            console.log(indiceQuestao);
        }
        //caso contrario
        insereBotoes(item);
    
    }
}

function insereBotoes(item){
    // atualiza o indice para valor 1
    index = 1;
    // para todas possiveis resposta da pergunta 
    item.respostas.forEach((resposta) =>{
        // percorre todas as opções da questão construindo os botões
        const div = document.createElement("div");
        div.innerHTML = `
            <button class="resposta" value="${index}">
                ${resposta.opcao}
            </button>
        `;
        // atualiza o indice
        index++;
        // adiciona o envento de proxima questão
        div.addEventListener('click', (evento) => proximaQuestao(evento.target.value));
        // adiciona o botão na tela de opções
        opcoes.appendChild(div);
    });
    // atualiza a imagem de fudo
    fundo.style.backgroundImage = `url('${images[indiceQuestao]}')`;
}

function insereUltimosBotoes(item){
    frameBt2.innerHTML = '';
    // atualiza o indice
    index = 1;
    // para cada questão da 
    item.respostas.forEach((resposta) =>{
        // cria um botão para a opção
        const div = document.createElement("div");
        div.innerHTML = `
            <button class="resposta" value="${index}">
                ${resposta.opcao}
            </button>
        `;
        index++;
        // adiciona o envento de enviar resposta
        div.addEventListener('click', (evento) => enviarResposta(evento.target.value));
        // adiciona o botão na tela de opções
        opcoes.appendChild(div);
    });
    //imagem de fundo é atualizada
    fundo.style.backgroundImage = `url('${images[indiceQuestao]}')`;
}

function createButonBack(){
    const frame = document.getElementById('frame-button1')
    frame.innerHTML = `
        <button id="back" class="botaoNavegador">
            <div id="back-div1"></div>
            <div id="back-div2"></div>
        </button>
    `
    document.getElementById('back').addEventListener('click', anteriorQuestao);
}

function createButonProx(){
    const frame = document.getElementById('frame-button2');
    frame.innerHTML = `
        <button id="prox" class="botaoNavegador">
            <div id="prox-div1"></div>
            <div id="prox-div2"></div>
        </button>
    `
    document.getElementById('prox').addEventListener('click', proximaQuestao);

}

function deletButtonsNavegate(){
    const bt1 = document.getElementById('frame-button1');
    const bt2 = document.getElementById('frame-button2');
    bt1.remove()
    bt2.remove()
}

async function write(values){
    const sh = google.sheets({version:'v4', auth});
    const id = '1-p0IUOw7leuWUFs0dwsWZ_jYAv7eGiLyS4PqohGwELw'
    const range = 'Sheet1!A1';
    const opt = 'USER_ENTERED'
    const rec = {values}

    try{
        const res = await sh.spreadsheats.values.update({
            id, range, opt, rec
        })
        
        return res;
    }catch(error){
        console.error('Erro:', error)
    }
}