import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAddTask from "./ModalAddTask";
import ModalEditTask from "./ModalEditTask";
import ModalInfoTask from "./ModalInfoTask";

function TableTasks() {
  const { id } = useParams();

  const [show, setShow] = useState(null);

  const [modal, setModal] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

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
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };

      const { data } = await axios.get(
        `http://localhost:8081/api/v1/task/by-user/${id}`,
        config
      );

      setTaks([...data]);
    };
    getTasks();
  }, []);

  const editarUsuario = async (updateUser) => {
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    const { data } = await axios.put(
      `http://localhost:8081/api/v1/task/${updateUser.id}`,
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
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    await axios.delete(`http://localhost:8081/api/v1/task/${id}`, config);

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
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    newTask.userId = id;

    const { data } = await axios.post(
      `http://localhost:8081/api/v1/task`,
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

    setTaks([...taks, data.task]);
  };

  const updateStatus = async (task) => {
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    if (task.status != "Finalizada") {
      task.status = "Finalizada";
    } else {
      task.status = "En progreso";
    }

    const { data } = await axios.put(
      `http://localhost:8081/api/v1/task/${task.id}`,
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
                    <tr className="h-20 text-sm leading-none text-gray-800 dark:bg-gray-700 dark:text-white bg-white hover:bg-gray-100 border-b border-t border-gray-100">
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
                        <p className={`text-sm w-full leading-3 text-gray-800 px-2 py-1.5 bg-yellow-100 rounded-full group-hover:bg-yellow-700 group-hover:text-white ${task.status == "ABIERTA" ? "bg-gray-300" : task.status == "EN PROGRESO" ? "bg-yellow-300" : task.status == "PRUEBAS" ? "bg-blue-300" : "bg-green-300" } `}>
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
        </div>
      </div>

      {modal && (
        <ModalAddTask
          handleModalAddTask={handleModalAddTask}
          crearTask={crearTask}
        />
      )}

      {modalEdit && (
        <ModalEditTask
          userEdit={userEdit}
          handleModalEdit={handleModalEdit}
          editarUsuario={editarUsuario}
        />
      )}

      {modalInfo && (
        <ModalInfoTask taskInfo={userInfo} handleModalInfo={handleModalInfo} />
      )}
    </>
  );
}

export default TableTasks;