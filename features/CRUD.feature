Feature: Login

    Scenario: Login
        Given I log in a POST request to /usuarios/login
          And I set body to
          """
          {
            "email": "gustavo@foo.com",
            "senha": "gustavo123"
          }
          """
         When I receive a response
         Then I expect response should have a status 200
          And I expect response should have a json like
          """
          {
            "mensagem": "Autenticado com sucesso"
          }
          """

    Scenario: Add a product
        Given I make a POST request to /produtos
          And I set authentication
          And I set body to
          """
          {
            "nome": "Takamine GC1E",
            "preco": 3000
          }
          """
         When I receive a response
         Then I expect response should have a status 201
          And I expect response should have a json like
          """
          {
            "mensagem": "Produto inserido com sucesso",
            "produtoCriado": {
              "nome": "Takamine GC1E",
              "preco": 3000
            }
          }
          """

    Scenario: Get all product
        Given I make a GET request to /produtos
         When I receive a response
         Then I expect response should have a status 200
          And I expect response time should be less than 1000 ms
          And I store response at produtos[0].id_produto as getProduct

    Scenario: Get a product with id
        Given I make a GET request to /produtos/{id}
          And I set path param id to $S{getProduct}
         When I receive a response
         Then I expect response should have a status 200
          And I expect response should have a json like
          """
          {
            "produto": {
              "id_produto": "$S{getProduct}"
            }
          }
          """

    Scenario: Update a product
        Given I make a PATCH request to /produtos
          And I set authentication
          And I set body to
          """
          {
            "nome": "Fender Telecaster Custom",
            "preco": 4500,
            "id_produto": "$S{getProduct}"
          }
          """
         When I receive a response
         Then I expect response should have a status 202
          And I expect response should have a json like
          """
          {
              "mensagem": "Produto atualizado com sucesso",
              "produtoAtualizado": {
                "id_produto": "$S{getProduct}",
                "nome": "Fender Telecaster Custom",
                "preco": 4500
              }
          }
          """

    Scenario: Add a request
        Given I make a POST request to /pedidos
          And I set body to
          """
          {
              "id_produto": "$S{getProduct}",
              "quantidade": 3
          }
          """
         When I receive a response
         Then I expect response should have a status 201        
          And I expect response should have a json like
          """
          {
              "mensagem": "Pedido inserido com sucesso",
              "pedidoCriado": {
                "id_produto": "$S{getProduct}",
                "quantidade": 3
              }
          }
          """

    Scenario: Get all requests
        Given I make a GET request to /pedidos
         When I receive a response
         Then I expect response should have a status 200
          And I expect response time should be less than 1000 ms
          And I store response at pedidos[0].id_pedidos as getRequest

    Scenario: Get a request with id
        Given I make a GET request to /pedidos/{id}
          And I set path param id to $S{getRequest}
         When I receive a response
         Then I expect response should have a status 200
          And I expect response should have a json like
          """
          {
            "pedido": {
              "id_pedidos": "$S{getRequest}",
              "id_produto": "$S{getProduct}",
              "quantidade": 3
            }
          }
          """

    Scenario: Delete a request
        Given I make a DELETE request to /pedidos
          And I set body to
          """
          {
              "id_pedidos": "$S{getRequest}"
          }
          """
         When I receive a response
         Then I expect response should have a status 202
          And I expect response should have a json like
          """
          {
              "mensagem": "Pedido removido com sucesso"
          }
          """

    Scenario: Delete a product
        Given I make a DELETE request to /produtos
          And I set authentication
          And I set body to
          """
          {
              "id_produto": "$S{getProduct}"
          }
          """
         When I receive a response
         Then I expect response should have a status 202
          And I expect response should have a json like
          """
          {
              "mensagem": "Produto removido com sucesso"
          }
          """