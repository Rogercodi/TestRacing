import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { racingContext } from "../../context/Context";
import Form from "../form-elements/Form";
import Titlecard from "../form-elements/Titlecard";
import Input from "../form-elements/InputForms";
import Button from "../form-elements/Button";



function VehicleForm() {
  const { user, axiosCall, editData, flag } = useContext(racingContext);
  const navigate = useNavigate();
  const [alias, setAlias] = useState(editData[0].alias || '');
  const [marca, setMarca] = useState(editData[0].marca || '');
  const [modelo, setModelo] = useState(editData[0].modelo || '');
  const [cilindrada, setCilindrada] = useState(editData[0].cilindrada || '');

  const newVehicle = async () => {
    let body = {
      owner: user[0]._id,
      alias,
      marca,
      modelo,
      cilindrada,
      configuraciones: [],
    };

    axiosCall("/user/newvehicle", body, "post").then((data) =>
      user[1](data.data.user)
    );
    editData[1]('')
    navigate("/user/myvehicles");
  };

  const editVehicle = (id) => {
    let body = {
      owner: user[0]._id,
      alias,
      marca,
      modelo,
      cilindrada,
      configuraciones: [],
    };

    axiosCall(`/user/editvehicle/${id}`, body, "put").then((data) => {
      user[1](data.data.user);
      editData[1]('');
      flag[1](false);
      navigate("/user/myvehicles");
    });
  };

  return (
  
      <div className=" mt-12 flex justify-center text-2xl">
        <Form onSubmit={{new: newVehicle, edit: editVehicle}}>
          <Titlecard>HOJA DE VEHÍCULO</Titlecard>       
          <Input onChange={setAlias} options={user[0].vehiculos} value={alias} label='ALIAS' name='Alias' ></Input>
          <Input onChange={setMarca} value={marca} label={'MARCA'} name={'Marca'}></Input>
          <Input onChange={setModelo} value={modelo} label={'MODELO'} name={'Modelo'}></Input>
          <Input onChange={setCilindrada} value={cilindrada} label={'CILINDRADA'} name={'Cilindrada'}></Input>
          <Button>GUARDAR</Button>
        </Form>
      </div>
    
    
    
  );
}

export default VehicleForm;
