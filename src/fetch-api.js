import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (
  query,
  page = 1,
  perPage = 10,
  orderBy = "relevant",
  color,
  orientation
) => {
  const response = await axios.get("/photos", {
    params: {
      query,
      page,
      per_page: perPage,
      order_by: orderBy,
      color,
      orientation,
      client_id: "l-kGt3-mqxSrEvCYzUICKZOTNNe8lBSyukoITC0joU4",
    },
  });
  return response.data;
};