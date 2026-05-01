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

/*
Responsável por controlar o estoque.
stock: objeto que guarda a quantidade de ingressos disponíveis em cada setor (inferior, superior, pista).
getStock(type): devolve o número atual de ingressos de um tipo específico.
hasStock(type, qty): verifica se há ingressos suficientes para a quantidade pedida.
deduct(type, qty): subtrai do estoque a quantidade comprada.
👉 Esse módulo é como o "banco de dados" do estoque.
*/

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

/*
Responsável por conversar com a interface (HTML).
elements: guarda referências aos elementos da página (inputs e spans).
getSelectedType(): lê qual tipo de ingresso o usuário escolheu.
getQuantity(): lê e converte para número a quantidade digitada.
clearQuantity(): limpa o campo de quantidade depois da compra.
updateStockDisplay(type, value): atualiza na tela o número de ingressos restantes.
showAlert(message): mostra uma mensagem de alerta para o usuário.
👉 Esse módulo é como o "tradutor" entre o código e o que aparece na tela.
*/

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

/*
Responsável por validar os dados de entrada.
isValidQuantity(qty): garante que a quantidade seja um número entre 1 e 25.
isValidType(type): garante que o tipo de ingresso seja válido (inferior, superior, pista).
validate(type, qty): combina as duas verificações e retorna se está tudo certo ou uma mensagem de erro.
👉 Esse módulo é como o "porteiro" que só deixa passar dados corretos.
*/

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

/*
Responsável por executar a compra.
execute(type, qty):
Valida os dados com o Validator.
Verifica se há estoque suficiente com o InventoryManager.
Se não houver, mostra alerta com a quantidade disponível.
Se houver, desconta do estoque, atualiza a tela e mostra mensagem de sucesso.
👉 Esse módulo é o "cérebro" da operação: decide o que acontece na compra.
*/

function buy() {
  const type = DOMController.getSelectedType();
  const qty = DOMController.getQuantity();
  PurchaseService.execute(type, qty);
}

/*
Responsável por ser o ponto de entrada chamado pelo HTML.
buy():
Lê o tipo e a quantidade escolhida pelo usuário via DOMController.
Chama o PurchaseService para executar a compra.
👉 Esse é o "botão de ligar": conecta tudo e faz o sistema funcionar quando o usuário interage.
*/