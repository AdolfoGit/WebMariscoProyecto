import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-12 text-md">
      <Item Links={PRODUCTS} title="EMPRESA" />
      <Item Links={RESOURCES} title="FAQ" />
      <Item Links={COMPANY} title="CONTACTO" />
      <Item Links={SUPPORT} title="SOPORTE" />
    </div>
  );
};

export default ItemsContainer;