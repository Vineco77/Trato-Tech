import instance from "common/config/api";

const itemsService = {
  search: async () => {
    const response = await instance.get("/items");

    return response.data;
  },
  searchOfCategories: async (categoryName) => {
    const response = await instance.get(`/items?category=${categoryName}`);

    return response.data;
  },
};

export default itemsService;
