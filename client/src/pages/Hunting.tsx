import HuntingArticle, { cards } from "../components/hunting/HuntingArticle";
import HuntingDropDown from "../components/hunting/HuntingDropDown";
import { CardProps } from "../components/hunting/CardProps";

function Hunting() {
  return (
    <div className="Hunting">
      <HuntingDropDown />
      <HuntingArticle cardData={cards as CardProps[]} />
    </div>
  );
}

export default Hunting;
