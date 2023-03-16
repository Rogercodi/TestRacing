import React, { useContext, useState, useEffect } from "react";
import { racingContext } from "../../context/Context";
import Form from "../form-elements/Form";
import Titlecard from "../form-elements/Titlecard";
import Button from "../form-elements/Button";
import Box from "../setup-elements/Box";
import InputSetup from "../setup-elements/InputSetup";
import Titlebox from "../setup-elements/Titlebox";
import BorderedBox from "../setup-elements/BorderedBox";
import TitleArea from "../setup-elements/TitleArea";
import { useNavigate } from "react-router-dom";

function SetupForm(props) {
  const { axiosCall, user, editRef, editId, editSetupData, flag } = useContext(racingContext);
  const navigate = useNavigate();



  const [referencia, setReferencia] = useState(editSetupData[0].referencia);
  const [fecha, setFecha] = useState(editSetupData[0].fecha);
  const [marcaF, setMarcaF] = useState(editSetupData[0].neumaticos.delantero.marcaF);
  const [modeloF, setModeloF] = useState(editSetupData[0].neumaticos.delantero.modeloF);
  const [medidasF, setMedidasF] = useState(editSetupData[0].neumaticos.delantero.medidasF);
  const [marcaR, setMarcaR] = useState(editSetupData[0].neumaticos.trasero.marcaR);
  const [modeloR, setModeloR] = useState(editSetupData[0].neumaticos.trasero.modeloR);
  const [medidasR, setMedidasR] = useState(editSetupData[0].neumaticos.trasero.medidasR);
  const [presionFrioF, setPresionFrioF] = useState(editSetupData[0].neumaticos.delantero.presionFrioF);
  const [presionCalienteF, setPresionCalienteF] = useState(editSetupData[0].neumaticos.delantero.presionCalienteF);
  const [presionFrioR, setPresionFrioR] = useState(editSetupData[0].neumaticos.trasero.presionFrioR);
  const [presionCalienteR, setPresionCalienteR] = useState(editSetupData[0].neumaticos.trasero.presionCalienteR);
  const [precargaF, setPrecargaF] = useState(editSetupData[0].suspension.delantera.precargaF);
  const [aceiteF, setAceiteF] = useState(editSetupData[0].suspension.delantera.aceiteF);
  const [durezaMuelleF, setDurezaMuelleF] = useState(editSetupData[0].suspension.delantera.durezaMuelleF);
  const [precargaR, setPrecargaR] = useState(editSetupData[0].suspension.trasera.precargaR);
  const [aceiteR, setAceiteR] = useState(editSetupData[0].suspension.trasera.aceiteR);
  const [durezaMuelleR, setDurezaMuelleR] = useState(editSetupData[0].suspension.trasera.durezaMuelleR);
  const [pino, setPino] = useState(editSetupData[0].desarrollo.pino);
  const [plato, setPlato] = useState(editSetupData[0].desarrollo.plato);
  const [vehiculo, setVehiculo] = useState(editId[0]);
  const [setupId, setSetupId] = useState(editSetupData[0]._id);

  let body = {
    setupId,
    vehiculo,
    referencia,
    fecha,
    neumaticos: 
      {
        delantero: {
          marcaF,
          modeloF,
          medidasF,
          presionFrioF,
          presionCalienteF,
        },
        trasero: {
          marcaR,
          modeloR,
          medidasR,
          presionFrioR,
          presionCalienteR,
        },
      },
    
    suspension: 
      {
        delantera: {
          precargaF,
          aceiteF,
          durezaMuelleF,
        },
        trasera: {
          precargaR,
          aceiteR,
          durezaMuelleR,
        },
      },
    

    desarrollo: {
      pino,
      plato,
    },
  };

  const newSetup = () => {
    axiosCall("/user/myvehicles/setup", body, "post").then((data) => {
      user[1](data.data.user);
    });
   
    editId[1](''); 
    navigate("/user/myvehicles");
  };

  const editSetup = () => {
    axiosCall("/user/myvehicles/editsetup", body, "put").then((data) => {
      user[1](data.data.user);
       });
       editSetupData[1]({
      desarrollo: {},
      suspension: {
        delantera: {},
        trasera: {},
      },
      neumaticos: {
        delantero: {},
        trasero: {},
      },
    });
    editId[1]('');
    flag[1](false);
    editRef[1]('')
    navigate("/user/myvehicles");
  };
  return (
    <div className=" bg-white max-w-screen-xl flex flex-col mx-auto border-black border-2 my-8 rounded-lg">
      <Form
        className={"bg-white p-2"}
        onSubmit={{
          edit: editSetup,
          new: newSetup,
        }}
      >
        <Titlecard className="uppercase flex">hoja de configuracion</Titlecard>
        <BorderedBox>
          <Titlebox>datos</Titlebox>
          <Box className="flex flex-row justify-evenly">
            <InputSetup
              label="Referencia"
              name="Ej: Alcarrás seco"
              onChange={setReferencia}
              value={referencia}
              
            ></InputSetup>
            <InputSetup
              label="fecha"
              type="date"
              onChange={setFecha}
              value={fecha}
              className="m-1 text-lg bg-slate-300 text-center rounded-lg px-3"
            ></InputSetup>
          </Box>
        </BorderedBox>
        <BorderedBox>
          <Titlebox>neumaticos</Titlebox>
          <Box className={" flex flex-row justify-evenly "}>
            <Box>
              <TitleArea>delantero</TitleArea>
              <InputSetup
                label={"Marca"}
                value={marcaF}
                onChange={setMarcaF}
              ></InputSetup>
              <InputSetup
                label={"Modelo"}
                value={modeloF}
                onChange={setModeloF}
              />
              <InputSetup
                label={"Medidas"}
                value={medidasF}
                onChange={setMedidasF}
              />
              <InputSetup
                label={"Presion frio"}
                value={presionFrioF}
                onChange={setPresionFrioF}
              />
              <InputSetup
                label={"Presion caliente"}
                value={presionCalienteF}
                onChange={setPresionCalienteF}
              />
            </Box>
            <Box>
              <TitleArea>trasero</TitleArea>
              <InputSetup label={"Marca"} value={marcaR} onChange={setMarcaR} />
              <InputSetup
                label={"Modelo"}
                value={modeloR}
                onChange={setModeloR}
              />
              <InputSetup
                label={"Medidas"}
                value={medidasR}
                onChange={setMedidasR}
              />
              <InputSetup
                label={"Presion frio"}
                value={presionFrioR}
                onChange={setPresionFrioR}
              />
              <InputSetup
                label={"Presion caliente"}
                value={presionCalienteR}
                onChange={setPresionCalienteR}
              />
            </Box>
          </Box>
        </BorderedBox>
        <BorderedBox>
          <Titlebox>suspension</Titlebox>
          <Box className={"flex flex-row justify-evenly"}>
            <Box>
              <TitleArea>delantera</TitleArea>
              <InputSetup
                label={"Precarga"}
                value={precargaF}
                onChange={setPrecargaF}
              />
              <InputSetup
                label={"Aceite"}
                value={aceiteF}
                onChange={setAceiteF}
              />
              <InputSetup
                label={"Dureza muelle"}
                value={durezaMuelleF}
                onChange={setDurezaMuelleF}
              />
            </Box>
            <Box>
              <TitleArea>trasera</TitleArea>
              <InputSetup
                label={"Precarga"}
                value={precargaR}
                onChange={setPrecargaR}
              />
              <InputSetup
                label={"Aceite"}
                value={aceiteR}
                onChange={setAceiteR}
              />
              <InputSetup
                label={"Dureza muelle"}
                value={durezaMuelleR}
                onChange={setDurezaMuelleR}
              />
            </Box>
          </Box>
        </BorderedBox>
        <BorderedBox className={""}>
          <Box>
            <Titlebox
              className={
                "text-4xl uppercase flex justify-center font-extrabold pt-2 pb-10"
              }
            >
              desarrollo
            </Titlebox>
            <Box className="flex flex-row mx-auto">
              <InputSetup label={"Piño"} value={pino} onChange={setPino} />
              <InputSetup label={"Plato"} value={plato} onChange={setPlato} />
            </Box>
          </Box>
        </BorderedBox>
        <Button>GUARDAR</Button>
      </Form>
    </div>
  );
}

export default SetupForm;
