import { useContext } from "react";
import { BreadcrumbContext } from "../contexts/BreadCrumbProvider";

const Breadcrumb: React.FC = () => {
  const { items } = useContext(BreadcrumbContext);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item${
              index === items.length - 1 ? " active" : ""
            }`}
          >
            {index === items.length - 1 ? (
              item.text
            ) : (
              <a href={item.link}>{item.text}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
