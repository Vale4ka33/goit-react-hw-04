import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchImages } from "./fetch-api";
import { Toaster } from "react-hot-toast";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (newQuery) => {
    try {
      setLoading(true);
      setError(false);
      setImages([]);

      const data = await fetchImages(newQuery);
      setImages(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <p>Loading images.....</p>}
      {error && <p>Oooops error</p>}
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
      <ImageGallery images={images} />
    </div>
  );
}

export default App;
