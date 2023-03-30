import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";

function SaleDistanceDriven({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  // 입력하면 발생
  const getTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSaleInfo((saleInfo: SaleInfoType) => {
      return { ...saleInfo, distance: inputValue };
    });
  };

  return (
    <div>
      <span>주행거리</span>
      <div>
        <input type="number" min="0" onBlur={getTyping} />
      </div>
    </div>
  );
}

export default SaleDistanceDriven;
