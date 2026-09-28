
# 📱 App Products CRUD

Aplicação para gerenciamento de produtos e estoque, desenvolvida durante as aulas de **Programação para Dispositivos Móveis (PPDM)**.

O projeto permite consultar, cadastrar, editar e excluir produtos por meio de uma interface desenvolvida em **React Native**, utilizando **Expo** e integração com uma **API REST** através do **Axios**.

## 📋 Funcionalidades

- 📋 Listagem de produtos
- ➕ Cadastro de novos produtos
- ✏️ Edição de produtos existentes
- 🗑️ Exclusão de produtos
- 💰 Formatação de preços em Real (BRL)
- 📦 Exibição da quantidade disponível em estoque
- 🔎 Validação dos campos do formulário
- ⏳ Indicadores de carregamento
- 📱 Interface compatível com React Native
- 🌐 Execução no navegador através do Expo Web

## 🛠️ Tecnologias utilizadas

- **React Native** — Desenvolvimento da interface da aplicação.
- **Expo** — Ambiente e ferramentas para desenvolvimento React Native.
- **TypeScript** — Tipagem estática do projeto.
- **Axios** — Comunicação com a API REST.
- **React Native Safe Area Context** — Gerenciamento da área segura da interface.
- **React Native Web** — Execução da aplicação no navegador.

## 🗂️ Estrutura do projeto

```text
appProductsCrud/
├── assets/
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
├── src/
│   ├── api/
│   │   └── api.ts
│   │
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   └── ProductModal.tsx
│   │
│   ├── services/
│   │   └── productServices.ts
│   │
│   ├── themes/
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   └── styles.tsx
│   │
│   └── types/
│       └── Product.ts
│
├── App.tsx
├── app.json
├── index.ts
├── package.json
└── tsconfig.json
```

## 🔄 Funcionamento

A aplicação utiliza uma separação entre interface, serviços, API e tipagem.

### 🔗 Fluxo da aplicação

```text
Usuário
   ↓
App.tsx
   ↓
ProductCard / ProductModal
   ↓
productServices.ts
   ↓
api.ts (Axios)
   ↓
API REST
   ↓
Banco de dados
```

### 📌 Principais responsabilidades

#### `App.tsx`

- Controla a lista de produtos.
- Abre e fecha o modal.
- Coordena o cadastro, a edição e a exclusão.
- Atualiza os produtos após as operações.

#### `ProductCard.tsx`

- Exibe as informações de cada produto.
- Disponibiliza os botões de editar e excluir.

#### `ProductModal.tsx`

- Contém o formulário de cadastro e edição.
- Valida os dados preenchidos.
- Envia os dados para o serviço.

#### `productServices.ts`

- Centraliza as operações relacionadas aos produtos.
- Realiza requisições `GET`, `POST`, `PUT` e `DELETE`.

#### `api.ts`

- Configura o Axios.
- Define a URL base utilizada para comunicação com o backend.

#### `Product.ts`

- Define as interfaces e os DTOs utilizados pela aplicação.

## 🔌 Integração com a API

O aplicativo consome uma API REST através do Axios.

### 🌐 URL base

| Plataforma | URL |
|---|---|
| Android (emulador) | `http://10.0.2.2:3000` |
| Web / iOS | `http://localhost:3000` |

### 📡 Endpoints utilizados

| Método | Endpoint | Função |
|---|---|---|
| `GET` | `/products?limit=99999` | Lista os produtos |
| `POST` | `/products` | Cadastra um produto |
| `PUT` | `/products/:id` | Atualiza um produto |
| `DELETE` | `/products/:id` | Exclui um produto |

> **⚠️ Importante:** o backend da API não está incluído neste repositório. Para utilizar todas as funcionalidades do aplicativo, a API REST precisa estar em execução na porta `3000`.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entre na pasta do projeto

```bash
cd appProductsCrud
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o Expo

```bash
npm start
```

Após iniciar, o Expo disponibilizará as opções de execução do projeto.

### 🌐 Executar no navegador

```bash
npm run web
```

### 🤖 Executar no Android

```bash
npm run android
```

### 🍎 Executar no iOS

```bash
npm run ios
```

> **Observação:** para executar no Android utilizando um emulador, a API utiliza o endereço `10.0.2.2:3000`. Esse endereço permite que o emulador Android acesse o `localhost` da máquina que está executando o backend.

## 🧪 Operações do CRUD

### ➕ Create — Cadastrar

O usuário preenche os dados do produto no formulário, e a aplicação envia uma requisição `POST` para a API.

### 📖 Read — Consultar

Ao iniciar a aplicação, os produtos são buscados por meio de uma requisição `GET` e exibidos em uma lista.

### ✏️ Update — Atualizar

Ao selecionar a opção **Editar**, os dados do produto são carregados no formulário. Após a alteração, uma requisição `PUT` é enviada para a API.

### 🗑️ Delete — Excluir

Ao selecionar a opção **Excluir**, o usuário confirma a operação, e a aplicação envia uma requisição `DELETE` para a API.

## 🎯 Objetivo

O projeto tem como objetivo aplicar, na prática, conceitos de:

- Desenvolvimento de aplicações para dispositivos móveis.
- Integração com APIs REST.
- Operações CRUD.
- Componentização.
- Gerenciamento de estado.
- Utilização de TypeScript com React Native.
- Comunicação entre frontend e backend.

## 📚 Contexto acadêmico

Projeto desenvolvido como atividade prática da disciplina de **Programação para Dispositivos Móveis (PPDM)**.

---

💻 Desenvolvido para fins de estudo e aprendizado.