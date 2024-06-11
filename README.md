# 2024-Mecanopecas
Assignment for the 2024 edition of the "Web Development and the Semantic Web" course, by Henrick Bartolo Aarestrup and Iury Candeias Nogueira da Gama

Para iniciar o projeto, tenha docker instalado em sua máquina e intellij.

Na pasta principal, rode o comando ```docker compose up --build -d```
Quando os containers estiverem up, entre em seu terminal e procure o nome do container que esta rodando o node.
Então execute o comando ```docker exec -it <nome-do-container> sh``` agora você esta no terminal do container. Primeiro rode o comando ```npm instal``` e depois ```npm run dev``` para iniciar o seu Front-Ent.

Para iniciar o servidor Back-End, entre no intelij e execute a aplicação.
