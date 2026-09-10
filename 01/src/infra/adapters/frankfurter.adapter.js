import { config } from '../config/config.js';

class FrankfurterAdapter {
  #baseUrl = config.frankfurter.baseUrl;

  async getRate(baseCurrency, quoteCurrency) {
    const res = await fetch(`${this.#baseUrl}/v2/rate/${baseCurrency}/${quoteCurrency}`);
    const body = await res.json();

    return body.rate ?? null;
  }
}

export const frankfurterAdapter = new FrankfurterAdapter();
