import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { racingContext } from '../../context/Context';

function LogInForm(props) {
  const navigate = useNavigate();

  const {messages, axiosCall, user} = useContext(racingContext);

  const logIn = async () => {
    console.log('hola')
    
    let body = {
      email,
      password,
      };
      
    await axiosCall("/login", body, "post").then((data) => {
      console.log(data)
      if (data.status === 201) {
        messages[1](data.data.message)
      
        user[1](data.data.user)
        navigate("/user"); 
      }
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div >
      <section className=" h-full gradient-form bg-gray-200 md:h-screen"> 
  <div className="m-auto container py-12 px-6 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="xl:w-10/12">
        <div className="block bg-white shadow-lg rounded-lg">
          <div className="lg:flex lg:flex-wrap g-0">
            <div className="lg:w-6/12 px-4 md:px-0">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Bienvenido a TestRacing!</h4>
                </div>
                <form>
                  <p className="mb-4">Por favor, inicie sesión</p>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Password"
                      onChange={(e) => 
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                  <div className="text-center pt-1 mb-12 pb-1">
                    <button
                      className="text-black inline-block px-6 py-2.5  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      style={{
                        background: "linear-gradient(to right, #f2dd8c, #d9d9d9)"}}
                      onClick={() => logIn()}
                    >
                      Iniciar Sesión
                    </button>
                    <a className="text-gray-500" href="#!">Ha olvidado la contraseña?</a>
                  </div>
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Todavia no estás registrado? <a href='/signup' className='font-extrabold' >Haz click aqui</a></p>
                    <button
                      type="button"
                      className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Danger
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              style={{
                background: "linear-gradient(to right, #f2dd8c, #d9d9d9)", 
              }}
            >
              <div className="text-black px-4 py-6 md:p-12 md:mx-6 ">
                <h4 className="text-xl font-semibold mb-6">TestRacing, tu portal de registros de competicion</h4>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default LogInForm