import Api from "@/services/Api";

export default {
  findAllGame() {
    return Api().get("game");
  },
  createGame(credentials) {
    return Api().post("game", credentials);
  },
  action(credentials) {
    return Api().post("action", credentials);
  },

  join(credentials) {
    return Api().post("join", credentials);
  },
  changePassword(credentials) {
    return Api().post("changePassword", credentials);
  },
};
