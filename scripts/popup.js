document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se o token está armazenado no localStorage
    function checkToken() {
        const token = localStorage.getItem("token");

        if (!token) {
            document.querySelector('.temCadastro').style.display = 'none';
            document.querySelector('.naoTemCadastro').style.display = 'block';

        } else {
            document.querySelector('.temCadastro').style.display = 'block';
            document.querySelector('.naoTemCadastro').style.display = 'none';
        }
    }

    // Chama a função ao carregar o popup
    checkToken();
});
