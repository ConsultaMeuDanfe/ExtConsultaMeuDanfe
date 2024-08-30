document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se o token está armazenado no localStorage
    function checkToken() {
        const token = localStorage.getItem("token");

        if (!token) {
            document.querySelector('.temCadastro').style.display = 'none';
            document.querySelector('.naoTemCadastro').style.display = 'block';
            document.querySelector('.Status').style.display = 'none';
        } else {
            document.querySelector('.temCadastro').style.display = 'block';
            document.querySelector('.naoTemCadastro').style.display = 'none';
            document.querySelector('.Status').style.display = 'block';
        }
    }

    // Chama a função ao carregar o popup
    checkToken();

    // Adiciona um listener ao botão "Cadastrar" para redirecionar o usuário
    document.getElementById("btnCadastrarToken").addEventListener("click", function () {
        localStorage.setItem("token", document.querySelector('.token').value);
        checkToken();
    });

    document.getElementById("btnRemoverToken").addEventListener("click", function () {
        localStorage.removeItem("token");
        checkToken();
    });

    document.getElementById("btnConsultaXML").addEventListener("click", function () {
        document.querySelector('.Status').textContent = 'Consultando XML...';
        document.querySelector('.erro').style.display = 'none';
        var chave = document.querySelector('.chave').value;
        var token = localStorage.getItem("token");

        var data = JSON.stringify({
            "chave": chave,
            "token": token
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // Verifica o status da resposta HTTP
                if (this.status === 200) {
                    // Status 200 indica sucesso, então apenas faz log
                    document.querySelector('.Status').textContent = 'Consulta realizada com sucesso!';
                    document.querySelector('.campoXML').value = this.responseText;
                    console.log(this.responseText);
                } else {
                    // Qualquer outro status indica erro
                    document.querySelector('.Status').textContent = 'Erro na consulta XML!';
                    document.querySelector('.erro').style.display = 'block';
                    document.querySelector('.erro').textContent = this.responseText;
                    console.log(this.responseText);
                }
            }
        });

        xhr.open("POST", "https://api.consultameudanfe.com.br/ConsultaNota");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

        checkToken();
    });

    document.getElementById("btnConsultaDANFe").addEventListener("click", function () {
        document.querySelector('.Status').textContent = 'Gerando DANFe...';
        document.querySelector('.erro').style.display = 'none';
        var chave = document.querySelector('.chave').value;
        var token = localStorage.getItem("token");

        var data = JSON.stringify({
            "chave": chave,
            "token": token
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // Verifica o status da resposta HTTP
                if (this.status === 200) {
                    var downloadLink = document.createElement('a');
                    document.querySelector('.Status').textContent = 'Consulta realizada com sucesso!';
                    document.querySelector('.campoXML').value = '';

                    // Configura o link de download
                    var base64Data = this.responseText; // Base64 vindo da resposta
                    var mimeType = 'application/octet-stream'; // Tipo MIME padrão para arquivos binários

                    // Cria uma URL de dados com o conteúdo base64
                    var dataUrl = 'data:' + mimeType + ';base64,' + base64Data;

                    downloadLink.href = dataUrl;
                    downloadLink.download = chave + '.pdf'; // Nome do arquivo a ser baixado
                    downloadLink.click(); // Aciona o download automaticamente
                } else {
                    // Qualquer outro status indica erro
                    document.querySelector('.Status').textContent = 'Erro na gerar DANFe!';
                    document.querySelector('.erro').style.display = 'block';
                    document.querySelector('.erro').textContent = this.responseText;
                    console.log(this.responseText);
                }
            }
        });

        xhr.open("POST", "https://api.consultameudanfe.com.br/GerarDanfe");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

        checkToken();
    });
});
