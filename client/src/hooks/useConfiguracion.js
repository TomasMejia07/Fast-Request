import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export const useConfiguracion = (initial = { nombre: '', apellido: '' }) => {
  const [userData, setUserData] = useState(initial);

  const [actionStatus, setActionStatus] = useState("");

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    "actual-password": false,
    "nueva-password": false,
    "confirm-password": false,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    status: "Débil",
    color: "#ea4335",
  });

  const userMenuRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  const showStatus = (message) => {
    setActionStatus(message);
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    statusTimeoutRef.current = setTimeout(() => setActionStatus(""), 3000);
  };

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);



  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, status: "Débil", color: "#ea4335" };

    let strength = 0;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (password.length >= 8) strength += 25;
    if (hasUpper) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSymbol) strength += 20;
    if (password.length >= 12) strength += 15;

    strength = Math.min(strength, 100);

    let status, color;
    if (strength >= 80 && hasSymbol) {
      status = "Muy Fuerte";
      color = "#0f9d58";
    } else if (strength >= 60) {
      status = "Fuerte";
      color = "#34a853";
    } else if (strength >= 40) {
      status = "Medio";
      color = "#fbbc05";
    } else {
      status = "Débil";
      color = "#ea4335";
    }

    return { strength, status, color };
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let fieldName = "";
    if (id === "actual-password") fieldName = "current";
    if (id === "nueva-password") {
      fieldName = "new";
      setPasswordStrength(calculatePasswordStrength(value));
    }
    if (id === "confirm-password") fieldName = "confirm";

    if (fieldName) {
      setPasswords((prev) => ({ ...prev, [fieldName]: value }));
    }
  };


  const handleNotificationToggle = (type) => {
    setNotifications((prev) => {
      const updated = { ...prev, [type]: !prev[type] };
      const status = updated[type] ? "activadas" : "desactivadas";
      const typeText = {
        email: "correo electrónico",
        push: "push",
        updates: "actualizaciones",
      }[type];

      showStatus(`Notificaciones de ${typeText} ${status}`);
      return updated;
    });
  };


  const API_UPDATE_PASS = async () => {
    try {

      const token = localStorage.getItem('token')

      if (!token) {
        showStatus("Usuario no autenticado");
        return;
      }

      const decored = jwtDecode(token)
      const id = decored.id

      const res = await axios.put(`http://localhost:5000/api/configuracion/updatePass/${id}`, passwords)

      showStatus(res.data.message || "Contraseña actualizada correctamente");
      console.log('Contraseña actualizada correctamente');

    } catch (err) {
      console.log('Error al actualizar la contraseña ❌', err);

      if (err.response && err.response.data) {
        const backendMessage = err.response.data.message
        showStatus(backendMessage);
      } else {
        showStatus("Error al actualizar la contraseña");
      }
    }
  }



  const savePassword = (e) => {
    e.preventDefault()

    if (
      !passwords.current ||
      !passwords.new ||
      passwords.new !== passwords.confirm ||
      passwordStrength.strength < 40
    ) {
      showStatus("Por Favor Verifica las contraseñas antes de continuar");
      return;
    }

    API_UPDATE_PASS()
    setTimeout(() => {
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordStrength({ strength: 0, status: "Débil", color: "#ea4335" });
    }, 1000);
  };





  const resetConfig = () => {
    if (!window.confirm("¿Restablecer todas las configuraciones?")) return;
    setNotifications({ email: true, push: false, updates: true });
    document.documentElement.classList.add("reset-animation");
    showStatus("Configuraciones restablecidas correctamente");
    setTimeout(() => {
      document.documentElement.classList.remove("reset-animation");
    }, 1000);
  };






  const API_UPDATE_DATA = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        showStatus("Usuario no autenticado");
        return;
      }

      const decoded = jwtDecode(token);
      const id = decoded.id;

      const payload = {}
      if (userData.nombre?.trim() !== "") payload.nombre = userData.nombre;
      if (userData.apellido?.trim() !== "") payload.apellido = userData.apellido;


      if (Object.keys(payload).length === 0) {
        showStatus("No hay cambios para guardar");
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/configuracion/updateData/${id}`,
        payload
      );

      showStatus(res.data.message);
      console.log('Usuario actualizado correctamente');


    } catch (err) {
      console.log('Error al actualizar los datos del usuario ❌', err);
      showStatus("Error al actualizar los datos");
    }
  };



  const saveName = (e) => {
    e.preventDefault()

    API_UPDATE_DATA()
    setTimeout(() => {
      setUserData({
        nombre: '',
        apellido: ''
      });
    }, 500);
  };

  const onChangeInput = ({ target }) => {
    const { name, value } = target

    setUserData({
      ...userData,
      [name]: value
    })
  }




  return {
    userData,
    actionStatus,
    notifications,
    passwords,
    passwordVisibility,
    passwordStrength,
    userMenuRef,
    showStatus,
    togglePasswordVisibility,
    handleNotificationToggle,
    handlePasswordChange,
    saveName,
    savePassword,
    resetConfig,
    onChangeInput,
  };
};


