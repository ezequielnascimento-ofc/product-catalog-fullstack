# Product Management

Aplicação full-stack para gerenciamento de produtos com autenticação, painel administrativo e API REST.

 <div> 
        <img src="https://img.shields.io/badge/Spring-6DB33F.svg?style=for-the-badge&logo=Spring&logoColor=white" alt="Spring" />
        <img src="https://img.shields.io/badge/OpenJDK-000000.svg?style=for-the-badge&logo=OpenJDK&logoColor=white" alt="Open JDK" />  
        <img src="https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black" alt="Swagger" />
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /> 
        <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="Typescript" /> 
        <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" alt="TailwindCSS" /> 
        <img src="https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="Shadcn/ui" /> 
    </div> 

## Visão Geral 

Product Management é uma aplicação web para gerenciamento de produtos, fornecedores e clientes. O sistema utiliza arquitetura desacoplada entre frontend e backend, oferecendo autenticação, documentação da API e uma interface orientada à produtividade.

## Funcionalidades

- Gestão de produtos
- Gestão de fornecedores
- Gestão de clientes
- Autenticação e controle de acesso
- API REST documentada
- Interface responsiva
- Arquitetura desacoplada


## Documentação da API

Swagger disponível em:

```txt 
http://localhost:8080/swagger-ui.html
```

<img src="https://github.com/Ki3lMigu3l/product-service-springboot-react/blob/main/docs/swagger.png" width="900">



## Capturas de Tela

<div align="center">
  
  ### Página de Login

<img src="https://github.com/Ki3lMigu3l/product-service-springboot-react/blob/main/docs/login.page.png" alt="screenshot da página de login do projeto"  width="650"/>

_Página de Login com proteção de rotas._

<h2></h2>

  ### Página Principal do Sistema

<img src="https://github.com/Ki3lMigu3l/product-service-springboot-react/blob/main/docs/home.page.png" alt="screenshot da página principal do sistema" width="650"/>

_Página Principal, disponível a navegação entre as funcionalidades do sistema._

<h2></h2>

### Função para adicionar Produto

<img src="https://github.com/Ki3lMigu3l/product-service-springboot-react/blob/main/docs/add.new.product.png" alt="Frontend: adicionar produto" width="650"/>

_Tela para adicionar novos produtos._

</div>

## Arquitetura

```mermaid
flowchart LR

A[Frontend<br/>React]
-- Requisição --> B[API REST<br/>Spring Boot]

B
-- Resposta -->
A

B
-- Consulta -->
C[(Banco de Dados)]

C
-- Dados -->
B
```

</div>

<h2></h2>

<h3>Conclusão</h3> 
<p> O <strong>Product Management</strong> demonstra a integração eficaz entre <strong>Spring Boot</strong> e <strong>React</strong> na criação de uma aplicação web moderna, robusta e escalável para o gerenciamento de produtos, fornecedores e clientes. A combinação de um backend seguro e bem documentado, com um frontend responsivo e intuitivo, proporciona uma experiência completa ao usuário e uma base sólida para futuras expansões do sistema. Este projeto consolida boas práticas de desenvolvimento Full Stack, explorando tecnologias atuais e abordagens profissionais voltadas à performance, organização e usabilidade. </p>
