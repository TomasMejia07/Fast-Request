
export const usePaginacion = (paginacionActual, res) => {

    const itemsPorPagina = 9
    
    // Calculamos el índice final del corte: página actual * cantidad por página.
    // Por ejemplo: página 2 * 10 elementos = índice 20 (no incluido en slice)
    const elementsNow = itemsPorPagina * paginacionActual;

    // Calculamos el índice inicial del corte restando los elementos por página.
    // Por ejemplo: 20 (fin) - 10 (por página) = 10 (inicio)
    const elementsAfter = elementsNow - itemsPorPagina;

    // Cortamos el arreglo original desde el índice inicial hasta el índice final.
    // Esto retorna sólo los elementos de la página actual.
    const funtionFinally = res.slice(elementsAfter, elementsNow);

    return{
        funtionFinally,
        itemsPorPagina
    }
};

