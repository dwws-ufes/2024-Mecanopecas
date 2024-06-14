# Imagem oficial do Node.js mais recente como imagem base
FROM node:latest

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiando os arquivos package.json e package-lock.json para o diretório de trabalho no container
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando todos os arquivos do diretório atual no host para o diretório de trabalho no container
COPY . .

# Expondo a porta 5173 para que a aplicação possa ser acessada externamente
EXPOSE 5173

# Comando padrão para rodar a aplicação
CMD ["npm", "run", "dev"]
