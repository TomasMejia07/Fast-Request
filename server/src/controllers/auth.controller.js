const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");
const Rol = require("../models/Roles");

exports.registrarAdmin = async (req, res) => {
  try {
    const { nombre, apellido, correo, password, nombreEmpresa } = req.body;

    console.log('Datos recibidos en backend:', req.body); // Para debug

    // ✅ Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !correo || !password || !nombreEmpresa) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: nombre, apellido, correo, password, nombreEmpresa" 
      });
    }

    // 🔐 cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🏢 Crear empresa primero
    const empresa = await Empresa.create({
      NombreEmpresa: nombreEmpresa, // ✅ Usar el nombre correcto del campo
      Estado: "Activo"
    });

    // 🔑 Buscar rol "Admin"
    const rolAdmin = await Rol.findOne({ where: { NombreRol: "Administrador" } });

    if (!rolAdmin) {
      return res.status(400).json({ error: "No existe rol Admin en la BD" });
    }

    // 👤 Crear usuario y asociar a la empresa
    const usuario = await Usuario.create({
      Nombre: nombre,
      Apellido: apellido,
      Correo: correo,
      Password: hashedPassword,
      RolId: rolAdmin.Id,
      EmpresaId: empresa.Id
    });

    // 🎟️ Generar token JWT
    const token = jwt.generarToken({ 
      id: usuario.Id, 
      rol: rolAdmin.NombreRol,
      empresaId: empresa.Id 
    });

    return res.status(201).json({
      message: "Administrador y empresa creados con éxito",
      usuario: {
        id: usuario.Id,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        correo: usuario.Correo,
        rol: rolAdmin.NombreRol
      },
      empresa: {
        id: empresa.Id,
        nombre: empresa.NombreEmpresa
      },
      token
    });
  } catch (err) {
    console.error("Error al registrar admin:", err);
    
    // Manejar error de correo duplicado
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }
    
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ where: { Correo: usuario } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(password, user.Password);
    if (!esValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.Id,
      correo: user.Correo,
      rolId: user.RolId,
      empresaId: user.EmpresaId
    };

    const token = jwt.generarToken(payload);

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en login' });
  }
};
