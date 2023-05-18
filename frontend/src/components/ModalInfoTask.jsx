import React, { useState } from "react";

const ModalInfoTask = ({ taskInfo, handleModalInfo }) => {
 
  const [userUpdate, setUserUpdate] = useState(taskInfo);

  const { title, description } = userUpdate;

  return (
    <>
      <div
        id="popup"
        className="z-50 fixed w-full flex justify-center inset-0 "
      >
        <div
          onClick={handleModalInfo}
          className="w-full h-full z-0 absolute bg-gray-600 bg-opacity-75 inset-0"
        />
        <div className="mx-auto container">
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p className="text-base font-semibold dark:text-white">
                  Información de tarea 
                </p>
                <button
                  onClick={handleModalInfo}
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
                  <div className="w-40 h-40 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5 12H22.515"
                        stroke="#94A3B8"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25.5 6H10.5C8.01472 6 6 8.01472 6 10.5V25.5C6 27.9853 8.01472 30 10.5 30H25.5C27.9853 30 30 27.9853 30 25.5V10.5C30 8.01472 27.9853 6 25.5 6Z"
                        stroke="#94A3B8"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 22.4999L12 16.4999C12.6841 15.8417 13.4601 15.4951 14.25 15.4951C15.0399 15.4951 15.8159 15.8417 16.5 16.4999L24 23.9999"
                        stroke="#94A3B8"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 20.9999L22.5 19.4999C23.1841 18.8417 23.9601 18.4951 24.75 18.4951C25.5399 18.4951 26.3159 18.8417 27 19.4999L30 22.4999"
                        stroke="#94A3B8"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <form className="mt-11">
                  <div className="flex items-center space-x-9">
                    <input
                      name="title"
                      value={title}
     
                      placeholder="Título"
                      disabled={true}
                      className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200 dark:bg-gray-500 dark:text-white dark:placeholder-slate-100 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center space-x-9 mt-8">
                    <textarea
                      name="description"
                      value={description}
                      disabled={true}

                      placeholder="Descripción"
                      className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full text-sm resize-none focus:outline-none"
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-9">
                    <button
                      onClick={handleModalInfo}
                      className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-800 hover:bg-opacity-80 shadow rounded text-sm text-white"
                    >
                      Confirmar cambios
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
};

export default ModalInfoTask;