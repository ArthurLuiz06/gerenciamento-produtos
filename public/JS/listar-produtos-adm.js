document.addEventListener('DOMContentLoaded', () => {

    listarProdutosAdm();
});

async function listarProdutosAdm() {
    const tbody = document.querySelector('#tabelaProdutosAdm tbody');
    const msgStatus = document.getElementById('mensagemStatusListagem');
    tbody.innerHTML = ''; // Limpa a tabela antes de recarregar

    try {
       
        const resposta = await fetch('/admin/produtos/data'); 
        
        if (!resposta.ok) {
            throw new Error('Falha ao carregar os dados. Status: ' + resposta.status);
        }

        const produtos = await resposta.json();
        
        if (produtos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        
        produtos.forEach(produto => {
            const row = tbody.insertRow();
            
           
            row.insertCell().textContent = produto.IDPRODUTO;
            row.insertCell().textContent = produto.NOME;
            row.insertCell().textContent = produto.DESCRICAO || 'N/A';
            row.insertCell().textContent = `R$ ${parseFloat(produto.VALOR).toFixed(2).replace('.', ',')}`;
            
           
            row.insertCell().textContent = produto.QUANTIDADE; 
            
            row.insertCell().textContent = produto.IMAGEM_URL ? 'Sim' : 'Não';

            
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


function editarProduto(id) {
    alert(`Funcionalidade Editar para ID ${id} será implementada.`);
}

async function excluirProduto(idproduto) {
    if (!confirm(`Tem certeza que deseja excluir o produto ID ${idproduto}? Esta ação é irreversível.`)) {
        return; // Usuário cancelou
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