# Desafio: Sistema de Indicação (Processo Seletivo)

Este projeto é uma Single Page Application (SPA) que implementa um sistema de cadastro e indicação de usuários com pontuação, construído como parte de um processo seletivo. A aplicação foi desenvolvida seguindo todos os requisitos técnicos, funcionais e de estilização propostos.

## Funcionalidades

* **Cadastro de Usuários:** Novos usuários podem se registrar com nome, e-mail e senha.
* **Sistema de Indicação:** Após o cadastro, cada usuário recebe um link de indicação único.
* **Pontuação:** Quando um novo usuário se cadastra através de um link de referência, o usuário que o indicou ganha 1 ponto.
* **Perfil de Usuário:** Uma página de perfil exibe os dados do usuário, sua pontuação atual e o link de indicação.
* **Persistência de Dados:** As informações dos usuários são salvas em um banco de dados SQL, garantindo que os dados permaneçam mesmo após o servidor ser reiniciado.
* **Sessão de Usuário:** A aplicação "lembra" do usuário ao recarregar a página, mostrando diretamente o perfil sem a necessidade de um novo login.

## Tecnologias Utilizadas e Justificativas

### Front-end

* **Tecnologia:** HTML, CSS e JavaScript Puros (Vanilla JS).
* **Justificativa:** A escolha por não utilizar frameworks como React ou Vue foi deliberada para demonstrar um domínio sólido das tecnologias fundamentais da web. Esta abordagem foca na manipulação direta do DOM, no gerenciamento de estado manual e no uso da Fetch API nativa do navegador para comunicação com o back-end, mostrando proficiência nas bases do desenvolvimento front-end.

### Back-end

* **Tecnologia:** Node.js com Express.js e SQLite.
* **Justificativa:** Node.js e Express foram escolhidos por formarem um ecossistema leve, rápido e extremamente popular para a criação de APIs REST. Para o armazenamento de dados, optou-se pelo **SQLite**, um banco de dados SQL robusto e serverless. Essa escolha torna o projeto mais profissional ao garantir a persistência dos dados, sem a complexidade de configurar um servidor de banco de dados externo. O banco de dados inteiro fica contido em um único arquivo (`database.db`), facilitando a execução e o compartilhamento do projeto.

## Como Executar o Projeto Localmente

**Pré-requisitos:**
* É necessário ter o [Node.js](https://nodejs.org/) instalado.
* Recomenda-se o uso do Visual Studio Code com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

**1. Back-end:**

No terminal, navegue até a pasta do projeto e execute os seguintes comandos:

```bash
# 1. Entre na pasta do back-end
cd backend

# 2. Instale as dependências (Express, CORS e SQLite)
npm install

# 3. Inicie o servidor
node server.js
```
O terminal deverá exibir a mensagem `Servidor rodando na porta 3001`. Ao iniciar pela primeira vez, um arquivo chamado `database.db` será criado nesta pasta. Deixe este terminal aberto.

**2. Front-end:**

1.  Abra a pasta `frontend` com o Visual Studio Code.
2.  Clique com o botão direito no arquivo `index.html`.
3.  Selecione a opção **"Open with Live Server"**.

Uma nova aba do navegador será aberta e a aplicação estará pronta para uso.

## Colaboração com IA

* **Ferramenta:** GitHub Copilot.
* **Utilização:** Durante o desenvolvimento, enfrentei um desafio específico de rede onde a conexão com o servidor local era recusada (`ERR_CONNECTION_REFUSED`), principalmente ao testar o link de indicação em uma janela anônima. Utilizei o Copilot como uma ferramenta de auxílio na depuração. Ele sugeriu possíveis causas para o problema, como conflitos de porta e diferenças de tratamento entre `localhost` e `127.0.0.1`.
* **Aprendizado:** Embora as sugestões da IA tenham apontado a direção correta, a solução final veio da minha própria investigação ao observar que o Live Server estava operando em uma porta (`5500`) diferente da que estava sendo usada no link (`5501`). A interação com a IA foi valiosa para acelerar o diagnóstico do problema, me ensinando a ter mais atenção sobre como os servidores de desenvolvimento gerenciam as portas de rede localmente.