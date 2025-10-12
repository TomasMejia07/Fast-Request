import { useMemo } from "react";

//useFiltro pedidos
export const useFiltro = (data, busqueda) => {
    const res = useMemo(() => {
        if (!busqueda.trim()) return data;
        const termino = busqueda.toLowerCase();
        return data.filter((item) => {
            return [
                (`Orden ${item.id}`).toLowerCase(),
                item.id?.toString(),
                item.tipoProducto?.toLowerCase(),
                item.cantidadProducto?.toString(),
                new Date(item.createdAt).toLocaleDateString()
            ].some(value => value?.toLowerCase().includes(termino));
        });
    }, [data, busqueda]);

    return res;
};

//useFiltro categoria
export const useFiltroCategoria = (data, busqueda) => {
    const res = useMemo(() => {
        if (!busqueda.trim()) return data;
        const termino = busqueda.toLowerCase();
        return data.filter((item) => {
            return [
                item.NombreCategoria?.toLowerCase(),
                item.EstadoCategoria?.toLowerCase(),
            ].some(value => value?.toLowerCase().includes(termino));
        });
    }, [data, busqueda]);

    return res;
}


//useFiltro Productos
export const useFiltroProductos = (data, busqueda) => {
    const res = useMemo(() => {
        if (!busqueda.trim()) return data;
        const termino = busqueda.toLowerCase();
        return data.filter((item) => {
            return [
                item.id?.toString(),
                item.NombreProducto?.toLowerCase(),
                item.NombreCategoria?.toLowerCase(),
                item.PrecioProducto?.toString(),
                item.DescripcionProducto?.toLowerCase(),
                item.EstadoCategoria?.toLowerCase(),
            ].some(value => value?.toLowerCase().includes(termino));
        });
    }, [data, busqueda]);

    return res;
}


//useFiltro Roles
export const useFiltroRoles = (data, busqueda) => {
    const res = useMemo(() => {
        if (!busqueda.trim()) return data;
        const termino = busqueda.toLowerCase();
        return data.filter((item) => {
            const fecha = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "";
            return [
                item.NombreRol?.toLowerCase(),
                item.EstadoRol?.toLowerCase(),
                fecha
            ].some(value => value?.toLowerCase().includes(termino));
        });
    }, [data, busqueda]);

    return res;
}

//useFiltro Usuarios "falta realizarlo"




//useFiltro clientes

export const useFiltroClientes = (data, busqueda) => {
    const res = useMemo(() => {
        if (!busqueda.trim()) return data;
        const termino = busqueda.toLowerCase();
        return data.filter((item) => {
            return [
                item.id?.toString(),
                item.NombreCliente?.toLowerCase(),
                item.NumeroDocumento?.toString(),
                item.CorreoElectronico?.toLowerCase(),
                item.NumeroContacto?.toString(),
                item.EstadoCliente?.toLowerCase(),
            ].some(value => value?.toLowerCase().includes(termino));
        });
    }, [data, busqueda]);

    return res;
}