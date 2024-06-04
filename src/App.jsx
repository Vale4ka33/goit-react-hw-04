import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "./fetch-api";
import { Toaster } from "react-hot-toast";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (newQuery) => {
    try {
      setLoading(true);
      setError(false);
      setImages([]);

      const data = await fetchImages(newQuery);
      setImages(data);
      setPage(1);
      setQuery(newQuery);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const loadMoreImages = async () => {
    try {
      setLoading(true);

      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data]);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
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
      {error ? <ErrorMessage /> : <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
    </div>
  );
}

export default App;
