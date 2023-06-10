import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDarkSide from "../hooks/useDarkSite";
import Header from "./Header";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import clienteAxios from "../config/axios";

function TableUsers() {

  const { city } = useParams()

  const [ciudad, setCiudad] = useState(city)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCiudad(city)
  }, [city])

  const [show, setShow] = useState(null);

  const [modal, setModal] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [number, setNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [numberOfElements, setNumberOfElements] = useState(0)

  const handleModalAddUser = () => {
    setModal(!modal);
  };

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const handleModalEditUser = (user) => {
    setShow(null);
    setModalEdit(!modal);
    setUserEdit(user);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { token } = JSON.parse(localStorage.getItem("usuario"));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.get(
        `http://localhost:8080/api/v1/${ciudad}/user?pageNumber=${number}&pageSize=5`,
        config
      );

      setNumber(data.number)
      setTotalElements(data.totalElements)
      setNumberOfElements(data.numberOfElements)
      setTotalPages(data.totalPages)
      setUsers([...data.content]);
    };
    getUsers();
  }, [ciudad, number]);

  const editarUsuario = async (updateUser) => {
    const { token } = JSON.parse(localStorage.getItem("usuario"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await clienteAxios.put(
      `http://localhost:8080/api/v1/${ciudad}/user/${updateUser.id}`,
      updateUser,
      config
    );

    toast.success("Usuario actualizado correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const user = users.map((userState) =>
      userState.id !== updateUser.id ? userState : updateUser
    );

    setUsers(user);
  };

  const eliminarUsuario = async (id) => {
    setShow(null);
    const { token } = JSON.parse(localStorage.getItem("usuario"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`http://localhost:8080/api/v1/${ciudad}/user/${id}`, config);

    toast.success("Usuario eliminado correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const user = users.filter((userState) => userState.id !== id);

    setUsers(user);
  };

  const crearUsuario = async (newUser) => {

    const { token } = JSON.parse(localStorage.getItem("usuario"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    newUser.password = "123456";

    const { data } = await clienteAxios.post(
      `http://localhost:8080/api/v1/${ciudad}/user`,
      newUser,
      config
    );

    toast.success("Usuario creado correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (users.length < 5) {
      setUsers([...users, data.user]);
    }

    setTotalElements(totalElements + 1)
  };

  return (
    <>
      <div className="w-full sm:px-6 mt-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white">
              Usuarios
            </p>
            <div>
              <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-gray-500 hover:bg-gray-700 focus:outline-none rounded">
                <p
                  className="text-sm font-medium leading-none text-white"
                  onClick={handleModalAddUser}
                >
                  Nuevo usuario
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto dark:bg-gray-700">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800 dark:text-white">
                <th className="font-normal text-left pl-4">ID</th>
                <th className="font-normal text-left pl-12">Usuario</th>
                <th className="font-normal text-left pl-16">
                  Última fecha de actualización
                </th>
                <th className="font-normal text-left pl-16">
                  Fecha de registro
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {users?.map((user, index) => (
                <tr key={index} className="h-20 text-sm leading-none text-gray-800 dark:bg-gray-700 dark:text-white bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="pl-4 text-left">
                    <p className="text-sm font-medium leading-none text-gray-800 dark:text-white">
                      {user.id}
                    </p>
                  </td>
                  <td className="pl-12 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full rounded-sm"
                          src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
                        />
                      </div>
                      <div className="pl-4">
                        <p className="font-medium">{user.email}</p>
                        <p className="text-xs leading-3 text-left text-gray-600 pt-2 dark:text-white">
                          {user.name} {user.lastname}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm font-medium leading-none text-gray-800 dark:text-white text-center">
                      {user.updatedAt}
                    </p>
                  </td>

                  <td>
                    <p className="font-medium text-center">{user.createdAt}</p>
                  </td>

                  <td className="px-7 2xl:px-0">
                    {show == index ? (
                      <button
                        onClick={() => setShow(null)}
                        className="focus:outline-none pl-7"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => setShow(index)}
                        className="focus:outline-none pl-7"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                            stroke="#A1A1AA"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                    {show == index && (
                      <div className="dropdown-content bg-white dark:bg-gray-600 shadow w-24 absolute z-30 right-0 mr-36 ">
                        <Link to={`/dashboard/perfil?id=${user.id}&ciudad=${city}`}>
                          <div className="text-xs w-full hover:bg-slate-500 py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white">
                            <p>Ver perfil</p>
                          </div>
                        </Link>
                        <div
                          className="text-xs w-full hover:bg-slate-500 py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white"
                          onClick={() => handleModalEditUser(user)}
                        >
                          <p>Editar</p>
                        </div>
                        <div
                          className="text-xs w-full hover:bg-slate-500  py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white"
                          onClick={() => eliminarUsuario(user.id)}
                        >
                          <p>Eliminar</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users?.length !== 0 && (
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <p className="text-xs xs:text-sm text-gray-900 mb-1">
                Pag {number + 1} de {totalPages}
              </p>
              <p className="text-xs xs:text-sm text-gray-900">
                Mostrando de 1 a {numberOfElements} entradas de {totalElements}
              </p>

              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() => number + 1 !== 1 && setNumber(number - 1)}
                  className={`text-sm font-semibold py-2 px-4 rounded-r ${(number + 1) !== 1
                      ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                      : "disabled:opacity-25"
                    }`}
                  disabled={(number + 1) !== 1 ? false : true}
                >
                  Ant
                </button>
                <button
                  onClick={() =>
                    number < totalPages && setNumber(number + 1)
                  }
                  className={`text-sm font-semibold py-2 px-4 rounded-r ${(number + 1) < totalPages
                      ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                      : "disabled:opacity-25"
                    }`}
                  disabled={number + 1 < totalPages ? false : true}
                >
                  Sig
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {modal && (
        <ModalAddUser
          handleModalAddUser={handleModalAddUser}
          crearUsuario={crearUsuario}
        />
      )}
      {modalEdit && (
        <ModalEditUser
          userEdit={userEdit}
          handleModalEdit={handleModalEdit}
          editarUsuario={editarUsuario}
        />
      )}
    </>
  );
}

export default TableUsers;
