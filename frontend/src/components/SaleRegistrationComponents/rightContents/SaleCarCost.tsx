import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";

function SaleCarCost({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  const getTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSaleInfo((saleInfo: SaleInfoType) => {
      return { ...saleInfo, cost: inputValue };
    });
  };
  return (
    <>
      <span>차량가격</span>
      <div>
        <input type="number" min="0" onBlur={getTyping} />
      </div>
    </>
  );
}

export default SaleCarCost;
