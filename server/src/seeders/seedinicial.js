const { Rol, Permiso } = require("../models");

const permisosIniciales = [
    { NombrePermiso: 'Visualizar Categorías', DescripcionPermiso: 'Permite ver las categorías' },
    { NombrePermiso: 'Crear Categorías', DescripcionPermiso: 'Permite crear nuevas categorías' },
    { NombrePermiso: 'Modificar Categorías', DescripcionPermiso: 'Permite editar categorías existentes' },
    { NombrePermiso: 'Eliminar Categorías', DescripcionPermiso: 'Permite eliminar categorías' },
    { NombrePermiso: 'Visualizar Productos', DescripcionPermiso: 'Permite ver los productos' },
    { NombrePermiso: 'Crear Productos', DescripcionPermiso: 'Permite agregar nuevos productos' },
    { NombrePermiso: 'Modificar Productos', DescripcionPermiso: 'Permite editar productos existentes' },
    { NombrePermiso: 'Eliminar Productos', DescripcionPermiso: 'Permite eliminar productos' },
    { NombrePermiso: 'Visualizar Roles', DescripcionPermiso: 'Permite ver los roles del sistema' },
    { NombrePermiso: 'Crear Roles', DescripcionPermiso: 'Permite crear nuevos roles' },
    { NombrePermiso: 'Modificar Roles', DescripcionPermiso: 'Permite editar roles' },
    { NombrePermiso: 'Eliminar Roles', DescripcionPermiso: 'Permite eliminar roles' },
    { NombrePermiso: 'Visualizar Usuarios', DescripcionPermiso: 'Permite ver la lista de usuarios' },
    { NombrePermiso: 'Crear Usuarios', DescripcionPermiso: 'Permite agregar nuevos usuarios' },
    { NombrePermiso: 'Modificar Usuarios', DescripcionPermiso: 'Permite editar usuarios' },
    { NombrePermiso: 'Eliminar Usuarios', DescripcionPermiso: 'Permite eliminar usuarios' },
    { NombrePermiso: 'Visualizar Estadisticas', DescripcionPermiso: 'Permite acceso al apartado estadisticas' },
    { NombrePermiso: 'Visualizar Clientes', DescripcionPermiso: 'Permite acceso al apartado cliente y ver la lista de clientes ' },
    { NombrePermiso: 'Crear Clientes', DescripcionPermiso: 'Permite crear clientes' },
    { NombrePermiso: 'Modificar Clientes', DescripcionPermiso: 'Permite Modificar clientes' },
    { NombrePermiso: 'Eliminar Clientes', DescripcionPermiso: 'Permite Eliminar Clientes' },
    { NombrePermiso: 'Lista De Pedidos Cliente', DescripcionPermiso: 'Permite visualizar la lista de pedidos de un cliente' },
    { NombrePermiso: 'Hacer Pedidos', DescripcionPermiso: 'Permite acceso al apartado de hacer pedido' },
    { NombrePermiso: 'Visualizar Pedidos', DescripcionPermiso: 'Permite acceso al apartado de Pedidos y la lista de pedidos' }
];

const ROLES_PRETERMINADOS = [
    { NombreRol: "Administrador", EstadoRol: "Activo" },
    { NombreRol: "Empleado", EstadoRol: "Activo" },
    { NombreRol: "Cliente", EstadoRol: "Activo" }
];

async function inicializarSistema(EmpresaId) {
    try {

        if (!EmpresaId) {
            throw new Error("❌ EmpresaId es requerido para inicializar el sistema");
        }

        // 1. Crear permisos
        for (const permiso of permisosIniciales) {
            await Permiso.findOrCreate({
                where: { NombrePermiso: permiso.NombrePermiso, EmpresaId: EmpresaId },
                defaults: {
                    ...permiso,
                    EmpresaId: EmpresaId
                }
            });
        }

        // 2. Crear roles
        for (const rol of ROLES_PRETERMINADOS) {
            await Rol.findOrCreate({
                where: { NombreRol: rol.NombreRol, EmpresaId: EmpresaId },
                defaults: {
                    ...rol,
                    EmpresaId: EmpresaId
                }
            });
        }

        // 3. Asignar permisos a roles
        const admin = await Rol.findOne({ where: { NombreRol: "Administrador", EmpresaId: EmpresaId } });
        const empleado = await Rol.findOne({ where: { NombreRol: "Empleado", EmpresaId: EmpresaId } });
        const cliente = await Rol.findOne({ where: { NombreRol: "Cliente", EmpresaId: EmpresaId } });

        const todosPermisos = await Permiso.findAll({ where: { EmpresaId: EmpresaId } });

        // 🔑 Admin -> todos
        await admin.setPermisos(todosPermisos);

        // 🔑 Empleado -> algunos
        const permisosEmpleado = await Permiso.findAll({
            where: {
                NombrePermiso: [
                    "Hacer Pedidos",
                    "Visualizar Pedidos",
                    "Visualizar Estadisticas"
                ],
                EmpresaId: EmpresaId
            }
        });
        await empleado.setPermisos(permisosEmpleado);

        // 🔑 Cliente -> ninguno
        await cliente.setPermisos([]);

        console.log("✅ Permisos y roles iniciales cargados");
    } catch (error) {
        console.error("❌ Error al inicializar roles/permisos:", error);
    }
}

module.exports = { inicializarSistema };
