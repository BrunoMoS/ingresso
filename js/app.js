// MÓDULO 1 — Estoque
// Responsabilidade: guardar e atualizar o estado do inventário

const InventoryManager = (() => {
  const stock = {
    inferior: 400,
    superior: 200,
    pista: 100,
  };

  const getStock = (type) => stock[type];

  const hasStock = (type, qty) => stock[type] >= qty;

  const deduct = (type, qty) => {
    stock[type] -= qty;
  };

  return { getStock, hasStock, deduct };
})();

// MÓDULO 2 — DOM
// Responsabilidade: ler e escrever elementos da interface

const DOMController = (() => {
  const elements = {
    ticketType: document.getElementById("ticket-type"),
    quantity: document.getElementById("qtd"),
    trackQty: document.getElementById("track-quantity"),
    superiorQty: document.getElementById("superior-quantity"),
    lowerQty: document.getElementById("lower-quantity"),
  };

  const getSelectedType = () => elements.ticketType.value;

  const getQuantity = () => parseInt(elements.quantity.value, 10);

  const clearQuantity = () => (elements.quantity.value = "");

  const updateStockDisplay = (type, value) => {
    const map = {
      inferior: elements.lowerQty,
      superior: elements.superiorQty,
      pista: elements.trackQty,
    };
    if (map[type]) map[type].textContent = value;
  };

  const showAlert = (message) => alert(message);

  return {
    getSelectedType,
    getQuantity,
    clearQuantity,
    updateStockDisplay,
    showAlert,
  };
})();

// MÓDULO 3 — Validação
// Responsabilidade: garantir que os dados de entrada são válidos

const Validator = (() => {
  const isValidQuantity = (qty) => !isNaN(qty) && qty >= 1 && qty <= 25;

  const isValidType = (type) =>
    ["inferior", "superior", "pista"].includes(type);

  const validate = (type, qty) => {
    if (!isValidType(type)) {
      return { ok: false, message: "Tipo de ingresso inválido." };
    }
    if (!isValidQuantity(qty)) {
      return { ok: false, message: "Limite por cliente: 25 ingressos." };
    }
    return { ok: true };
  };

  return { validate };
})();

// MÓDULO 4 — Serviço de compra
// Responsabilidade: orquestrar a lógica de negócio da compra

const PurchaseService = (() => {
  const execute = (type, qty) => {
    const validation = Validator.validate(type, qty);
    if (!validation.ok) {
      DOMController.showAlert(validation.message);
      return;
    }

    if (!InventoryManager.hasStock(type, qty)) {
      const available = InventoryManager.getStock(type);
      DOMController.showAlert(
        `Estoque insuficiente. Disponível: ${available} ingresso(s).`,
      );
      return;
    }

    InventoryManager.deduct(type, qty);
    DOMController.updateStockDisplay(type, InventoryManager.getStock(type));
    DOMController.clearQuantity();
    DOMController.showAlert(
      `Compra realizada! ${qty} ingresso(s) de "${type}" adquirido(s).`,
    );
  };

  return { execute };
})();

// MÓDULO 5 — Inicialização / Ponto de entrada
// Responsabilidade: expor o ponto de entrada chamado pelo HTML

function buy() {
  const type = DOMController.getSelectedType();
  const qty = DOMController.getQuantity();
  PurchaseService.execute(type, qty);
}
