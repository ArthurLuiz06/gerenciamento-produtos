/* Arquivo: public/JS/produto-edicao.js */

// --- 1. SELETORES DE PÁGINA ---
const formEdicao = document.getElementById('formEdicaoProduto');
const inputID = document.getElementById('idProduto');
const inputNome = document.getElementById('nome');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const inputQuantidade = document.getElementById('quantidade');
const inputImagemUrl = document.getElementById('imagem_url');
const mensagemStatus = document.getElementById('mensagemStatus');
const nomeProdutoEditando = document.getElementById('nomeProdutoEditando');

let idProdutoParaEdicao = null;

// --- 2. FUNÇÃO PARA PEGAR O ID DA URL ---
function obterIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('idproduto');
}

// --- 3. LÓGICA DE BUSCA E PREENCHIMENTO (GET) ---
async function carregarProdutoParaEdicao(id) {
    if (!id) {
        mensagemStatus.textContent = 'ID do produto não encontrado na URL.';
        mensagemStatus.style.color = 'red';
        return;
    }
    
    idProdutoParaEdicao = id;
    mensagemStatus.textContent = `Carregando produto ID ${id}...`;

    try {
        // Rota GET que você já criou: /admin/produtos/:idproduto
        const resposta = await fetch(`/admin/produtos/${id}`);
        
        if (!resposta.ok) throw new Error('Produto não encontrado ou falha na API.');

        const produto = await resposta.json();

        // Preenche os campos do formulário
        inputID.value = produto.IDPRODUTO; 
        inputNome.value = produto.NOME || '';
        inputDescricao.value = produto.DESCRICAO || '';
        // Note: Campos nulos do banco vêm como null, tratamos como string vazia ou valor
        inputValor.value = produto.VALOR || ''; 
        inputQuantidade.value = produto.QUANTIDADE || '';
        inputImagemUrl.value = produto.IMAGEM_URL || '';
        
        nomeProdutoEditando.textContent = produto.NOME;
        mensagemStatus.textContent = 'Pronto para edição.';
        mensagemStatus.style.color = 'green';

    } catch (erro) {
        console.error('Erro ao carregar produto:', erro);
        mensagemStatus.textContent = 'Erro ao carregar dados: ' + erro.message;
        mensagemStatus.style.color = 'red';
    }
}

// --- 4. LÓGICA DE SALVAR ALTERAÇÕES (PUT) ---
async function salvarAlteracoes(event) {
    event.preventDefault();

    const id = idProdutoParaEdicao;
    if (!id) return;

    // Monta o objeto de dados a ser enviado (o mesmo formato do cadastro)
    const dadosAtualizados = {
        nome: inputNome.value,
        descricao: inputDescricao.value,
        valor: inputValor.value,
        quantidade: inputQuantidade.value,
        imagem_url: inputImagemUrl.value
    };

    mensagemStatus.textContent = 'Enviando alterações...';
    
    try {
        // Rota PUT que você já criou: /admin/produtos/:idproduto
        const resposta = await fetch(`/admin/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        const data = await resposta.json();

        if (resposta.ok) {
            mensagemStatus.textContent = data.mensagem + ' Redirecionando...';
            mensagemStatus.style.color = 'blue';
            // Redireciona de volta para a lista após 2 segundos
            setTimeout(() => {
                window.location.href = '/listar-produtos-adm.html';
            }, 2000); 

        } else {
            mensagemStatus.textContent = 'Erro ao salvar: ' + (data.erro || 'Erro desconhecido.');
            mensagemStatus.style.color = 'red';
        }
    } catch (erro) {
        console.error('Falha na requisição PUT:', erro);
        mensagemStatus.textContent = 'Falha de conexão ao tentar salvar a edição.';
        mensagemStatus.style.color = 'red';
    }
}

// --- 5. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    const id = obterIdDaUrl();
    carregarProdutoParaEdicao(id);
    
    // Adiciona o listener de submissão do formulário
    if (formEdicao) {
        formEdicao.addEventListener('submit', salvarAlteracoes);
    }
});