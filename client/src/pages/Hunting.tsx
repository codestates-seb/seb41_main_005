import HuntingArticle, { cards } from "../components/hunting/HuntingArticle";
import DropDownT from "../components/DropDownT";
import { CardProps } from "../components/hunting/CardProps";

function Hunting() {
  return (
    <div className="Hunting">
      <DropDownT />
      <HuntingArticle cardData={cards as CardProps[]} />
    </div>
  );
}

export default Hunting;
