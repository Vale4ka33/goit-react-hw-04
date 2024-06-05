import css from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick }) => {
  return <img src={src} alt={alt} className={css.image} onClick={onClick} />;
};
export default ImageCard;
