document.addEventListener('DOMContentLoaded', () => {
    // Chama a função de listagem assim que a página carrega
    listarProdutosAdm();
});

async function listarProdutosAdm() {
    const tbody = document.querySelector('#tabelaProdutosAdm tbody');
    const msgStatus = document.getElementById('mensagemStatusListagem');
    tbody.innerHTML = ''; // Limpa a tabela antes de recarregar

    try {
        // Rota que chama o Controller ADM (que usa o Model ADM)
        const resposta = await fetch('/admin/produtos/data'); 
        
        if (!resposta.ok) {
            throw new Error('Falha ao carregar os dados. Status: ' + resposta.status);
        }

        const produtos = await resposta.json();
        
        if (produtos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        // Itera sobre cada produto e cria uma linha na tabela
        produtos.forEach(produto => {
            const row = tbody.insertRow();
            
            // As propriedades do objeto produto devem corresponder exatamente ao que o DB retorna
            row.insertCell().textContent = produto.IDPRODUTO;
            row.insertCell().textContent = produto.NOME;
            row.insertCell().textContent = produto.DESCRICAO || 'N/A';
            row.insertCell().textContent = `R$ ${parseFloat(produto.VALOR).toFixed(2).replace('.', ',')}`;
            
            // 💡 Usando QUANTIDADE, conforme seu DB
            row.insertCell().textContent = produto.QUANTIDADE; 
            
            row.insertCell().textContent = produto.IMAGEM_URL ? 'Sim' : 'Não';

            // Célula de Ações (Botões)
            const acoesCell = row.insertCell();
            
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => editarProduto(produto.IDPRODUTO); // Implementaremos depois
            acoesCell.appendChild(btnEditar);
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirProduto(produto.IDPRODUTO); // Implementaremos depois
            acoesCell.appendChild(btnExcluir);
        });
        
        msgStatus.textContent = `Total de produtos: ${produtos.length}`;

    } catch (erro) {
        console.error('Erro na listagem ADM:', erro);
        msgStatus.textContent = 'Erro ao buscar dados do servidor.';
        msgStatus.style.color = 'red';
    }
}

// 💡 Funções placeholder para o próximo passo
function editarProduto(id) {
    alert(`Funcionalidade Editar para ID ${id} será implementada.`);
}

function excluirProduto(id) {
    // Próximo passo será implementar esta função
    if (confirm(`Tem certeza que deseja excluir o produto ID ${id}?`)) {
        // Lógica de fetch DELETE virá aqui
    }
}