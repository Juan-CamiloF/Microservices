import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAddTask from "./ModalAddTask";
import ModalEditTask from "./ModalEditTask";
import ModalInfoTask from "./ModalInfoTask";
import clienteAxios from "../config/axios";

function TableTasks({ id, city }) {


  const [show, setShow] = useState(null);

  const [modal, setModal] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const [number, setNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [numberOfElements, setNumberOfElements] = useState(0)

  const handleModalAddTask = () => {


    setModal(!modal);
  };

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const handleModalInfo = () => {
    setModalInfo(!modalInfo);
  };

  const handleModalInfoTask = (task) => {
    setShow(null);
    setModalInfo(!modalEdit);
    setUserInfo(task);
  };

  const handleModalEditTask = (task) => {
    setShow(null);
    setModalEdit(!modalEdit);
    setUserEdit(task);
  };

  const [taks, setTaks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const { token } = JSON.parse(localStorage.getItem("usuario"));

      const config = {
        headers: {

          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.get(
        `http://localhost:8080/api/v1/${city}/task/by-user/${id}?pageNumber=${number}&pageSize=5`,
        config
      );

      setNumber(data.number)
      setTotalElements(data.totalElements)
      setNumberOfElements(data.numberOfElements)
      setTotalPages(data.totalPages)
      setTaks([...data.content]);
    };
    getTasks();
  }, [number]);

  const editarUsuario = async (updateUser) => {
    const { token } = JSON.parse(localStorage.getItem("usuario"));

    const config = {
      headers: {

        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await clienteAxios.put(
      `http://localhost:8080/api/v1/${city}/task/${updateUser.id}`,
      updateUser,
      config
    );


    toast.success("Tarea actualizada correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const user = taks.map((userState) =>
      userState.id !== updateUser.id ? userState : updateUser
    );



    setTaks(user);
  };

  const eliminarTarea = async (id) => {
    setShow(null);
    const { token } = JSON.parse(localStorage.getItem("usuario"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await clienteAxios.delete(`http://localhost:8080/api/v1/${city}/task/${id}`, config);

    toast.success("Tarea eliminada correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const task = taks.filter((taskState) => taskState.id !== id);

    setTaks(task);
  };

  const crearTask = async (newTask) => {
    const { token } = JSON.parse(localStorage.getItem("usuario"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    newTask.userId = id;

    const { data } = await clienteAxios.post(
      `http://localhost:8080/api/v1/${city}/task`,
      newTask,
      config
    );

    toast.success("Tarea asignada correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (taks.length < 5) {
      setTaks([...taks, data.task]);
    }

    setTotalElements(totalElements + 1)
   
  };

  const updateStatus = async (task) => {
    const config = {
      "Content-Type": "application/json;charset=UTF-8",

    };

    if (task.status != "Finalizada") {
      task.status = "Finalizada";
    } else {
      task.status = "En progreso";
    }

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/task/${task.id}`,
      task,
      config
    );

    toast.success("Tarea actualizada correctamente", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const user = taks.map((userState) =>
      userState.id !== task.id ? userState : task
    );

    setTaks(user);
  };

  return (
    <>
      <div className="w-full  mt-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white">
              Tareas
            </p>
            <div>
              <button
                onClick={handleModalAddTask}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-gray-500 hover:bg-gray-700 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Nueva tarea
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto dark:bg-gray-700">
          {taks.length <= 0 ? (
            <tr>
              <td></td>
              <td></td>
              <td>El usuario no tiene asignado ninguna tarea</td>
              <td></td>
            </tr>
          ) : (
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800 dark:text-white">
                  <th className="font-normal text-center ">ID</th>
                  <th className="font-normal text-center  ">Título</th>
                  <th className="font-normal text-center  ">Descripción</th>
                  <th className="font-normal text-center ">Estado</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {taks.length <= 0 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>El usuario no tiene asignado ninguna tarea</td>
                    <td></td>
                  </tr>
                ) : (
                  taks?.map((task, index) => (
                    <tr key={index} className="h-20 text-sm leading-none text-gray-800 dark:bg-gray-700 dark:text-white bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                      <td className="text-left">
                        <p className="text-sm font-medium leading-none text-gray-800 dark:text-white  max-w-max m-auto">
                          {task.id}
                        </p>
                      </td>
                      <td className="pl-11">
                        <p className="font-medium text-sm max-w-max m-auto leading-none">
                          {task.title}
                        </p>
                      </td>
                      <td>
                        <p className="text-sm w-96 m-auto text-ellipsis overflow-hidden ...font-medium leading-none text-gray-800 dark:text-white ">
                          {task.description}
                        </p>
                      </td>

                      <td className="w-4">
                        <p className={`text-sm w-full leading-3 text-gray-800 px-2 py-1.5 bg-yellow-100 rounded-full  group-hover:text-white ${task.status == "ABIERTA" ? "bg-blue-300" : task.status == "EN PROGRESO" ? "bg-yellow-300" : task.status == "TERMINADO" ? "bg-green-500 text-white" : "bg-blue-300"} `}>
                          {task.status}
                        </p>
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
                          <div className="dropdown-content bg-white dark:bg-gray-600 shadow w-24 absolute z-30 right-0 mr-60">
                            <div
                              className="text-xs w-full hover:bg-slate-500 py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white"
                              onClick={() => handleModalInfoTask(task)}
                            >
                              <p>Ver info</p>
                            </div>
                            <div
                              className="text-xs w-full hover:bg-slate-500 py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white"
                              onClick={() => handleModalEditTask(task)}
                            >
                              <p>Editar</p>
                            </div>
                            <div
                              className="text-xs w-full hover:bg-slate-500  py-4 px-4 cursor-pointer hover:text-white  dark:hover:text-white"
                              onClick={() => eliminarTarea(task.id)}
                            >
                              <p>Eliminar</p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {taks?.length !== 0 && (
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
        <ModalAddTask
          handleModalAddTask={handleModalAddTask}
          crearTask={crearTask}
          id={id}
          city={city}
        />
      )}

      {modalEdit && (
        <ModalEditTask
          userEdit={userEdit}
          handleModalEdit={handleModalEdit}
          editarUsuario={editarUsuario}
          id={id}
          city={city}
        />
      )}

      {modalInfo && (
        <ModalInfoTask taskInfo={userInfo} handleModalInfo={handleModalInfo}
          id={id}
          city={city} />
      )}
    </>
  );
}

export default TableTasks;
