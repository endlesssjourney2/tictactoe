import styles from "./Square.module.css";

const Square = ({ value, onClickFunc }) => {
  return (
    <button className={styles.square} onClick={onClickFunc}>
      {value}
    </button>
  );
};

export default Square;
