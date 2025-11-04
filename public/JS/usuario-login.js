const form = document.getElementById('formLogin')
const msg = document.getElementById('mensagem')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value.trim()
    const senha = document.getElementById('senha').value.trim()

    try {
        const resposta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })

        if (resposta.ok) {
            console.log('Login OK');

            const data = await resposta.json();
            const tipoUsuario = data.tipo;
        
            if (tipoUsuario === 'adm') {
                console.log("Usuário é ADM. Redirecionando para a área de produtos ADM.");
                window.location.href = '/admin/produtos'; // Rota para o gerenciamento de produtos (ADM)
            } else {
                console.log("Usuário comum. Redirecionando para a área de compras.");
                window.location.href = '/produtos'; // Rota para a área de compras/visualização (Comum)
            }

        } else {
            const data = await resposta.json();
            msg.style.color = 'red';
            msg.textContent = data.erro || 'Erro ao fazer o login';
        }

    } catch (erro) {
        msg.style.color = 'red'
        msg.textContent = 'Falha na conexão com o servidor'
        console.error('Erro na requisição', erro)
    }
})