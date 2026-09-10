import { frankfurterAdapter } from '../../infra/adapters/frankfurter.adapter.js';

const BASE_CURRENCY = 'USD';

class ConvertCurrencyUseCase {
  async execute(input) {
    const currencyCode = input.trim().toUpperCase();
    const rate = await frankfurterAdapter.getRate(BASE_CURRENCY, currencyCode);

    return { baseCurrency: BASE_CURRENCY, currencyCode, rate };
  }
}

export const convertCurrencyUseCase = new ConvertCurrencyUseCase();
