import instance from "common/config/api";

const usersService = {
  searchForId: async (id) => {
    const response = await instance.get(`/users/${id}`);

    return response.data;
  },
};

export default usersService;
