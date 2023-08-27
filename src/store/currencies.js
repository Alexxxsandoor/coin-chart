import { createSlice } from "@reduxjs/toolkit";

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
  },
  reducers: {
    addCurrency(state, action) {
      state.currencies.push({
        id: new Date().toISOString(),
        name: action.payload.name,
        image: action.payload.file,
        historyValue: [],
      });
    },
    addCurrencyValues(state, action) {
      const {
        idCurrency,
        value = 0,
        date = new Date().toISOString(),
      } = action.payload;

      const currency = state.currencies.find((cur) => cur.id === idCurrency);

      currency.historyValue.push({
        id: new Date().toISOString(),
        value,
        date,
      });
    },
    deleteCurrencyHistory(state, action) {
      const { idCurrency, idCurrencyHistory } = action.payload;

      const currency = state.currencies.find((cur) => cur.id === idCurrency);

      currency.historyValue = currency.historyValue.filter(
        (history) => history.id !== idCurrencyHistory
      );
    },
    changeCurrencyHistory(state, action) {
      const { currencyId, currencyHistoryId, newValue, newDate } =
        action.payload;

      const currency = state.currencies.find((cur) => cur.id === currencyId);

      const currencyHistory = currency.historyValue.find(
        (history) => history.id === currencyHistoryId
      );

      currencyHistory.value = newValue ? newValue : currencyHistory.value;
      currencyHistory.date = newDate ? newDate : currencyHistory.date;
    },
  },
});

export const {
  addCurrency,
  addCurrencyValues,
  deleteCurrencyHistory,
  changeCurrencyHistory,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
