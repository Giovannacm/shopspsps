# Shopspsps
Trabalho Final - Desenvolvimento de Aplicações Para a Internet.
Alunos: Álvaro, Giovanna e Marcelo.
A aplicação consiste na simulação de um site de vendas. Esse site contém, necessariamente, três páginas:

## Parte I - ENTREGUE:
1. Página principal com apresentação de produtos
  a. Esta página deve conter a listagem de todos produtos disponíveis.
  b. Produtos fictícios, armazenados em uma variável JavaScript.
  c. O usuário não precisa entrar em uma página dedicada aos produtos, apenas adicionar os produtos desejados direto da página principal.
  d. Cada produto deve possuir, no mínimo, os seguintes campos: Nome, Categoria, Preço, Imagem associada.
  e. Você deve ter ao menos cinco categorias de produtos
  f. O usuário poderá filtrar produtos por categoria

2. Página com detalhes de compra e dados de usuário
  a. Esta página corresponde ao carrinho do usuário
  b. Dados para entrega precisam ser inseridos pelo usuário
  c. Um resumo da compra também deve ser apresentado
  d. Não é necessário apresentar informações sobre método de pagamento
  e. Tratar as entradas!

3. Página com confirmação de pedidos
  a. Ao finalizar a compra, apresente uma página com resumo do pedido
  b. Gerar um número aleatório para representar o tempo de frete (por exemplo, entre 3 e 8 dias)

## Parte II:
1. Utilizar banco de dados para armazenamento das informações;

2. Adicionar filtragens/ordenações por preço;

3. Implementar um cadastro para o usuário;
4. Na página de detalhes de compra e dados de usuário, verificar se há um cadastro para o usuário. Se não, realiza-lo antes de prosseguir com pedido.


## TO DO:
1. index: a função de adicionar o produto ao carrinho (addproduct) usa data.js - eliminar essa dependêcia, já que está sendo utilizado o banco de dados.
2. checkout: quando o usuário é novo, inserir no banco de dados e na sessão;
3. summary: criar o modelo no banco para o pedido;
4. Relatório com diagrama ER do banco de dados (para parte II).
