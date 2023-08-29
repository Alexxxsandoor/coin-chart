import { createSlice } from "@reduxjs/toolkit";

const findCurrency = (list, id) => list.find((list) => list.id == id);

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
    selectCurrencyId: "",
  },
  reducers: {
    addCurrency(state, action) {
      const { currencyImage, currencyName } = action.payload;
      const currencyId = new Date().toISOString();
      state.selectCurrencyId = currencyId;
      state.currencies.push({
        id: currencyId,
        name: currencyName ? currencyName : "name" + currencyId,
        image: currencyImage,
        historyValue: [],
      });
    },
    addCurrencyValues(state, action) {
      const {
        currencyId,
        currencyValue = 0,
        currencyDate = new Date().toISOString(),
      } = action.payload;

      const currency = findCurrency(state.currencies, currencyId);

      currency.historyValue.push({
        id: new Date().toISOString(),
        value: currencyValue,
        date: currencyDate,
      });
    },
    deleteCurrencyHistory(state, action) {
      const { idCurrency, idCurrencyHistory } = action.payload;
      const currency = findCurrency(state.currencies, idCurrency);
      currency.historyValue = currency.historyValue.filter(
        (history) => history.id !== idCurrencyHistory
      );
    },
    changeCurrencyHistory(state, action) {
      const { currencyId, currencyHistoryId, currencyValue, currencyDate } =
        action.payload;
      const currency = findCurrency(state.currencies, currencyId);
      const currencyHistory = findCurrency(
        currency.historyValue,
        currencyHistoryId
      );
      currencyHistory.value = currencyValue
        ? currencyValue
        : currencyHistory.value;
      currencyHistory.date = currencyDate ? currencyDate : currencyHistory.date;
    },
    toggleCurrencyId(state, action) {
      const currencyId = action.payload;
      state.selectCurrencyId = currencyId;
    },
  },
});

export const {
  addCurrency,
  addCurrencyValues,
  deleteCurrencyHistory,
  changeCurrencyHistory,
  toggleCurrencyId,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
