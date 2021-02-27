# NextLevelWeek 04 - Trilha node.js

<h3>Para utilizar o projeto é necessário ter o docker instalado.</h3>

<h3>Passo a passo para executar a aplicação.</h3>
<strong>1 -</strong> clonar o projeto no local desejado.<br>
<strong>2 -</strong> Acessar a pasta do projeto via terminal.<br>
<strong>3 -</strong> Executar o comando no terminal: <strong>docker run --name nextlevelweek -v ${PWD}:/app -it -d -w /app -p 3333:3333 node:lts</strong><br>
<strong>4 -</strong> Executar o comando no terminal (após concluir a execução o comando acima): <strong>docker exec -it nextlevelweek bash</strong><br>
<strong>5 -</strong> Executar o comando no terminal: yarn install
<strong>6 -</strong> Executar o comando no terminal (após concluir a execução do comando acima): <strong>yarn dev</strong><br>

Para executar os teste basta utilizar o comando do passo 4 e após isso executar o comando <strong>yarn test</strong>.



