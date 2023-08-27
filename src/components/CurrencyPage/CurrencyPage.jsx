import { useSelector } from "react-redux";
import Graph from "../graph-table/Graph";
import TableHistory from "../graph-table/TableHistory";

const CurrencyPage = (props) => {
  const { currencyId } = props;

  const currency = useSelector((state) => state.currencyList.currencies).find(
    (el) => el.id === currencyId
  );

  const sortedArray = currency.historyValue.slice();
  sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));

  const values = sortedArray.map((item) => item.value);

  return (
    <>
      {currency.historyValue.length ? (
        <div className="container pt-4">
          <Graph value={values} />
          <TableHistory
            currencyId={currencyId}
            currencyHistoryValueArray={sortedArray}
          />
        </div>
      ) : null}
    </>
  );
};

export default CurrencyPage;
