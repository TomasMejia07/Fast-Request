import React, { useState, useRef } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard  from '../../components/Dashboard/ModalDashboard';

const CategoriaDashboard = ({ onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (formRef.current) formRef.current.reset(); // Resetea el formulario
  };

  return (
    <DashboardLayout title="Categoria">
      <div className="container_tablas">
        <div className="table_Header">
          <h2>Categorias</h2>
          <button className="boton_raro" onClick={openModal}>Crear Nuevo</button>
          <select className="select_tabla" name="select_tabla" id="">
            <option defaultValue>Estado</option>
            <option value="">Activa</option>
            <option value="">Inactiva</option>
          </select>
          <div className="input_search">
            <input type="search" placeholder="Buscar" />
            <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre de la categoria<ion-icon name="chevron-expand-outline"></ion-icon></th>
              <th>Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
              <th>Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Categoria 1</td>
              <td>Inactiva</td>
              <td>
                <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
              </td>
            </tr>
            <tr>
              <td>Categoria 2</td>
              <td>Activa</td>
              <td>
                <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ModalDashboard show={modalVisible} onClose={closeModal}>
        <form id="miFormulario" ref={formRef}>
          <h2 className="modal__title">Crear Categoria</h2>
          <div className="inputs_formulario">
            <label htmlFor="nombre">Nombre De La Categoria:</label>
            <input type="text" name="nombre" id="nombre" className="Labels" />
            <span className="error"></span>
          </div>
          <div className="inputs_formulario">
            <label htmlFor="estado">Estado:</label>
            <select name="estado" id="estado" className="Labels">
              <option defaultValue>Seleciona Uno</option>
              <option value="">Activo</option>
              <option value="">Inactivo</option>
            </select>
            <span className="error"></span>
          </div>
          <div className="botones_formulario">
            <button type="submit" className="boton_formulario">Crear</button>
            <button className="close__modal" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </ModalDashboard>
    </DashboardLayout>
  );
};

export default CategoriaDashboard;
