# Configurando o ambiente local de desenvolvimento

## Primeiros Passos

### 1 - Criar aplicação no Discord

Primeiro passo que você precisa seguir é configurar efetivamente um aplicativo de bot no Discord por meio do [site do Discord](https://discord.com/developers/applications).

É fácil criar um. Os passos que você precisa seguir são os seguintes:

1. Abra o portal de desenvolvedores do Discord e faça login em sua conta.
2. Clique no botão "Nova Aplicação".
3. Insira o nome **DevHat** e confirme a janela pop-up clicando no botão "Criar".

### 2 - Configurando as variáveis de ambiente

**Essa parte é extremamente importante**

Precisamos de três informações essenciais:

1. Token da Aplicação
2. Id da Aplicação
3. Servidor da Aplicação

Seguindo o segundo passo, após criar a aplicação, selecione ela e você será redirecionado para página de dashboard e será mostrado as informações gerais, nessa parte você já terá acesso ao **APPLICATION ID**, e também estará disponível na URL: <https://discord.com/developers/applications/{{APPLICATION_ID}}/information>

![](https://discordjs.guide/assets/create-app.ed82aede.png)

Agora acesse a página de Bot, acessível pelo meno lateral. Nesta página, você terá acesso ao **Token da aplicação**.

> Os tokens se parecem com isso: NzkyNzE1NDU0MTk2MDg4ODQy.X-hvzA.Ovy4MCQywSkoMRRclStW4xAYK7I (não se preocupe, nós redefinimos imediatamente este token antes mesmo de publicá-lo aqui!).

Se ele for mais curto e se parecer mais com isso: kxbsDRU5UfAaiO7ar9GFMHSlmTwYaIYn, você copiou o seu segredo do cliente. Certifique-se de copiar o token se quiser que o seu bot funcione!

![](https://discordjs.guide/assets/created-bot.de724f7c.png)

Nesse momento já temos dois (Token/Id da aplicação) dos três tokens necessários para nossa aplicação, portanto o último token é a parte mais fácil desse processo.

Vá em seu aplicativo do discord e selecione algum servidor com o botão direito do mouse. Um popup deve aparecer e escolha a opção "Copiar ID do servidor", normalmente essa é a última opção

Por fim, crie um arquivo dentro da pasta raiz do projeto chamado .env e coloque as variáveis

```js
DISCORD_TOKEN="Token da aplicação"
CLIENT_ID="Id da aplicação"
DISCORD_SERVER_ID="Servidor da aplicação"
```

### 3 - Executar aplicação

Certifique-se que tenha Node.js e PNPM instalado na máquina local.
Por último:

```bash
pnpm install 

pnpm deploy:commands

pnpm run dev
```
