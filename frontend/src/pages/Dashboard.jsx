import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { UserContext } from "../context";
export default function Dashboard() {

    const [usuarios, setUsuario] = useState([])
    const [tareas, setTareas] = useState([])

    const { user } = useContext(UserContext)

    useEffect(() => {
        const getUsers = async () => {
            const config = {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            };




            if (user.authorities.length >= 7) {
                const { data } = await clienteAxios.get(
                    `users`,
                    config
                );


                setUsuario([...data]);
                return
            } else if (user.authorities.length >= 2) {

                const city = user.email.match(/@(.+?)\./)[1];

                const { data } = await clienteAxios.get(
                    `${city}/user`,
                    config
                );

                setUsuario([data]);

            }

        };

        getUsers();
    }, []);




    return (
        <>
            <div className="container px-6 mb-10 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
                <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">Dashboard</h4>

            </div>

            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded py-5 pl-6 flex items-start shadow">
                    <div className="text-gray-700 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={13} r={2} />
                            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                            <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                        </svg>
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-normal leading-4 text-gray-800 dark:text-gray-100 text-base">Total Ciudades</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-indigo-700 dark:text-indigo-600 text-2xl leading-normal font-bold">{user.authorities.length >= 7 ? 3 : 1}</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="3 17 9 11 13 15 21 7" />
                                    <polyline points="14 7 21 7 21 14" />
                                </svg>
                            </div>
                            <p className="text-green-400 text-xs tracking-wide font-bold leading-normal pl-1">100% Aumento</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded py-5 pl-6 flex items-start shadow">
                    <div className="text-gray-700 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={13} r={2} />
                            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                            <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                        </svg>
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-normal leading-4 text-gray-800 dark:text-gray-100 text-base">Total Usuarios</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-indigo-700 dark:text-indigo-600 text-2xl leading-normal font-bold">{usuarios.length}</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="3 17 9 11 13 15 21 7" />
                                    <polyline points="14 7 21 7 21 14" />
                                </svg>
                            </div>
                            <p className="text-green-400 text-xs tracking-wide font-bold leading-normal pl-1">100% Aumento</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container px-6 mt-10 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
                <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">Usuarios</h4>

            </div>

            <div className="py-10 container mx-auto overflow-x-auto">




                <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-200">
                            <th className="py-5 pl-2 sm:pl-10 w-1/4 text-base dark:text-gray-100 text-gray-800">ID</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center ">Usuario</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center">Última fecha de actualización</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-right pr-2 sm:pr-10">Fecha de registro</th>
                        </tr>
                    </thead>
                    <tbody>

                        {usuarios?.map((user, index) => (

                            <tr className="border-b border-gray-200">

                                <td className="pl-2 sm:pl-10 pr-2 py-4">
                                    <div className="flex items-center">
                                        {user.id}
                                    </div>
                                </td>

                                <td className=" pt-4 pb-5 text-center gray-800 text-xs sm:text-sm">
                                    <p className="font-medium">{user.email}</p>
                                    <p className="text-xs leading-3 text-left text-gray-600 pt-2 dark:text-white">
                                        {user.name} {user.lastname}
                                    </p>
                                </td>

                                <td className="pr-2 pt-4 pb-5  text-xs sm:text-sm text-center">   {user.updatedAt}</td>
                                <td className="pt-4 pb-5 dark:text-gray-100 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{user.createdAt}</td>
                            </tr>

                        ))}


                    </tbody>
                </table>
            </div>

        </>
    );
}
