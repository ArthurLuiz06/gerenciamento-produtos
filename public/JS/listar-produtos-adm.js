const tabelaCorpo = document.querySelector('#tabelaProdutosAdm tbody'); 
const mensagemStatusListagem = document.getElementById('mensagemStatusListagem'); 

function redirecionarParaEdicao(idproduto) {
    //Redireciona para o novo HTML de edição, passando o ID na URL
    window.location.href = `/produto-edicao.html?idproduto=${idproduto}`;
}


// FUNÇÃO DE EXCLUSÃO (DELETE) ---
async function excluirProduto(idproduto) {
    if (!confirm(`Tem certeza que deseja excluir o produto ID ${idproduto}? Esta ação é irreversível.`)) {
        return; 
    }

    try {
        // Envia a requisição DELETE para a rota: /admin/produtos/{idproduto}
        const resposta = await fetch(`/admin/produtos/${idproduto}`, {
            method: 'DELETE'
        });

        const data = await resposta.json();

        if (resposta.ok) {
            alert(data.mensagem);
            // Recarrega a lista para remover o item deletado
            listarProdutosAdm(); 
        } else {
            alert('Erro ao excluir: ' + (data.erro || 'Erro desconhecido.'));
        }

    } catch (erro) {
        console.error('Falha na comunicação com a API de exclusão:', erro);
        alert('Falha de conexão com o servidor.');
    }
}


// FUNÇÃO PARA LISTAR E RENDERIZAR A TABELA (READ) ---
async function listarProdutosAdm() {
    mensagemStatusListagem.textContent = 'Carregando produtos...';
    tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de carregar

    try {
        // Rota GET que criei: /admin/produtos/data
        const resposta = await fetch('/admin/produtos/data');
        const produtos = await resposta.json();
        
        if (!resposta.ok || produtos.length === 0) {
            mensagemStatusListagem.textContent = 'Nenhum produto cadastrado.';
            return;
        }

        produtos.forEach(produto => {
            const row = tabelaCorpo.insertRow();
            row.insertCell().textContent = produto.IDPRODUTO;
            row.insertCell().textContent = produto.NOME;
            row.insertCell().textContent = produto.DESCRICAO || '-'; // Tratamento para nulo
            row.insertCell().textContent = `R$ ${produto.VALOR.toFixed(2).replace('.', ',')}`;
            row.insertCell().textContent = produto.QUANTIDADE;
            row.insertCell().textContent = produto.IMAGEM_URL ? produto.IMAGEM_URL.substring(0, 30) + '...' : '-';

            // Coluna de Ações
            const cellAcoes = row.insertCell();
            
            // BOTÃO DE EDIÇÃO: Agora chama a função de redirecionamento
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => redirecionarParaEdicao(produto.IDPRODUTO);
            cellAcoes.appendChild(btnEditar);
            
            // BOTÃO DE EXCLUSÃO
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirProduto(produto.IDPRODUTO);
            cellAcoes.appendChild(btnExcluir);
        });

        mensagemStatusListagem.textContent = `Total de ${produtos.length} produtos listados.`;

    } catch (erro) {
        console.error('Erro ao listar produtos:', erro);
        mensagemStatusListagem.textContent = 'Erro ao carregar a lista de produtos.';
    }
}

// INICIALIZAÇÃO
// Inicia a listagem assim que a página é carregada
document.addEventListener('DOMContentLoaded', listarProdutosAdm);