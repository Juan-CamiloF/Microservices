import React, { useEffect, useState } from "react";
import useDarkSide from "../hooks/useDarkSite";
import Header from "./Header";
import TableTasks from "./TableTasks";

import { AiOutlineMail } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        const { data } = await axios.get(
          `http://localhost:8081/api/v1/user/${id}`,
          config
        );

        setUser(data);
      } catch (err) {
        navigate("/");
      }
    };

    getUser();
  }, [id]);

  const eliminarUsuario = async (id) => {
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    await axios.delete(`http://localhost:8081/api/v1/user/${id}`, config);

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

    navigate("/");
  };

  return (
    <>
      <div className="p-7 sm:px-6 flex justify-between items-start flex-col lg:flex-row gap-8 dark:bg-gray-500 rounded-md">
        <div className="div max-w-[705px] flex gap-7 flex-wrap">
          <div>
            <img
              alt="Profile Picture"
              className="w-[155px] h-[155px] rounded-sm"
              src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-x-4 flex-wrap mt-2">
              <p className="text-xl font-semibold leading-tight dark:text-white">
                {user.name} {user.lastname}
              </p>
            </div>
            <div className="flex gap-7 flex-wrap">
              <div className="flex gap-2 items-center">
                <AiOutlineMail className="w-4 h-4 text-black dark:text-white" />

                <p className="text-sm leading-none dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onclick="event.stopPropagation();toggleInteraction()"
            className="bg-red-700 text-white text-xs font-medium py-2 px-4 hover:bg-red-600 rounded-[4px]"
            onClick={() => eliminarUsuario(id)}
          >
            Eliminar
          </button>
        </div>
      </div>

      <TableTasks />
    </>
  );
};

export default Profile;
