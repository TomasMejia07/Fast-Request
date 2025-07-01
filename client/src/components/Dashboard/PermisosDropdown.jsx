import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function PermisosDropdown({ onChange }) {
  const [permisos, setPermisos] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Obtener los permisos desde el backend
  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/permisos"); // Ajusta si usas proxy
        setPermisos(res.data);
      } catch (error) {
        console.error("Error al cargar permisos:", error);
      }
    };

    fetchPermisos();
  }, []);

  // Notificar al componente padre
  useEffect(() => {
    if (onChange) {
      onChange(checkedItems);
    }
  }, [checkedItems, onChange]);

  const filteredPermisos = permisos.filter((permiso) =>
    permiso.NombrePermiso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const filteredIds = filteredPermisos.map((p) => p.Id);
      setCheckedItems((prev) => {
        const newSelection = new Set([...prev, ...filteredIds]);
        return Array.from(newSelection);
      });
    } else {
      setCheckedItems((prev) =>
        prev.filter((id) => !filteredPermisos.some((p) => p.Id === id))
      );
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
          {filteredPermisos.length > 0 ? (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={filteredPermisos.every((p) =>
                    checkedItems.includes(p.Id)
                  )}
                  onChange={handleSelectAll}
                />{" "}
                Todos
              </label>
              {filteredPermisos.map((permiso) => (
                <label key={permiso.Id}>
                  <input
                    type="checkbox"
                    value={permiso.Id}
                    checked={checkedItems.includes(permiso.Id)}
                    onChange={() => handleCheck(permiso.Id)}
                  />{" "}
                  {permiso.NombrePermiso}
                </label>
              ))}
            </>
          ) : (
            <p style={{ padding: "0.5rem", color: "#aaa" }}>
              No se encontraron permisos
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PermisosDropdown;
