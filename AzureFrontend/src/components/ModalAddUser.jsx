import React, { useState } from "react";

function ModalAddUser({ handleModalAddUser, crearUsuario }) {
  const [userNewUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const { email, name, lastname } = userNewUser;

  const onChange = (e) => {
    setNewUser({
      ...userNewUser,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    crearUsuario(userNewUser);
    handleModalAddUser();
  };

  return (
    <>
      <div
        id="popup"
        className="z-50 fixed w-full flex justify-center inset-0 "
      >
        <div
          onClick={handleModalAddUser}
          className="w-full h-full z-0 absolute bg-gray-600 bg-opacity-75 inset-0"
        />
        <div className="mx-auto container">
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p className="text-base font-semibold dark:text-white">
                  Crear nuevo usuario
                </p>
                <button
                  onClick={handleModalAddUser}
                  className="focus:outline-none"
                >
                  <svg
                    className="dark:text-white"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7L7 21"
                      stroke="#A1A1AA"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 7L21 21"
                      stroke="#A1A1AA"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7 dark:bg-gray-600">
                <div className="flex items-center justify-center">
                  <div className="w-40 h-40  bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
                      alt
                    />
                  </div>
                </div>
                <form className="mt-11" onSubmit={onSubmit}>
                  <div className="flex items-center space-x-9">
                    <input
                      name="name"
                      value={name}
                      onChange={onChange}
                      placeholder="Nombres"
                      className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200 dark:bg-gray-500 dark:text-white dark:placeholder-slate-100 dark:border-gray-600"
                    />
                    <input
                      value={lastname}
                      onChange={onChange}
                      placeholder="Apellidos"
                      name="lastname"
                      className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200 dark:bg-gray-500 dark:text-white dark:placeholder-slate-100 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center space-x-9 mt-8">
                    <input
                      placeholder="Email"
                      onChange={onChange}
                      value={email}
                      name="email"
                      type="email"
                      className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200 dark:bg-gray-500 dark:text-white dark:placeholder-slate-100 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-9">
                    <button
                      onClick={handleModalAddUser}
                      className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-800 hover:bg-opacity-80 shadow rounded text-sm text-white"
                    >
                      Crear usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAddUser;
