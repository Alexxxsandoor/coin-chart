import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { toggleCurrencyId } from "store/currencies";
import ModalPopup from "components/modals-popup/ModalPopup";
import {ADD_CURRENCY, ADD_CURRENCY_HISTORY} from "constants/constants-modal"

const Header = () => {
  const { selectCurrencyId, currencies } = useSelector(
    (state) => state.currencyList
  );

  const selectCurrency = currencies.find((cur) => cur.id === selectCurrencyId);

  const dispatch = useDispatch();
  const handleSelectCurrency = (currency) => {
    dispatch(toggleCurrencyId(currency.id));
  };
  const defImg = "http://surl.li/kowya";

  const [price, setPrice] = useState("no information");

  const getAxios = () => {
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
        setPrice("no information");
      });
  };
  useEffect(() => {
    getAxios();
  }, [selectCurrencyId]);

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
                  alt="coin-logo"
                />
                {selectCurrency.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ModalPopup typeFunc={ADD_CURRENCY} />
                {currencies.map((el) => (
                  <Dropdown.Item
                    key={el.id}
                    onClick={() => handleSelectCurrency(el)}
                  >
                    {el.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <h6>Actual Price: {price} USD</h6>
            <ModalPopup
              typeFunc={ADD_CURRENCY_HISTORY}
              currencyId={selectCurrency.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
