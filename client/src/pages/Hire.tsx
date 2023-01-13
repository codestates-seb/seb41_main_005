import HireArticle, { cards } from "../components/hire/HireArticle";
import { CardProps } from "../components/hire/CardProps"
import DropDownMenu from "../components/DropDownMenu";

function Hire() {
  const cardComponents = cards.map((card: CardProps) => (
    <HireArticle key={card.memberId} {...card} />
  ));
  return (
    <div className="Hire">
      <DropDownMenu />
      {cardComponents}
    </div>
  );
}

export default Hire;
