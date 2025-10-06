# Desafio: Sistema de Indicação (Processo Seletivo)

Olá! Este é o repositório do projeto que desenvolvi para o processo seletivo. **Foi um desafio muito bacana e vou explicar um pouco sobre ele aqui.**

A aplicação é uma Single Page Application (SPA) que implementa um sistema de cadastro e indicação de usuários com pontuação, construída seguindo todos os requisitos propostos.

## O que o projeto faz (Funcionalidades)

* **Cadastro de Usuários:** Permite que novos usuários se registrem com nome, e-mail e senha.
* **Sistema de Indicação:** Depois do cadastro, cada pessoa ganha um link único para convidar outros.
* **Pontuação:** Quando alguém se cadastra usando um link de referência, o dono do link ganha 1 ponto.
* **Perfil de Usuário:** Uma página de perfil mostra os dados do usuário, sua pontuação e o link para compartilhar.
* **Persistência de Dados:** As informações são salvas em um banco de dados SQL, então nada se perde se o servidor reiniciar.
* **Sessão de Usuário:** A aplicação "lembra" de você. Se recarregar a página, seu perfil continua lá, sem precisar fazer login de novo.

## Tecnologias que usei e por quê

### Front-end

* **Tecnologia:** HTML, CSS e JavaScript Puros (Vanilla JS).
* **Justificativa:** **Para o front-end, eu decidi não usar frameworks como React ou Vue. Meu objetivo era mostrar que tenho uma base sólida nas tecnologias essenciais da web. Acredito que** entender como manipular o DOM e se comunicar com uma API "na raça" é um conhecimento fundamental para qualquer desenvolvedor.

### Back-end

* **Tecnologia:** Node.js com Express.js e SQLite.
* **Justificativa:** **No back-end, minha escolha foi Node.js com Express.** É um ecossistema que eu gosto bastante, super leve e rápido para criar APIs. Para os dados, **comecei pensando em um array simples, mas para deixar o projeto mais profissional, optei por usar SQLite.** A ideia foi ter um banco de dados SQL de verdade, com persistência, mas sem a complexidade de ter que instalar um servidor separado. Tudo fica em um arquivinho só, o que facilita muito na hora de rodar o projeto.

## Como Executar o Projeto Localmente

**O que você vai precisar:**
* [Node.js](https://nodejs.org/) instalado.
* VS Code com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (facilita bastante).

**1. Rodando o Back-end:**

No seu terminal, siga estes passos:

```bash
# 1. Entre na pasta do back-end
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
node server.js
```
Você verá a mensagem `Servidor rodando na porta 3001`. Um arquivo `database.db` vai aparecer na pasta. Deixe o terminal rodando.

**2. Rodando o Front-end:**

1.  Abra a pasta `frontend` no VS Code.
2.  Clique com o botão direito no arquivo `index.html`.
3.  Selecione **"Open with Live Server"**.

E pronto! A aplicação abrirá no seu navegador.

## Colaboração com IA (Uma história de debug)

**Aqui eu queria contar um pouco sobre como usei a IA neste projeto.**

* **Ferramenta:** GitHub Copilot.
* **Utilização:** **Eu me deparei com um bug bem chato** de rede, onde a conexão com o servidor local não funcionava de jeito nenhum (`ERR_CONNECTION_REFUSED`), principalmente quando eu ia testar o link de indicação. **Pedi uma ajuda ao GitHub Copilot** para ter algumas ideias. Ele me deu umas pistas boas, como possíveis conflitos de porta e a diferença entre `localhost` e `127.0.0.1`.
* **Aprendizado:** **No fim das contas, a solução veio da minha própria investigação**, percebendo que o Live Server tinha trocado a porta que estava usando. **O que eu aprendi com isso** foi que a IA é uma ótima ferramenta para acelerar o diagnóstico, mas a atenção aos detalhes e o raciocínio para encontrar a causa raiz do problema ainda são fundamentais.