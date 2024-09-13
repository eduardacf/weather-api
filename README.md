## 🌦️ Weather API 🌦️

## 📄 Descrição

A Weather API é uma aplicação backend robusta e escalável que fornece previsões meteorológicas precisas para diferentes localidades ao redor do mundo. Desenvolvida com Node.js e Express, a aplicação integra-se ao MongoDB Atlas para armazenamento de dados e ao Redis para caching eficiente, garantindo respostas rápidas e desempenho otimizado. Utilizando a API do OpenWeatherMap, a Weather API oferece dados meteorológicos atualizados, incluindo temperatura, umidade, condições climáticas e muito mais. Além disso, a aplicação implementa autenticação segura de usuários com JWT (JSON Web Tokens), permitindo que os usuários registrem-se, façam login e recuperem suas senhas de forma segura.

## ✨ Funcionalidades

*   📝 Registro de novos usuários
*   🔑 Login de usuários existentes
*   🔄 Recuperação de senha
*   🌍 Obtenção de previsão do tempo por cidade
*   ⚡ Armazenamento em cache das previsões para melhorar a performance
*   📊 Armazenamento de histórico de consultas no MongoDB Atlas

## 🛠️ Tecnologias Utilizadas

*   Node.js
*   Express.js
*   MongoDB Atlas
*   Redis
*   JWT (JSON Web Tokens)
*   Axios
*   Dotenv

## 📋 Pré-requisitos

*   Node.js instalado
*   MongoDB Atlas configurado
*   Redis instalado e em execução
*   Conta no OpenWeatherMap para obter a chave da API

## 🚀 Instalação

1\. Clone o repositório:   

```plaintext
   git clone https://github.com/seu-usuario/weather-api.git
   cd weather-api
```

2\. Instale as dependências:   

```plaintext
   npm install
```

3\. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:   

```plaintext
   MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=sua_chave_secreta_jwt
   WEATHER_API_KEY=sua_chave_api_openweathermap
   PORT=5000
```

4\. Inicie o servidor Redis:   

```plaintext
   redis-server
```

  Ou, se estiver usando Docker:   

```plaintext
   docker run --name redis-server -p 6379:6379 -d redis
```

5\. Inicie a aplicação:   

```plaintext
   npm start
```

  Ou, para desenvolvimento com reinício automático:   

```plaintext
   npm run dev
```

## 📚 Uso

### 📝 Registro de Usuário

*   Endpoint: `POST /api/auth/registrar`

**Corpo da Requisição:**

```plaintext
  {
    "nome": "Seu Nome",
    "email": "seu.email@example.com",
    "senha": "sua_senha"
  }
```

### 🔑 Login de Usuário

*   Endpoint: `POST /api/auth/login`

**Corpo da Requisição**

```plaintext
  {
    "email": "seu.email@example.com",
    "senha": "sua_senha"
  }
```

### 🔄 Recuperação de Senha

*   Endpoint: `POST /api/auth/recuperar-senha`

**Corpo da Requisição:**

```plaintext
  {
    "email": "seu.email@example.com"
  }
```

### 🌍 Obter Previsão do Tempo

*   Endpoint: `GET /api/tempo`
    *   Parâmetros de Consulta:  
        *   `cidade`: Nome da cidade
    *   Cabeçalho da Requisição:  
        *   `x-auth-token`: Token JWT obtido após o login

**Exemplo de Requisição:**

```plaintext
  curl -H "x-auth-token: seu_token_jwt" "http://localhost:5000/api/tempo?cidade=London"
```