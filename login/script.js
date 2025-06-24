document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const output = document.getElementById('output');

    if (!form || !username || !password) {
        console.error('Um ou mais elementos não foram encontrados no DOM.');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameValue = username.value;
        localStorage.setItem('username', usernameValue);

        if (output) {
            output.textContent = `Usuário: ${usernameValue}`;
            output.style.display = 'block';
            output.style.color = 'green';
            output.style.fontSize = '20px';
            output.style.fontWeight = 'bold';
        }

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    });
});
