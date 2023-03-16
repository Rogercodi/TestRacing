import Reactm, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { racingContext } from "../../context/Context";

function Sessions() {
  const navigate = useNavigate();

  const { user, axiosCall, editData, flag } = useContext(racingContext);
  let sessions = user[0].sessions;
  console.log(sessions)

  const deleteSession = (id) => {
    axiosCall(`/user/deletesession/${id}`, {}, 'delete').then((data) => user[1](data.data.user))
  };

  

  return (
    <div>
      <h1 className="font-bold text-5xl max-w-7xl flex justify-center p-10">
        Mis Sesiones
      </h1>
      <div className="flex flex-col">
        <div className="w-screen overflow-hidden sm:-mx-6 lg:-mx-auto">
          <div className=" w-screen py-2 sm:px-6 lg:px-8">
            <div className="flex w-screen justify-center">
              <table className=" w-screen text-center text-sm font-light shadow-inherit">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className="">
                      #
                    </th>
                    <th scope="col" className="">
                      Vehiculo
                    </th>
                    <th scope="col" className="">
                      Configuración
                    </th>
                    <th scope="col" className="">
                      Circuito
                    </th>
                    
                    <th scope="col" className="">
                      Tipo de sesion
                    </th>
                    <th scope="col" className=" ">
                      Fecha
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Mejor Vuelta
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((item, index) => {
                    console.log(item)
                    return (
                      <>
                        <tr className="border-b-gray-500 border-b-2 border-double">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium ">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.vehiculo}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            <p>{'config'}</p>
                          <button
                                  
                                  type="button"
                                  data-te-ripple-init
                                  data-te-ripple-color="light"
                                  class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                >
                                  Ver Configuración
                                </button>
                          </td>
                          
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.circuito}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.tipo}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.fecha}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.mejorvuelta}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            <button
                              onClick={() => {
                                flag[1](true);
                                editData[1](item)
                                navigate("/user/editsession");
                              }}
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => deleteSession(item._id)}
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="inline-block rounded bg-blue-800 px-3 py-1  text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              Borrar
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start space-x-2 pb-8 pt-4 ml-2">
        <button
          onClick={() => navigate("/user/newsession")}
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="inline-block rounded bg-blue-800 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >
          Nueva sesion
        </button>
      </div>
    </div>
  );
}

export default Sessions;
