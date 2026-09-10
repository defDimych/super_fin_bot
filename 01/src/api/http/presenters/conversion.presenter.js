export function presentConversion({ baseCurrency, currencyCode, rate }) {
  if (!rate) {
    return `Unknown currency: ${currencyCode}`;
  }

  return `1 ${baseCurrency} = ${rate} ${currencyCode}`;
}
