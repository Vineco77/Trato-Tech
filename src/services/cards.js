import instance from "common/config/api";

const cardsServices = {
  searchForIdUsers: async (userId) => {
    const response = await instance.get(`/cards?userId=${userId}`);

    return response.data;
  },
};

export default cardsServices;
