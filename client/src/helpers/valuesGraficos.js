

export const valuesGraficos = () => {

    const datosParaLosGraficos = {
        ventasDiarias: {
            label: 'ventas Del Dia',
            data: [23, 45, 67, 89, 34, 56, 12, 56, 34],
            labels: ['10:00 Am', '12:00 Pm', '1:00 Pm', '2:00 Pm', '4:00 Pm', '6:00 Pm', '8:00 Pm', '10:00 Pm', '12:00 Am',]
        },


        ventasSemanales: {
            label: 'ventas De La Semana',
            data: [23, 45, 67, 89, 34, 75, 89],
            labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7']
        },

        ventasMensuales: {
            label: 'ventas Mensuales',
            data: [2300, 1800, 2500, 3200, 2900, 3100, 2700, 3000, 2400, 2800, 2600, 3500],
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },


        productoMasVendidoDeLaSemana: {
            label: 'producto Top',
            data: [34, 56, 43, 29, 58, 63, 89],
            labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7']
        },

        AnálisisDeClientes: {
            label: 'Nuevos Clientes',
            data: [34, 56, 43, 29, 58, 63, 89, 45, 36, 68, 12, 90],
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },

        RendimientoPorRegión: {
            label: 'Rendimiento por municipio del Valle de Aburra',
            data: [62, 156, 143, 99, 138, 163, 74, 127],
            labels: ['Caldas', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'Medellin', 'Copacabana', 'La Estrella']
        },

    }



    return {
        datosParaLosGraficos
    }
}