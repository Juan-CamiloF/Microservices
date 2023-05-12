import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Dashboard() {

    const [usuarios,setUsuario] = useState([])
    const [tareas,setTareas] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const config = {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          };
    
          const medellin = await axios.get(
            `http://localhost:8080/api/v1/medellin/user`,
            config
          );

          const bogota = await axios.get(
            `http://localhost:8080/api/v1/bogota/user`,
            config
          );
    
          setUsuario([...medellin.data,...bogota.data]);
        };
        getUsers();
      }, []);

    useEffect(()=>{
        const getTasks = async () => {
            const config = {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            };
      
            const bogota = await axios.get(
              `http://localhost:8080/api/v1/bogota/user`,
              config
            );
      
            setTareas(bogota.data);
          };
          getTasks();
    },[])
    

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
                            <h2 className="text-indigo-700 dark:text-indigo-600 text-2xl leading-normal font-bold">2</h2>
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
                        <h3 className="font-normal leading-4 text-gray-800 dark:text-gray-100 text-base">Total Usuarios de Bogotá</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-indigo-700 dark:text-indigo-600 text-2xl leading-normal font-bold">{tareas.length}</h2>
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
                <div className="bg-white dark:bg-gray-800 rounded py-5 pl-6 flex items-start shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard text-gray-700 dark:text-gray-400" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={12} cy={13} r={2} />
                        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                        <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-normal leading-4 text-gray-800 dark:text-gray-100 text-base">Total Administradores</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-indigo-700 dark:text-indigo-600 text-2xl leading-normal font-bold">2</h2>
                            <p className="ml-2 mb-1 text-sm text-gray-600 dark:text-gray-400"></p>
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
                <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">Administradores</h4>

            </div>

            <div className="py-10 container mx-auto overflow-x-auto">




                <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-200">
                            <th className="py-5 pl-2 sm:pl-10 w-1/4 text-base dark:text-gray-100 text-gray-800">Nombre</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center pr-8">Cargo</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center">Estado</th>
                            <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-right pr-2 sm:pr-10">Ciudad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="pl-2 sm:pl-10 pr-2 py-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12">
                                        <img src="	https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" alt className="w-full h-full object-cover rounded shadow" />
                                    </div>
                                    <div className="pl-4">
                                        <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm">Andres Felipe</p>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">andres@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-2 pt-4 pb-5 text- gray-800 text-xs sm:text-sm">
                                <div className="xl:pl-32 flex flex-col">
                                    <div>
                                        <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm pb-1">Director</p>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Ingeniería y Desarrollo</span>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-2 pt-4 pb-5 text-green-400 text-xs sm:text-sm text-center">Activo</td>
                            <td className="pt-4 pb-5 dark:text-gray-100 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-right">Bogotá</td>
                        </tr>
                        
                        <tr className="border-b border-gray-200">
                            <td className="pl-2 sm:pl-10 pr-2 py-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12">
                                        <img src="	https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" alt className="w-full h-full object-cover rounded shadow" />
                                    </div>
                                    <div className="pl-4">
                                        <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm">Juan Camilo</p>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">juan@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-2 pt-4 pb-5 text- gray-800 text-xs sm:text-sm">
                                <div className="xl:pl-32 flex flex-col">
                                    <div>
                                        <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm pb-1">Director</p>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Ingeniería y Desarrollo</span>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-2 pt-4 pb-5 text-green-400 text-xs sm:text-sm text-center">Activo</td>
                            <td className="pt-4 pb-5 dark:text-gray-100 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-right">Bogotá</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}
