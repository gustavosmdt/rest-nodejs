# API REST com NodeJS

Este projeto foi realizado com o intuito de estudar e aprender sobre NodeJS. Sendo meu primeiro contato com o framework, aproveitei para implementar testes e2e de API com PactumJS + Cucumber.

- Projeto desenvolvido a partir do curso [REST API com Node.JS](https://www.youtube.com/watch?v=d_vXgK4uZJM&list=PLWgD0gfm500EMEDPyb3Orb28i7HK5_DkR)
- Testes inspirados no [Boilerplate Project](https://github.com/pactumjs/pactum-cucumber-boilerplate)

## Requisitos
Para realizar o projeto, utilizei as seguintes versões:
- [NodeJS](https://nodejs.org/en/) (v16.16.0)
- NPM (v8.16.0)

## Instalação
Após clonar o repositório, rode o comando `npm install` (ou `npm i` como diminutivo)

## Configurações
- Para a aplicação funcionar é necessário a criação do banco de dados, portanto, execute as seguintes querys para criar o banco de dados e as tabelas:

```sql
CREATE DATABASE comercio;

CREATE TABLE usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(55) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_usuario)
);

CREATE TABLE produtos (
  id_produto INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  preco FLOAT NOT NULL
  PRIMARY KEY (id_produto)
);

CREATE TABLE pedidos (
  id_pedidos INT NOT NULL AUTO_INCREMENT,
  quantidade SMALLINT NOT NULL,
  id_produto INT
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
```

- É necessário atualizar o arquivo `nodemon.json` com os dados do banco local.

## Rodando a aplicação e os testes
Para executar a aplicação, execute o script `npm start` ou `nodemon server.js`

Para executar os testes, execute o script `npm test` ou `cucumber-js`
