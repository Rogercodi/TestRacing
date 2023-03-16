import { useContext, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { racingContext } from "../../context/Context";

function Vehicles() {
  const navigate = useNavigate();

  const { user, axiosCall, editData, editId, editRef, editSetupData, flag } =
    useContext(racingContext);

  const deleteVehicle = (id) => {
    axiosCall(`/user/deletevehicle/${id}`, {}, "delete").then((data) =>
      user[1](data.data.user)
    );
  };

 

  const loadsetup = (id) => {
    let ref = editRef[0];
    let vehicle = user[0].vehiculos.filter((veh) => {
      return veh._id.toString() === id;
    });
    let configuracion = vehicle[0].configuraciones.filter((conf) => {
      return conf.referencia === ref;
    });
    
    editSetupData[1](configuracion[0]);
    
  };

  const deleteSetup = () => {
    let ref = editRef[0];
    axiosCall(`/user/myvehicles/deletesetup/${ref}`, {}, "delete").then(
      (data) => {
        user[1](data.data.user);
      }
    );
  };

  return (
    <div>
      <h1 className="font-bold text-5xl w-screen text-center justify-center p-10">
        Mis Vehiculos
      </h1>
      <div className="flex flex-col">
        <div className="w-screen overflow-hidden sm:-mx-4 lg:-mx-auto">
          <div className=" w-screen py-2 sm:px-6 lg:px-8">
            <div className="flex w-screen justify-center">
              <table className=" w-screen text-center text-sm font-light shadow-inherit">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className="">
                      #
                    </th>
                    <th scope="col" className="">
                      Alias
                    </th>
                    <th scope="col" className="">
                      Marca
                    </th>
                    <th scope="col" className="">
                      Modelo
                    </th>
                    <th scope="col" className=" ">
                      Cilindrada
                    </th>
                    <th scope="col" className="w-1/6">
                      Configuraciones
                    </th>
                    <th scope="col" className=" py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user[0].vehiculos.map((item, index) => {
                    return (
                      <>
                        <tr className="border-b-gray-500 border-b-2 border-double">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium ">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.alias}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.marca}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.modelo}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.cilindrada}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            <div className=" flex flex-col mx-auto">
                              <select
                                onChange={(e) => {
                                  e.preventDefault(),
                                    editRef[1](e.target.value);
                                    
                                }}
                                className=" py-1 px-2 rounded-md text-sm text-center uppercase hover:bg-slate-300"
                              >
                                <option>selecciona una...</option>
                                {item.configuraciones.map((item) => {
                                  return (
                                    <option className=" rounded-md text-lg uppercase">
                                      {item.referencia}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="flex justify-center bg-slate-400">
                                <button
                                  onClick={() => {
                                    editId[1](item._id);
                                    navigate("/user/myvehicles/setup");
                                  }}
                                  type="button"
                                  data-te-ripple-init
                                  data-te-ripple-color="light"
                                  class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                >
                                  Nueva
                                </button>
                                <button
                                  onClick={(e) => {
                                    editId[1](item._id);
                                    flag[1](true)
                                    loadsetup(item._id);
                                    navigate("/user/myvehicles/setup");
                                  }}
                                  type="button"
                                  data-te-ripple-init
                                  data-te-ripple-color="light"
                                  class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => {
                                    deleteSetup();
                                  }}
                                  type="button"
                                  data-te-ripple-init
                                  data-te-ripple-color="light"
                                  class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                >
                                  Borrar
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap  px-6 py-4">
                            <button
                              onClick={() => {
                                flag[1](true);
                                editData[1](item);
                                navigate("/user/editvehicle");
                              }}
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              class="inline-block rounded bg-blue-800 px-3 py-1 m-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => deleteVehicle(item._id)}
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
          onClick={() => navigate("/user/newvehicle")}
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="inline-block mx-auto rounded bg-blue-800 px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >
          Nuevo vehiculo
        </button>
      </div>
    </div>
  );
}

export default Vehicles;
