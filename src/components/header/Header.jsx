import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import ModalCurrency from "../modals-popup/ModalCurrency";
import CurrencyPage from "../CurrencyPage/CurrencyPage";
import ModalValuesCurrency from "../modals-popup/ModalValuesCurrency";

const Header = () => {
  const currency = useSelector((state) => state.currencyList.currencies);

  const [selectCurrency, setSellectCurrency] = useState(currency[0]);
  const [price, setPrice] = useState("no information");

  const defImg =
    "https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png";

  useEffect(() => {
    const API_KEY =
      "a39ab6edd002bec7b8ff8da2188ff5a2745b1133f677e48c16b0833952e2b89b";
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectCurrency.name}&tsyms=USD&api_key=${API_KEY}`
      )
      .then(function (response) {
        setPrice(response.data[selectCurrency.name].USD);
      })
      .catch((error) => {
        console.error(error);
        setPrice("no information");
      });
  }, [selectCurrency]);

  return (
    <>
      <div className="d-flex bg-dark text-light py-4">
        <div className="container">
          <div className="d-flex align-items-center d-flex justify-content-between">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <img
                  width="30"
                  src={selectCurrency.image ? selectCurrency.image : defImg}
                />
                {selectCurrency.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ModalCurrency />
                {currency.map((el) => (
                  <Dropdown.Item
                    key={el.id}
                    onClick={() => setSellectCurrency(el)}
                  >
                    {el.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <h6>Actual Price: {price} USD</h6>
            <ModalValuesCurrency currency={selectCurrency} />
          </div>
        </div>
      </div>
      <CurrencyPage currencyId={selectCurrency.id} />
    </>
  );
};

export default Header;
