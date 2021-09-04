import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItems from "./ListItems";
import Loader from "../Loader";
const List = ({ threadsToDisplay }) => {
  const [active, setActive] = useState();

  const setHoverActive = (id) => {
    setActive(id);
  };

  return (
    <div>
      {threadsToDisplay.map((el, key) => (
        <ListItems
          item={el}
          key={key}
          onMouseEnter={setHoverActive}
          activeClass={active}
        />
      ))}
    </div>
  );
};

List.propTypes = {
  threadsToDisplay: PropTypes.array,
};

export default List;
