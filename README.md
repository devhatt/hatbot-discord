<p align="center">
  <a href="#1-catálogo-de-pets-personalizado">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/devhatt/pet-dex-backend/assets/103784814/85b346a7-906c-4e59-bb4b-a03a7df571d6">
      <img src="https://github.com/devhatt/pet-dex-backend/assets/103784814/85b346a7-906c-4e59-bb4b-a03a7df571d6" height="128">
    </picture>
    <h1 align="center">Hatbot - Discord Bot Devhatt</h1>
  </a>
</p>
<div align="center">

![node-current](https://img.shields.io/badge/Node.js-18.x-green.svg?logo=nodedotjs)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8x-yellow?logo=pnpm)](https://pnpm.io/pt/)
[![GitHub issues](https://img.shields.io/github/issues-raw/devhatt/hatbot-discord?logo=github)](https://github.com/devhatt/hatbot-discord/issues)
[![discord.js version](https://img.shields.io/badge/discord.js-14x-blue?logo=discord)](https://discord.js.org/)

</div>

## Funcionalidades Principais

### Comandos

Criar comandos personalizados visando automatizar nossos processos.


## Como Contribuir

1. **Desenvolvimento:**
   - Faça um fork do repositório e trabalhe em novas funcionalidades.
   - Resolva problemas existentes ou proponha melhorias.
2. **Documentação:**
   - Aprimore a documentação existente ou crie tutoriais para ajudar outros desenvolvedores.
   
## Como criar um comando novo:

1. **Crie uma pasta do commando**
    - Dentro da pasta `comandos`, crie uma pasta com o nome do seu comando
2. **Crie o comando**
    - É necessário duas coisas dentro do arquivo principal do comando.
        - Uma variável chamada `data` que instancia a classe `SlashCommandBuilder` do discord.js, essa classe que cria o comando pro bot.
        - uma função assíncrona chamada `execute` que recebe como parâmetro `interaction: CommandInteraction` e pode receber `client: Client` se necessário usar. Essa função terá toda a lógica do comando.
        - `obs`: os nomes precisam ser exatamente esses senão não funciona.

3. **Exporte ele na pasta index.ts**
    - procure o arquivo `index.ts` dentro da pasta `commands` e exporte o comando que você criou lá, sem isso o bot não consegue reconhecer o comando
    
```ts
export * as seuComando from "./seuComando/seuComando";
```

4. **Faça deploy do comando para o bot**
 - Rode o comando `pnpm deploy:commands`, esse comando mostrará para o bot o comando que você criou.

## Contato

Se precisar de ajuda, tiver sugestões ou quiser se envolver mais profundamente com a comunidade, entre em contato conosco:

- Discord: [https://discord.gg/9f5BZ7yD](https://discord.gg/9f5BZ7yD)
- Twitter: [Devhat (@DevHatt) / X (twitter.com)](https://twitter.com/DevHatt)
