import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    background: "none",
  },
};

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName={css.overlay}
      className={css.imageModal}
      contentLabel="Image Modal"
    >
      <div className={css.imageContainer}>
        <img
          src={image?.urls?.full}
          alt={image?.alt_description}
          className={css.image}
        />
        <div className={css.info}>
          <p>
            <strong>Author:</strong> {image?.user?.name}
          </p>
          <p>
            <strong>Likes:</strong> {image?.likes}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {image?.alt_description || "No description available."}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
