import React from "react";

function ModalDashboard (){
    return (
        <section className="modal">
            <div className="modal__container">
                <form action="" id="miFormulario">
                        <h2 className="modal__title">Crear Categoria</h2>
                        <div className="inputs_formulario">
                            <label for="nombre">Nombre De La Categoria:</label>
                            <input type="text" name="nombre" id="nombre" className="Labels" />
                            <span id="" className="error"></span>
                        </div>
                        <div className="inputs_formulario">
                            <label for="estado">Estado:</label>
                            <select name="estado" id="estado" className="Labels">
                                <option selected>Seleciona Uno</option>
                                <option value="" >Activo</option>
                                <option value="">Inactivo</option>
                            </select>
                            <span id="" className="error"></span>
                        </div>
                        <div className="botones_formulario">
                            <button type="submit" className="boton_formulario">Crear</button>
                            <button className="close__modal">Cancelar</button>
                        </div>
                </form>
            </div>
        </section>
    
    )
}

export default ModalDashboard