document.addEventListener('DOMContentLoaded', () => {
    listarProdutos();
});

async function listarProdutos() {
    const listaProdutosDiv = document.getElementById('listaProdutos');

    try {
        const resposta = await fetch('/produtos/data');

        if (!resposta.ok) {
            // Se a API falhar, ao menos exibe a mensagem de erro.
            throw new Error('Falha ao carregar os dados dos produtos. Status: ' + resposta.status);
        }

        const produtos = await resposta.json();

        if (produtos.length === 0) {
            listaProdutosDiv.innerHTML = '<p class="mensagem-vazio">Nenhum produto encontrado no momento.</p>';
            return;
        }

        listaProdutosDiv.innerHTML = ''; // Limpa a lista antes de popular

        // Itera sobre cada produto e cria o cartão HTML
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';

            // MONTAGEM DO HTML COM A IMAGEM E DADOS (CORREÇÃO DE SINTAXE)
            card.innerHTML = `
    <div class="img-wrapper"> <img src="${produto.IMAGEM_URL || ''}" alt="${produto.NOME}" class="produto-imagem">
    </div>
    
    <h3 class="produto-nome">${produto.NOME}</h3>
    <p class="produto-descricao">${produto.DESCRICAO || 'Sem descrição.'}</p>
    <p class="produto-valor">
        <strong>R$ ${parseFloat(produto.VALOR).toFixed(2).replace('.', ',')}</strong>
    </p>
    <button class="botao-comprar" onclick="comprarProduto(${produto.IDPRODUTO})">Comprar</button>
`;

            listaProdutosDiv.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro na listagem de produtos:', erro);
        listaProdutosDiv.innerHTML = `<p class="erro-conexao">Erro ao conectar com o servidor para buscar produtos. Consulte o console para detalhes.</p>`;
    }
}

async function comprarProduto(idProduto) {
    // Por simplicidade, vamos fixar a compra em 1 unidade por vez.
    const quantidadeDesejada = 1;

    try {
        const resposta = await fetch('/comprar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idproduto: idProduto, // Chave deve ser igual ao que o Controller espera
                quantidade: quantidadeDesejada
            })
        });

        const data = await resposta.json();

        if (resposta.ok) {
            alert(data.mensagem); // Mensagem de sucesso
            // Atualiza a lista após a compra (ideal para mostrar o estoque atualizado)
            listarProdutos();
        } else {
            alert('Erro na compra: ' + (data.erro || 'Erro desconhecido.'));
        }

    } catch (erro) {
        console.error('Falha na comunicação com a API de compra:', erro);
        alert('Falha de conexão com o servidor. Tente novamente.');
    }
}