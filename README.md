# 2024-Mecanopecas
Assignment for the 2024 edition of the "Web Development and the Semantic Web" course, by Henrick Bartolo Aarestrup and Iury Candeias Nogueira da Gama

## Configuração do Projeto

### Pré-requisitos

- Docker instalado na sua máquina

### Iniciando o Projeto

1. Clone o repositório para sua máquina local.

2. Navegue até o diretório do projeto no seu terminal.

3. Construa e inicie os containers Docker:

```docker-compose up --build -d```

4. Aguarde até que os containers estejam iniciados.

### Acessando o Frontend

- Uma vez que os containers estejam rodando, o aplicativo frontend estará acessível via `http://localhost:5173` no seu navegador web.

### Acessando o Backend

- Não são necessários passos adicionais para configurar o backend, pois ele inicia automaticamente junto com o serviço de banco de dados.

- O aplicativo backend estará acessível via `http://localhost:8080` assim que estiver completamente iniciado.

- Uma collection do Postman está disponível dentro do diretório do backend, caso seja necessário testar.

## Notas Adicionais

- Certifique-se de que todas as dependências estão instaladas e os serviços estão funcionando antes de acessar a aplicação.

- Para qualquer problema ou assistência técnica, consulte a documentação do projeto ou entre em contato com os autores.