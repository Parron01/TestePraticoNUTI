# Processo Seletivo NUTI - Frontend

Este projeto foi desenvolvido como parte de um teste técnico para um processo seletivo da NUTI. O objetivo é fornecer uma solução para a consulta de contratos de órgãos públicos utilizando a API do Portal Nacional de Contratações Públicas (PNCP).


## Tecnologias Utilizadas

A aplicação foi construída utilizando as seguintes tecnologias:

- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **React Router DOM**: Para o roteamento das páginas dentro da aplicação.
- **Styled-components**: Para o uso de CSS-in-JS e estilização dos componentes.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **React Icons**: Biblioteca de ícones para adicionar ícones na interface.
- **React Toastify**: Para exibição de notificações toast.
- **Vite**: Ferramenta de build rápida para desenvolvimento em projetos React.
- **ESLint**: Ferramenta para análise de código e manutenção de boas práticas.
- **Prettier**: Ferramenta de formatação de código para manter um estilo consistente.

## Instalação e Configuração

Siga os passos abaixo para configurar e rodar a aplicação localmente:

### Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina:

- **Node.js**: Versão recomendada `v14.x` ou superior.
- **NPM**: Geralmente instalado junto com o Node.js, mas você pode optar por usar o **Yarn** como alternativa.

### Passo a Passo

1. **Clone o repositório do projeto:**

   ```bash
   git clone https://github.com/Parron01/TestePraticoNUTI.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd TestePraticoNUTI
   ```

3. **Instale as dependências necessárias:**

   Se você estiver usando NPM:

   ```bash
   npm install
   ```

   Ou se estiver usando Yarn:

   ```bash
   yarn install
   ```

4. **Rode a aplicação localmente:**

   Com NPM:

   ```bash
   npm run dev
   ```

   Com Yarn:

   ```bash
   yarn dev
   ```

5. **Acesse a aplicação no navegador:**

   A aplicação estará disponível no endereço: [http://localhost:5173](http://localhost:5173)

## Configuração de Ambiente Local

Caso você esteja rodando a aplicação localmente, será necessário realizar uma pequena alteração no arquivo `api.js` para que as requisições sejam feitas para o backend local. Siga os passos abaixo:

1. **Acesse o arquivo `api.js`:**

   - Caminho: `src/services/api.js`

2. **Comente a linha que contém a URL do backend em produção e descomente a linha do `localhost`:**

   - **Antes:**
     ```javascript
     export const api = axios.create({
         // baseURL: 'http://localhost:8080',
         baseURL: 'https://testepraticonuti.onrender.com',
     });
     ```

   - **Depois:**
     ```javascript
     export const api = axios.create({
         baseURL: 'http://localhost:8080',
         // baseURL: 'https://testepraticonuti.onrender.com',
     });
     ```

3. **Salve o arquivo e rode a aplicação como indicado anteriormente.**


## Considerações Finais

 Criado com a motivação de resolver um desafio técnico para o processo seletivo da NUTI, este projeto demonstra o conhecimento adquirido até o momento por mim para solucionar o desafio da melhor maneira.
