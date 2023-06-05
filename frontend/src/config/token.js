import clienteAxios from "./axios";

export default () => {
    const { token } = JSON.parse(localStorage.getItem("usuario"));

    if (token) {
        clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};
