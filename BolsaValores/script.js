document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
  const dowJonesPriceElement = document.getElementById("dowJonesPrice");
  const nasdaqPriceElement = document.getElementById("nasdaqPrice");
  const sp500PriceElement = document.getElementById("sp500Price");
  const nasdaqCompositePriceElement = document.getElementById("nasdaqCompositePrice");
  const updateButton = document.getElementById("updateButton");
  const resetButton = document.getElementById("resetButton");
  const intervalSelect = document.getElementById("intervalSelect");

  // Precios iniciales
  let dowJonesPrice = 35000;
  let nasdaqPrice = 15000;
  let sp500Price = 4000;
  let nasdaqCompositePrice = 12000;

  // Configuración de la gráfica
  const chartCanvas = document.getElementById("chartCanvas");
  const ctx = chartCanvas.getContext("2d");

  const chartConfig = {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Índice Dow Jones",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Índice NASDAQ",
          data: [],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Índice S&P 500",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Índice NASDAQ Composite",
          data: [],
          backgroundColor: "rgba(255, 206, 86, 0.5)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
        },
      },
    },
  };

  // Crear la gráfica
  const chart = new Chart(ctx, chartConfig);

  // Función para actualizar los precios y la gráfica
  function updatePrices() {
    // Actualizar los precios
    dowJonesPrice += getRandomPriceChange();
    nasdaqPrice += getRandomPriceChange();
    sp500Price += getRandomPriceChange();
    nasdaqCompositePrice += getRandomPriceChange();

    // Actualizar los elementos del DOM con los nuevos precios
    dowJonesPriceElement.textContent = dowJonesPrice.toFixed(2);
    nasdaqPriceElement.textContent = nasdaqPrice.toFixed(2);
    sp500PriceElement.textContent = sp500Price.toFixed(2);
    nasdaqCompositePriceElement.textContent = nasdaqCompositePrice.toFixed(2);

    // Agregar la fecha actual como etiqueta en la gráfica
    const currentDate = new Date();
    const currentLabel = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    chartConfig.data.labels.push(currentLabel);

    // Agregar los nuevos precios a la gráfica
    chartConfig.data.datasets[0].data.push(dowJonesPrice);
    chartConfig.data.datasets[1].data.push(nasdaqPrice);
    chartConfig.data.datasets[2].data.push(sp500Price);
    chartConfig.data.datasets[3].data.push(nasdaqCompositePrice);

    // Actualizar la gráfica
    chart.update();
  }

  // Función para generar un cambio de precio aleatorio
  function getRandomPriceChange() {
    return Math.random() * 10 - 5;
  }

  // Actualizar los precios cuando se hace clic en el botón de actualización
  updateButton.addEventListener("click", updatePrices);

  // Resetear los precios cuando se hace clic en el botón de reseteo
  resetButton.addEventListener("click", function () {
    dowJonesPrice = 35000;
    nasdaqPrice = 15000;
    sp500Price = 4000;
    nasdaqCompositePrice = 12000;
    dowJonesPriceElement.textContent = dowJonesPrice.toFixed(2);
    nasdaqPriceElement.textContent = nasdaqPrice.toFixed(2);
    sp500PriceElement.textContent = sp500Price.toFixed(2);
    nasdaqCompositePriceElement.textContent = nasdaqCompositePrice.toFixed(2);
    chartConfig.data.labels = [];
    chartConfig.data.datasets[0].data = [];
    chartConfig.data.datasets[1].data = [];
    chartConfig.data.datasets[2].data = [];
    chartConfig.data.datasets[3].data = [];
    chart.update();
  });
// Variables de la cartera del bot
let botBalance = 10000;
let botShares = 0;
let botTransactions = [];

// Función para comprar acciones
function buyShares(index, price) {
  const sharesToBuy = Math.floor(botBalance / price);
  const totalPrice = sharesToBuy * price;

  // Verificar si hay suficiente saldo disponible
  if (botBalance >= totalPrice) {
    botBalance -= totalPrice;
    botShares += sharesToBuy;

    // Registrar la transacción en el historial
    const transaction = {
      type: "Compra",
      index: index,
      shares: sharesToBuy,
      price: price
    };
    botTransactions.push(transaction);

    // Actualizar la información de la cartera en el DOM
    updateBotPortfolio();
  }
}

// Función para vender acciones
function sellShares(index, price) {
  const sharesToSell = botShares;
  const totalPrice = sharesToSell * price;

  // Verificar si hay suficientes acciones en posesión
  if (botShares >= sharesToSell) {
    botShares -= sharesToSell;
    botBalance += totalPrice;

    // Registrar la transacción en el historial
    const transaction = {
      type: "Venta",
      index: index,
      shares: sharesToSell,
      price: price
    };
    botTransactions.push(transaction);

    // Actualizar la información de la cartera en el DOM
    updateBotPortfolio();
  }
}

// Función para actualizar la información de la cartera del bot en el DOM
function updateBotPortfolio() {
  const botBalanceElement = document.getElementById("botBalance");
  const botSharesElement = document.getElementById("botShares");
  const botTransactionsElement = document.getElementById("botTransactions");

  botBalanceElement.textContent = botBalance.toFixed(2);
  botSharesElement.textContent = botShares;

  // Actualizar el historial de transacciones
  botTransactionsElement.innerHTML = "";
  botTransactions.forEach(transaction => {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaction.type} - Índice: ${transaction.index}, Cantidad: ${transaction.shares}, Precio: ${transaction.price.toFixed(2)}`;
    botTransactionsElement.appendChild(listItem);
  });
}
  // Actualizar los precios automáticamente cada cierto intervalo de tiempo
  let intervalId;

  intervalSelect.addEventListener("change", function () {
    const interval = parseInt(intervalSelect.value);
    clearInterval(intervalId);
    intervalId = setInterval(updatePrices, interval);
  });

  // Iniciar la actualización automática con el intervalo por defecto
  intervalId = setInterval(updatePrices, 3000);
});
