import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./fetch-api";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchImages(query, page);
        if (data.results.length === 0) {
          toast.error("No images found");
        }
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
      } catch (error) {
        setError(true);
        toast.error("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setImages([]);
    setPage(1);
    setQuery(newQuery);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "rgb(63, 63, 255)",
            color: "white",
            boxShadow: "none",
          },
        }}
      />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
