import React, { useState, useEffect, useRef } from "react";

const permisosDisponibles = [
  "Crear Roles",
  "Crear Usuarios",
  "Hacer Pedidos",
  "Estadísticas",
  "Modificar Diseño",
  "Activar MIPAGINA"
];

function PermisosDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const filteredPermisos = permisosDisponibles.filter((permiso) =>
    permiso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheck = (permiso) => {
    if (checkedItems.includes(permiso)) {
      setCheckedItems(checkedItems.filter((item) => item !== permiso));
    } else {
      setCheckedItems([...checkedItems, permiso]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(permisosDisponibles);
    } else {
      setCheckedItems([]);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label htmlFor="search">Permisos:</label>
      <input
        type="text"
        id="search"
        className="dashinputs_formulario"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleDropdown}
      />
      {dropdownVisible && (
        <div id="options" className="options" style={{ display: "block" }}>
          <label>
            <input
              type="checkbox"
              value="all"
              checked={checkedItems.length === permisosDisponibles.length}
              onChange={handleSelectAll}
            />{" "}
            Todos
          </label>
          {filteredPermisos.map((permiso, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={permiso}
                checked={checkedItems.includes(permiso)}
                onChange={() => handleCheck(permiso)}
              />{" "}
              {permiso}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default PermisosDropdown;
