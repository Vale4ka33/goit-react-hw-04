import css from "./SearchBox.module.css";
import { useId } from "react";

const SearchBox = ({ value, onChange }) => {
  const searchId = useId();
  return (
    <div className={css.container}>
      <label htmlFor={searchId}>Find contacts by name</label>
      <input
        className={css.searchInput}
        type="text"
        id={searchId}
        name="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
