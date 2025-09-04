import { useState, useRef, useEffect } from 'react';

export const useConfiguracion = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("Usuario");
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [actionStatus, setActionStatus] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    'actual-password': false,
    'nueva-password': false,
    'confirm-password': false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    status: 'Débil',
    color: '#ea4335'
  });

  const userMenuRef = useRef(null);
  const fileInputRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  const showStatus = (message) => {
    setActionStatus(message);
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    statusTimeoutRef.current = setTimeout(() => setActionStatus(''), 3000);
  };

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, status: 'Débil', color: '#ea4335' };
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 15;

    strength = Math.min(strength, 100);
    let status, color;
    if (strength >= 80) {
      status = 'Muy Fuerte'; color = '#0f9d58';
    } else if (strength >= 60) {
      status = 'Fuerte'; color = '#34a853';
    } else if (strength >= 40) {
      status = 'Medio'; color = '#fbbc05';
    } else {
      status = 'Débil'; color = '#ea4335';
    }

    return { strength, status, color };
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let fieldName = '';
    if (id === 'actual-password') fieldName = 'current';
    if (id === 'nueva-password') {
      fieldName = 'new';
      setPasswordStrength(calculatePasswordStrength(value));
    }
    if (id === 'confirm-password') fieldName = 'confirm';

    if (fieldName) {
      setPasswords(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      const status = updated[type] ? "activadas" : "desactivadas";
      const typeText = {
        email: "correo electrónico",
        push: "push",
        updates: "actualizaciones"
      }[type];

      showStatus(`Notificaciones de ${typeText} ${status}`);
      return updated;
    });
  };

  const saveName = () => {
    if (!userName.trim()) {
      alert("El nombre de usuario no puede estar vacío");
      return;
    }
    showStatus("Guardando nombre...");
    setTimeout(() => {
      const tempName = userName;
      setUserName("");
      showStatus(`Nombre guardado correctamente: ${tempName}`);
      setTimeout(() => setUserName(tempName), 200);
    }, 1000);
  };

  const savePassword = () => {
    if (!passwords.current || !passwords.new || passwords.new !== passwords.confirm || passwordStrength.strength < 40) {
      alert("Verifica las contraseñas antes de continuar");
      return;
    }
    showStatus("Cambiando contraseña...");
    setTimeout(() => {
      setPasswords({ current: '', new: '', confirm: '' });
      setPasswordStrength({ strength: 0, status: 'Débil', color: '#ea4335' });
      showStatus("Contraseña cambiada correctamente");
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024;
      if (!validTypes.includes(file.type)) return alert("Tipo de imagen inválido");
      if (file.size > maxSize) return alert("La imagen es demasiado grande");

      setSelectedFile(file);
      showStatus(`Imagen seleccionada: ${file.name}`);
    }
  };

  const saveProfilePicture = () => {
    if (!selectedFile) return alert("Selecciona una imagen primero");
    showStatus("Subiendo imagen...");
    const currentFile = selectedFile;
    setTimeout(() => {
      if (fileInputRef.current) fileInputRef.current.value = '';
      showStatus(`Imagen subida correctamente: ${currentFile.name}`);
      setSelectedFile(null);
    }, 2000);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    document.documentElement.classList.add('theme-transition');
    setSelectedTheme(newTheme);
    showStatus(`Tema cambiado a ${newTheme === 'light' ? 'claro' : newTheme === 'dark' ? 'oscuro' : 'automático'}`);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  };

  const resetConfig = () => {
    if (!window.confirm("¿Restablecer todas las configuraciones?")) return;
    setSelectedTheme('light');
    document.documentElement.setAttribute('data-theme', 'light');
    setNotifications({ email: true, push: false, updates: true });
    document.documentElement.classList.add('reset-animation');
    showStatus("Configuraciones restablecidas correctamente");
    setTimeout(() => {
      document.documentElement.classList.remove('reset-animation');
    }, 1000);
  };

  return {
    selectedFile, setSelectedFile,
    userName, setUserName,
    selectedTheme, setSelectedTheme,
    actionStatus,
    notifications,
    passwords,
    passwordVisibility,
    passwordStrength,
    fileInputRef,
    userMenuRef,
    showStatus,
    togglePasswordVisibility,
    handlePasswordChange,
    handleNotificationToggle,
    saveName,
    savePassword,
    handleFileChange,
    saveProfilePicture,
    handleThemeChange,
    resetConfig,
  };
};
