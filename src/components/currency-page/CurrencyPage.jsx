import { useSelector } from "react-redux";
import Graph from "components/graph-table/Graph";
import TableHistory from "components/graph-table/TableHistory";

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
        <>
          <Graph value={values} />
          <TableHistory
            currencyId={currencyId}
            currencyHistoryValueArray={sortedArray}
          />
        </>
      ) : null}
    </>
  );
};

export default CurrencyPage;
