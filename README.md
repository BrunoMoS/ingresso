# 🎟️ e-Ticket

Sistema web de compra de ingressos para eventos, desenvolvido com HTML, CSS e JavaScript puro.

---

## 📋 Sobre o projeto

O **e-Ticket** permite que o usuário selecione o tipo de ingresso desejado, informe a quantidade e finalize a compra, atualizando o estoque disponível em tempo real — tudo sem dependências externas ou backend.

---

## ✨ Funcionalidades

- Seleção de tipo de ingresso: **Pista**, **Cadeira Superior** e **Cadeira Inferior**
- Validação de quantidade (mínimo 1, máximo 25 por compra)
- Controle de estoque em tempo real
- Alerta de estoque insuficiente
- Interface responsiva

---

## 🗂️ Estrutura do projeto

```
e-ticket/
├── assets/
│   ├── PNG/
│   │   └── Logo e-tricket.png
│   ├── SVG/
│   │   └── Hachuras.svg
│   ├── Ingresso.svg
│   └── Favicon.ico
├── js/
│   └── app.js
├── styles/
│   ├── _reset.css
│   └── style.css
└── index.html
```

---

## 🧠 Arquitetura do JavaScript

O código em `app.js` segue o **Single Responsibility Principle (SRP)**, onde cada módulo possui uma única responsabilidade bem definida:

| Módulo | Responsabilidade |
|---|---|
| `InventoryManager` | Gerenciar o estado e as operações sobre o estoque |
| `DOMController` | Ler entradas e atualizar elementos da interface |
| `Validator` | Validar os dados fornecidos pelo usuário |
| `PurchaseService` | Orquestrar a lógica de negócio da compra |
| `buy()` | Ponto de entrada acionado pelo botão de compra |

Essa separação garante que alterações em uma camada não impactem as demais. Por exemplo:

- Mudar os IDs do HTML → editar apenas `DOMController`
- Alterar regras de validação → editar apenas `Validator`
- Modificar cálculo de estoque → editar apenas `InventoryManager`

---

## 🎟️ Estoque inicial

| Tipo de ingresso | Quantidade |
|---|---|
| Pista | 100 |
| Cadeira Superior | 200 |
| Cadeira Inferior | 400 |

---

## 🚀 Como executar

Por ser um projeto de frontend estático, basta abrir o `index.html` diretamente no navegador ou servir com qualquer servidor local:

**Com VS Code (Live Server):**
1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clique com o botão direito no `index.html`
3. Selecione **"Open with Live Server"**

**Com Python:**
```bash
python -m http.server 5500
```

Acesse em: `http://localhost:5500`

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+ — IIFEs, módulos, arrow functions)
- Google Fonts: [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) + [Inter](https://fonts.google.com/specimen/Inter)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.
