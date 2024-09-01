# Processo Seletivo NUTI - Backend

Este projeto foi desenvolvido como parte de um teste técnico para um processo seletivo da NUTI. O backend da aplicação foi construído para suportar a consulta e o armazenamento de contratos de órgãos públicos, utilizando a API do Portal Nacional de Contratações Públicas (PNCP) e armazenando os dados em um banco de dados PostgreSQL.

## Tecnologias Utilizadas

A aplicação foi construída utilizando as seguintes tecnologias e frameworks:

- **Java 17**: Linguagem de programação utilizada para o desenvolvimento da aplicação.
- **Spring Boot**: Framework para construção de aplicações Java, fornecendo módulos como Spring Data JPA e Spring Web.
- **Spring Data JPA**: Para a persistência de dados com o banco de dados PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados das consultas e contratos.
- **Lombok**: Biblioteca Java que minimiza o código boilerplate, fornecendo anotações para geração automática de getters, setters, construtores, entre outros.
- **Docker**: Para containerização do banco de dados PostgreSQL, facilitando a configuração e execução em diferentes ambientes.
- **Maven**: Ferramenta de automação de build e gerenciamento de dependências.

## Estrutura do Projeto

O backend é responsável por receber as requisições do frontend, e armazenar os dados em um banco de dados PostgreSQL. A aplicação foi organizada em camadas para garantir a separação de responsabilidades:

- **Controller**: Camada responsável por receber as requisições HTTP e direcioná-las para os serviços apropriados.
- **Service**: Camada que contém a lógica de negócio da aplicação. Aqui, os dados são processados antes de serem persistidos ou retornados ao cliente.
- **Repository**: Camada de acesso ao banco de dados, utilizando Spring Data JPA para realizar operações CRUD.
- **DTOs (Data Transfer Objects)**: Objetos utilizados para transferência de dados entre as camadas da aplicação e para comunicação com o frontend.
- **Exceptions**: Gerenciamento de exceções personalizadas para tratamento de erros de forma consistente.

## Instalação e Configuração

Siga os passos abaixo para configurar e rodar a aplicação localmente:

### Pré-requisitos

Certifique-se de ter o Java 17 e o Docker instalados na sua máquina:

- **Java 17**: Versão recomendada para rodar a aplicação.
- **Maven**: Para compilar e gerenciar dependências do projeto.
- **Docker**: Para execução do banco de dados PostgreSQL em um container.

### Passo a Passo

1. **Clone o repositório do projeto:**

   ```bash
   git clone https://github.com/Parron01/TestePraticoNUTI-Backend.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd TestePraticoNUTI/BACKEND
   ```

3. **Suba o banco de dados PostgreSQL com Docker:**

   Certifique-se de que o Docker está instalado e rodando, então execute:

   ```bash
   docker-compose up -d
   ```

   Isso criará um container com o PostgreSQL configurado de acordo com o arquivo `docker-compose.yml`.

4. **Configure o banco de dados no `application.properties`:**

   O arquivo `src/main/resources/application.properties` já está configurado para conectar-se ao banco de dados PostgreSQL. Se necessário, ajuste as configurações de acordo com seu ambiente.

5. **Compile e rode a aplicação:**

   Com Maven:

   ```bash
   mvn spring-boot:run
   ```

6. **Acesse a API no navegador ou via Postman:**

   A API estará disponível no endereço: [http://localhost:8080](http://localhost:8080)

## Endpoints da API

- **POST `/api/consultas`**: Cria uma nova consulta e armazena os contratos relacionados.
- **GET `/api/consultas`**: Retorna todas as consultas realizadas, sem incluir os contratos relacionados a cada consulta.
- **GET `/api/consultas/{id}`**: Retorna os detalhes de uma consulta específica, incluindo os contratos relacionados.
- **DELETE `/api/consultas/{id}`**: Remove uma consulta do banco de dados.

## Considerações Finais

Este backend foi desenvolvido com o intuito de fornecer uma base robusta para o gerenciamento de consultas e contratos de órgãos públicos, facilitando o armazenamento e recuperação dessas informações.
