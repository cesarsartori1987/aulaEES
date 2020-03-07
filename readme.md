# CasaNet Form API
> *API para cadastro de novas propostas de casamentos com autenticação via token*

## Requisitos
* nodejs
* npm
* mongoDB

## Dependências
*  bcrypt-nodejs@^0.0.3 
*  body-parser@^1.19.0
*  bulma@^0.8.0
*  cookie-parser@~1.4.4
*  cors@^2.8.5
*  debug@~2.6.9
*  ejs@~2.6.1
*  express@~4.16.1
*  http-errors@~1.6.3
*  jsonwebtoken@^8.5.1
*  mongoose@^5.9.3
*  morgan@^1.9.1
*  passport@^0.4.1
*  passport-jwt@^4.0.0

## Installation

> **npm install -y**

## Routes
*    **[POST]** /api/signup --> registrar novo usuario
*    **[POST]** /api/signin --> logar
*    **[POST]** /api/wedding --> postar nova proposta de casamento
*    **[GET]** /api/wedding --> receber lista de propostas de casamento cadastradas