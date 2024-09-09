import instance from "common/config/api";

const categoriesServices = {
  search: async () => {
    const response = await instance.get("/categories");

    return response.data;
  },
  searchOneCategory: async (categoryName) => {
    const response = await instance.get(`/categories/${categoryName}`);

    return response.data;
  },
};

export default categoriesServices;
