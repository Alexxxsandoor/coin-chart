import { useSelector } from "react-redux";
import Header from "components/header/Header";
import CurrencyPage from "components/currency-page/CurrencyPage";
import ModalPopup from "components/modals-popup/ModalPopup";
import {ADD_CURRENCY} from "constants/constants-modal"

function App() {
  const { selectCurrencyId, currencies } = useSelector(
    (state) => state.currencyList
  );

  return (
    <>
      {currencies.length > 0 ? (
        <Header />
      ) : (
        <div className="mt-4">
          <ModalPopup typeFunc={ADD_CURRENCY} />
        </div>
      )}
      <div className="container mt-4">
        {selectCurrencyId ? (
          <CurrencyPage currencyId={selectCurrencyId} />
        ) : null}
      </div>
    </>
  );
}

export default App;
