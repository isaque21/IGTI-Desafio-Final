import React from "react";

export default function Filter({ filter }) {
  const onChangeSearch = (event) => {
    filter(event.target.value);
  };

  return (
    <div className="input-field inline col s8" style={styles.inputField}>
      <input
        id="filter"
        placeholder="Filtro"
        type="text"
        className="validate"
        onChange={onChangeSearch}
      />
    </div>
  );
}

const styles = {
  inputField: {
    marginBottom: 0,
    marginTop: 0,
  },
};
