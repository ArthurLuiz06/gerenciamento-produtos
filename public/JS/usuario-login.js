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
            window.location.href = '/produtos';
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