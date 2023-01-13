import HireArticle, { cards } from "../components/hire/HireArticle";
import DropDownMenu from "../components/DropDownMenu";
import { CardProps } from '../components/hire/CardProps';

function Hire() {

  return (
    <div className="Hire">
      <DropDownMenu />
      <HireArticle cardData={cards as CardProps[]} />
    </div>
  );
}

export default Hire;
