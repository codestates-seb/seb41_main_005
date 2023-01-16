import HireArticle, { cards } from "../components/hire/HireArticle";
import HireDropDown from "../components/hire/HireDropDown";
import { CardProps } from "../components/hire/CardProps";

function Hire() {
  return (
    <div className="Hire">
      <HireDropDown />
      <HireArticle cardData={cards as CardProps[]} />
    </div>
  );
}

export default Hire;
