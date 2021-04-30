# Code Education - Docker - Desafio Nginx com Node.js

## Sobre a tarefa

Para resolver o desafio usei a imagem padrão do MySQL (5.7) e criei duas imagens custom, baseadas no Nginx e no Node.js.
O programa base Node ao ser iniciado o container basicamente conecta no banco, cria a tabela caso não exista, e limpa os valores da tabela.
Criei um arquivo names.json para guardar 50 nomes aleatórios. E o uso o express para subir o servidor na porta 3000 do container Node.
A cada requisição recebida que virá através do Nginx, que está escutando na porta 8080 do localhost, um novo nome é escolhido aleatóriamente com base no json e insere esse nome na tabela people. E na sequencia faz um SELECT \* para retornar todos os nomes em uma lista não ordenada simples.
A cada vez que o container for iniciado, a tabela do banco será limpa.
Os containeres do Nginx e do Node usam o Dockerize para assegurar a disponibilidade dos serviços, o Node aguarda o MySQL e o Nginx aguarda o Node estar ouvindo na porta 3000.

## Como executar

Para criar as imagens e testar a tarefa basta executar:

```sh
docker-compose up -d --build
```

E depois para finalizar, basta executar:

```sh
docker-compose down
```
