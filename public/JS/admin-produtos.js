const form = document.getElementById('formCadastroProduto');
const msg = document.getElementById('mensagemStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value); // Converte para número
    const estoque = parseInt(document.getElementById('estoque').value, 10); // Converte para inteiro
    const imagem_url = document.getElementById('imagem_url').value;

    try {
        const resposta = await fetch('/admin/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, descricao, valor, estoque, imagem_url })
        });

        const data = await resposta.json();

        if (resposta.ok) {
            msg.style.color = 'green';
            msg.textContent = data.mensagem; 
            form.reset(); // Limpa o formulário após o sucesso
            
            // Futuramente: chamar a função para atualizar a lista de produtos na tela
        } else {
            msg.style.color = 'red';
            msg.textContent = data.erro || 'Erro desconhecido ao cadastrar produto.';
        }
    } catch (erro) {
        msg.style.color = 'red';
        msg.textContent = 'Falha de conexão com a API.';
        console.error('Erro na requisição de cadastro:', erro);
    }
});