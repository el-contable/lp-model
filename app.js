document.addEventListener("DOMContentLoaded", () => {
  const lpPriceInput = document.getElementById("lpPrice");
  const initialLpBalanceInput = document.getElementById("initialLpBalance");
  const initialTokenBalanceInput = document.getElementById("initialTokenBalance");
  const buyPressureInput = document.getElementById("buyPressure");
  const priceSlider = document.getElementById("priceSlider");
  const pressureSlider = document.getElementById("pressureSlider");
  const tokenPriceDisplay = document.getElementById("tokenPrice");

  function calculateTokenPrice() {
    const lpPrice = parseFloat(lpPriceInput.value);
    const initialLpBalance = parseFloat(initialLpBalanceInput.value);
    const initialTokenBalance = parseFloat(initialTokenBalanceInput.value);
    const buyPressure = parseFloat(buyPressureInput.value);

    // Calculate constant product (k) using initial balances
    const constantProduct = initialLpBalance * initialTokenBalance;

    // Calculate total BNB in the pool after buy pressure
    const bnbAdded = buyPressure / lpPrice;
    const totalLpBalance = initialLpBalance + bnbAdded;

    // Calculate new Token balance required to maintain constant product
    const newTokenBalance = constantProduct / totalLpBalance;

    // Calculate the new Token price
    const newTokenPrice = (lpPrice * totalLpBalance) / newTokenBalance;

    // Display the new Token price with commas
    tokenPriceDisplay.innerText = newTokenPrice.toLocaleString(undefined, { minimumFractionDigits: 5, maximumFractionDigits: 5 });
  }

  // Update values when sliders are adjusted
  priceSlider.addEventListener("input", (event) => {
    lpPriceInput.value = event.target.value;
    calculateTokenPrice();
  });

  pressureSlider.addEventListener("input", (event) => {
    buyPressureInput.value = event.target.value;
    calculateTokenPrice();
  });

  // Update values when number inputs are adjusted
  lpPriceInput.addEventListener("input", calculateTokenPrice);
  initialLpBalanceInput.addEventListener("input", calculateTokenPrice);
  initialTokenBalanceInput.addEventListener("input", calculateTokenPrice);
  buyPressureInput.addEventListener("input", calculateTokenPrice);

  // Initialize display
  calculateTokenPrice();
});
