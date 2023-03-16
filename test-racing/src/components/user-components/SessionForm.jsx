import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { racingContext } from "../../context/Context";
import Button from "../form-elements/Button";
import Input from "../form-elements/InputForms";
import Select from "../form-elements/Select";
import Titlecard from "../form-elements/Titlecard";
import Form from "../form-elements/Form";

function SessionForm() {
  
  const navigate = useNavigate();
  const { user, axiosCall, editData, flag } = useContext(racingContext);
  const [vehiculo, setVehiculo] = useState(editData[0].vehiculo || '');
  const [circuito, setCircuito] = useState(editData[0].circuito || '');
  const [tipo, setTipo] = useState(editData[0].tipo || '');
  const [mejorvuelta, setMejorvuelta] = useState(editData[0].mejorvuelta || '');
  const [fecha, setFecha] = useState(editData[0].fecha || '');
  const [setup, setSetup] = useState('')

  const newSession = () => {
    let body = {
      owner: user[0]._id,
      vehiculo,
      circuito,
      tipo,
      fecha,
      mejorvuelta,
    };
    axiosCall("/user/newsession", body, "post").then((data) => {
      user[1](data.data.user);
      editData[1]('')
      navigate("/user/mysessions");
    });
  };

  

  const editSession = (id) => {
    
    let body = {
      owner: user[0]._id,
      vehiculo,
      circuito,
      tipo,
      fecha,
      mejorvuelta,
    };
    axiosCall(`/user/editsession/${id}`, body, "put").then((data) => {
      user[1](data.data.user);
      flag[1](false);
      navigate("/user/mysessions");
    });
  };

  return (
    <div className=" mt-12 flex justify-center text-2xl">
     
      <Form onSubmit={{new: newSession, edit: editSession}}>
        <Titlecard>HOJA DE SESIÓN</Titlecard>       
        <Select onChange={setVehiculo} options={user[0].vehiculos} value={vehiculo} optionName='alias' >VEHICULO</Select>
        <Select onChange={setSetup} options={[1,2,3]} value={setup} optionName='alias' >CONFIGURACION</Select>
        <Input onChange={setCircuito} value={circuito} label={'CIRCUITO'} name={'circuito'}></Input>
        <Select onChange={setTipo} options={[{key: 'Entrenamiento'},{key: 'Clasificacion'},{key: 'Carrera'}]} optionName='key' value={tipo} >TIPO DE SESIÓN</Select>
        <Input onChange={setMejorvuelta} value={mejorvuelta} label={'VUELTA RÁPIDA'} name={'Ej: 1.02.512'}></Input>
        <Input onChange={setFecha} value={fecha} label={'FECHA'} name={'fecha'} type='date'></Input>
        
        <Button>GUARDAR</Button>
        </Form>
      
    </div>
  );
}

export default SessionForm;
