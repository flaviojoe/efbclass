export default function () {
  return {
    loggedIn: false,
    loading: false,
    user: {
      token: "",
      expiry: "",
      username: "",
      first_name: "",
      last_name: "",
      groups: [],
      foto_perfil: ""
    }
  };
};
