import { useSelector } from "react-redux";

import Header from "./components/header/Header";
import ModalCurrency from "./components/modals-popup/ModalCurrency";

function App() {
  const currency = useSelector((state) => state.currencyList.currencies);

  return (
    <>{currency.length > 0 ? <Header /> : <ModalCurrency type={true} />}</>
  );
}

export default App;
