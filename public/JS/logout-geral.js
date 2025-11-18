/* Arquivo: public/JS/logout-geral.js */

const btnSairConta = document.getElementById('btnSairConta');

async function sairDaConta() {
    if (!confirm('Tem certeza que deseja sair da conta?')) {
        return;
    }
    
    try {
        const resposta = await fetch('/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resposta.ok) {
            alert('Sessão encerrada com sucesso.');
            window.location.href = '/'; 
        } else {
            const data = await resposta.json();
            alert('Erro ao sair da conta: ' + (data.erro || 'Tente novamente.'));
        }
    } catch (erro) {
        console.error('Erro de conexão ao tentar sair:', erro);
        alert('Falha de conexão com o servidor.');
    }
}

if (btnSairConta) {
    btnSairConta.addEventListener('click', sairDaConta);
}