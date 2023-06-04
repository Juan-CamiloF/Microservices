import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context";
import jwt_decode from 'jwt-decode';
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [form, setForm] = useState({
        "email": "",
        "password": ""
    })

    const navigate = useNavigate()

    const { email, password } = form

    const { login } = useContext(UserContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
       localStorage.clear()
    },[])

    const hanldeSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            toast.error("Todos los campos son obligatorios", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        try {

            //const { data } = await clienteAxios.post('auth', form);

            //const usuario = jwt_decode(data.jwt);

            const usuario = jwt_decode("eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODU5MTk2ODAsInN1YiI6ImFkbWluQGdlbmVyYWwuY29tIiwiZXhwIjoxNjg2MDA2MDgwLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSX0NBTEkifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU5fQk9HT1RBIn0seyJhdXRob3JpdHkiOiJST0xFX1VTRVJfTUVERUxMSU4ifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU5fTUVERUxMSU4ifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU5fQ0FMSSJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9VU0VSX0JPR09UQSJ9XX0.kGwx7j42Zjz2S47KsSTtSAcbbToSXgMYTNUCj0-4QujFfnzh2gpkT86Rdbha3VtQPkICqM5H7Zt6jNCpGt0R3Q");

            console.log(usuario);

            localStorage.setItem('usuario', JSON.stringify({ authorities: usuario.authorities, auth: true, email: usuario.sub }));

            login(usuario)

            navigate("/dashboard")

        } catch (error) {
            console.log(error)
            toast.error("Credenciales inválidas", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    return (
        <section className="bg-white {-- h-screen --}">
            <div className="mx-auto flex justify-center h-full flex-col lg:flex-row">
                <form className="w-full lg:w-1/2 flex justify-center bg-white dark:bg-gray-900" onSubmit={hanldeSubmit}>
                    <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/3 text-gray-800 dark:text-gray-100 mb-12 sm:mb-0 flex flex-col justify-center px-2 sm:px-0">
                        <div className="px-2 flex flex-col items-center justify-center pt-12 lg:pt-0">
                            <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossless,ret_img/https://www.ulibertadores.edu.co/wp-content/uploads/lgogo-footer2.png" alt="logo libertadores" className="w-32 h-32" />
                        </div>
                        <div className="mt-8 w-full px-2 sm:px-6">
                            <div className="flex flex-col mt-8">
                                <label htmlFor="email" className="text-lg font-semibold leading-tight">
                                    Correo Electrónico
                                </label>
                                <input required id="email" name="email" onChange={handleChange} className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-green-700 dark:focus:border-green-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-300 border shadow" type="email" />
                            </div>
                            <div className="flex flex-col mt-5">
                                <label htmlFor="password" className="text-lg font-semibold fleading-tight">
                                    Contraseña
                                </label>
                                <input required id="password" name="password" onChange={handleChange} className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-green-700 dark:focus:border-green-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-300 border shadow" type="password" />
                            </div>
                        </div>

                        <div className="px-2 sm:mb-16 sm:px-6">
                            <button type="submit" className="focus:outline-none w-full sm:w-auto bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-3 text-sm mt-6">
                                Ingresa a tu cuenta
                            </button>
                        </div>
                    </div>
                </form>
                <div className="w-full lg:w-1/2 bg-green-600 px-2 py-40 sm:py-48 sm:px-12 flex flex-col justify-center relative bg-no-repeat bg-center bg-cover h-full" >
                    <div className="absolute top-0 right-0 pt-3 pr-3 text-white">
                        <svg width={199} height={131} xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(-90 65.5 65)" fill="#F7FAFC" fillRule="evenodd">
                                <rect width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" width="6.002" height="6.005" rx="3.001" />
                                <rect y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="192.117" width="6.002" height="6.005" rx="3.001" />
                            </g>
                        </svg>
                    </div>
                    <div className="flex relative z-30 flex-col justify-center pl-4 md:pr-12 xl:pr-12 md:pl-24">
                        <h3 className="text-4xl font-extrabold leading-tight text-white">
                            ¡Bienvenido al software   <br />
                            de gestión de tareas!
                        </h3>
                        <p className="text-xl text-white leading-normal pt-3 xl:w-10/12">Aquí podrás visualizar y asignar tareas de manera eficiente y colaborativa. Trabajemos juntos para potenciar la productividad de tu equipo. ¡Comencemos a gestionar y alcanzar nuestros objetivos!.</p>
                    </div>
                    <div className="z-20 absolute bottom-0 left-0 pb-3 pl-3 text-white">
                        <svg width={199} height={131} xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(-90 65.5 65)" fill="#F7FAFC" fillRule="evenodd">
                                <rect width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" width="6.002" height="6.005" rx="3.001" />
                                <rect y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="192.117" width="6.002" height="6.005" rx="3.001" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;
