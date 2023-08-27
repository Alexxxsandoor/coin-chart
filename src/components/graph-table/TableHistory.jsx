import React from "react";
import { Button, Table } from "react-bootstrap";
import { deleteCurrencyHistory } from "../../store/currencies";
import { useDispatch } from "react-redux";
import ModalChangeValuesCurrency from "../modals-popup/ModalChangeValuesCurrency";

const TableHistory = (props) => {
  const { currencyHistoryValueArray, currencyId } = props;
  const dispatch = useDispatch();

  const delHistory = (idCurrency, idCurrencyHistory) => {
    dispatch(deleteCurrencyHistory({ idCurrency, idCurrencyHistory }));
  };

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Amount in USD</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currencyHistoryValueArray.map((el) => (
            <tr key={el.id}>
              <td>{el.value}</td>
              <td>{new Date(el.date).toLocaleString()}</td>

              <td className="d-flex">
                <ModalChangeValuesCurrency
                  currencyId={currencyId}
                  currencyHistoryId={el.id}
                  oldValue={el.value}
                  oldDate={el.date}
                />
                <Button
                  onClick={() => delHistory(currencyId, el.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableHistory;
