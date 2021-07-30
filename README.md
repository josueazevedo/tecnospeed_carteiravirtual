<h2 align="center">Tecnospeed - Carteira Vitual</h2>

## Projeto
<p align="center">Avaliação Desenvolvedor Back-End.</p>

<h3 id="requisitos">### Pré-requisitos</h3>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/) e [Postgresql](https://www.postgresql.org/). 

### 🎲 Executando o Back End 

```bash
# Clone este repositório
$ git clone <https://github.com/josueazevedo/tecnospeed_carteiravirtual>

# Acesse a pasta do projeto no terminal/cmd
$ cd 'caminho do projeto'

# Instale as dependências
$ npm install

# Definas as configurações do ambiente para conexão com o banco de dados no arquivo '.env'
# Execute as seguintes intruções 

$ npx sequelize db:create  
$ npx sequelize db:migrate

# Execute a aplicação
$ npm start

# O servidor inciará na porta:4000 - acesse <http://localhost:4000>

### Acesse pelo navegador http://localhost:4200
```

<h3 id="tecnologias"> ### 🛠 Tecnologias </h3>

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Angular](https://angular.io/)

<h3 id="tecnologias"> ### Features </h3>

As seguintes features foram implementadas, começando pelos requisitos do nível 1 para depois atender aos demais, na ordem determinada pela atividade.

-> Nível 1
-  Cadastrar movimentações financeiras de entrada e saída de dinheiro. [Concluída]
-  Permitir cadastrar observações para cada movimentação financeira.  [Concluída]
-  Mostrar quanto dinheiro tenho na carteira. [Concluída]

-> Nível 2 
-  Permitir cadastrar (e editar) categorias para informar em cada movimentação financeira.  [Concluída]

->  Nível 3
-  Gravar um histórico de entradas e saídas de dinheiro da carteira.  [Concluída]
-  Permitir visualizar todo o histórico de movimentação de uma carteira de um determinado período.  [Concluída]
-  Permitir exportar todas as movimentações de um determinado período em formato CSV.  [Concluída]

->  Nível 4
-  Criar um controle de acesso de usuários (login/senha) [Incompleta]
   -  Cadastro de Usuários  [Concluída]
-  Permitir identificar para quem foi o pagamento ou de quem veio o recebimento [Pendente]
-  Permitir visualizar todas as movimentações realizadas entre amigos [Pendente]

->  Nível 5
-  Construir uma API Restful onde seja possível interagir com todas as funcionalidades do sistema, criando uma separação entre as camadas de apresentação e de regras de negócio. [Pendente]

   a. Utilizar autenticação OAuth 2.0. 
  
->  Nível 6
- Permitir cadastrar pagamentos recorrentes (contas a pagar/receber). [Pendente]

  a. Cada pagamento deve ter uma data de vencimento. 
  
  b. Deve ser possível escolher a periodicidade de um pagamento. 
  
  c. Deve ser possível escolher quantas vezes o pagamento será repetido. 
  
  d. Deve ser possível marcar pagamentos recorrentes com a opção de  débito automático. 
  
- Permitir ao usuário efetuar baixa desses lançamentos (que alimentarão a carteira do dia). Permitir realizar estorno dessas baixas. [Pendente]
- Permitir ao usuário editar ou excluir um pagamento recorrente (pendentes).  [Pendente]

->  Nível 7
- Subir a aplicação em uma nuvem de sua escolha aplicando ao menos um dos conceitos abaixo:  [Pendente]

  a. WAF 
  b. Autoscaling/LoadBalancing 
  c. Containers 
  d. Serverless 

<div>
<h2 id="autor">Autor </h2>
 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4D03AQHEg18Ma1jVxQ/profile-displayphoto-shrink_200_200/0/1595351291772?e=1628121600&v=beta&t=ywGWHY4XWyXGnYtcCeXRDwFhQw1O2iWAYUH3MTl66-k" width="100px;" alt=""/>
 <h3><b>Josué Azevedo</b></h3>

[![Linkedin Badge](https://img.shields.io/badge/-Josue-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/josu%C3%A9-azevedo-14449bbb/) 
