import React from "react";
import videoPit from "../../assets/Pitbiketest.mp4";
import videoSb from "../../assets/SBtest.mp4";

export function Root() {
  return (
    <div>
      <h1 className="welcome-title">Bienvenido/a al portal de TestRacing!</h1>
      <div className="icono">
        <img width="300" src="/imagenes/iconomoto3.png.png" alt="icono moto" />
      </div>

      <div className="welcome-text">
        <p className="p-text">
          TestRacing es una aplicacion con la que podras registrar cualquier
          sesion de entrenamiento o competicion que realices, asi siempre
          tendras tus registros guardados y clasificados segun circuito y
          condiciones del circuito.
        </p>
        <p className="p-text">
          TestRacing tambien ofrece la posibilidad de guardar tus propios
          vehiculos y asignar diferentes configuraciones de puesta a punto.{" "}
        </p>
      </div>

      <div className="contenedor-videos">
        <div className="video" id="video">
          <video width="500" src={videoPit} autoPlay muted loop seekTo />
        </div>

        <div className="video" id="video">
          <video width="500" src={videoSb} autoPlay muted loop />
        </div>
      </div>
    </div>
  );
}
