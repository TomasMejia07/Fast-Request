
/* --------------- configuracion del grafico --------------- */

const baseConfig = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        title: {
            display: false,
            text: ''
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
    },
    animations: {
        radius: {
            duration: 500,
            easing: 'linear',
            loop: (context) => context.active
        },
        tension: {
            duration: 1500,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
        },
    },
    hoverRadius: 12,
    hoverBackgroundColor: 'white'
};


export const Configuraciones = (Config) => {
    switch (Config) {
        case 'ConfigGraficosDeLinea':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        display: false
                    },
                    interaction: {
                        ...baseConfig.interaction,
                        mode: 'point'
                    },
                    hover: {
                        mode: null
                    }
                },
            };
        case 'ConfigGraficosRedondos':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                    }
                },
                hover: {
                    mode: null
                },
                interaction: {
                    ...baseConfig.interaction,
                    mode: 'point'
                },
                scales: {
                    y: {
                        display: null
                    },
                    x: {
                        display: null
                    }
                }
            }
        case 'ConfigGraficosEnBarras':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        font: {
                            size: 18,
                            family: 'Arial, sans-serif'
                        },
                    },
                },
                hover: {
                    mode: null,
                },
                interaction: {
                    ...baseConfig.interaction,
                    mode: 'point',
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            display: true,
                            stepSize: 50,
                        },
                        grid: {
                            circular: true,
                            lineWidth: 1,
                        },
                        angleLines: {
                            display: true,
                            lineWidth: 1,
                        }
                    },
                }
            };
        case 'ConfigGraficosDeArea':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                    },
                    interaction: {
                        ...baseConfig.interaction,
                        mode: 'point'
                    },
                    hover: {
                        mode: null
                    },
                },
                animations: false, 
            };

    }
}

export const setData = (Dates, labels, RefDatos, label) => {
    switch (Dates) {
        case 'dataParaVentasDiarias':
            return {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: RefDatos,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        tension: 0.4,
                        borderWidth: 2,
                    },
                ]
            };
        case 'dataParaVentasSemanales':
            return {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: RefDatos,
                        borderColor: 'black',
                        backgroundColor: [
                            'rgb(255, 179, 0)',
                            'rgb(255, 48, 48)',
                            'rgb(0, 255, 123)',
                            'rgb(0, 85, 255)',
                            'rgb(255, 0, 115)',
                            'rgb(212, 0, 255)',
                            'rgb(221, 255, 0)',
                        ],
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            };
        case 'dataParaVentasMensuales':
            return {
                labels: labels,
                datasets: [{
                    label: label,
                    data: RefDatos,
                    backgroundColor: [
                        'rgb(255, 99, 132)', 'rgba(54, 163, 235, 0.42)', 'rgb(255, 205, 86)',
                        'rgb(99, 255, 112)', 'rgb(169, 54, 235)', 'rgb(249, 86, 255)',
                        'rgb(255, 143, 99)', 'rgb(54, 214, 235)', 'rgb(86, 255, 213)',
                        'rgb(255, 99, 164)', 'rgb(202, 235, 54)', 'rgb(86, 179, 255)'
                    ],
                    hoverOffset: 4
                }],
            };
        case 'dataParaProductoMasVendidoDeLaSemana':
            return {
                labels: labels,
                datasets: [{
                    label: label,
                    data: RefDatos,
                    backgroundColor: [
                        'rgb(255, 0, 55)',
                        'rgb(0, 153, 255)',
                        'rgb(255, 183, 0)',
                        'rgb(0, 255, 255)',
                        'rgb(85, 0, 255)',
                        'rgb(255, 128, 0)',
                        'rgb(132, 132, 132)'
                    ],
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 2
                }]
            };
        case 'dataParaAnálisisDeClientes':
            return {
                labels: labels,
                datasets: [{
                    label: label,
                    data: RefDatos,
                    backgroundColor: [
                        'rgb(255, 99, 133)',
                        'rgb(54, 163, 235)',
                        'rgb(255, 207, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 160, 64)',
                        'rgb(201, 203, 207)',
                        'rgb(0, 255, 145)',
                        'rgb(179, 255, 0)',
                        'rgb(255, 242, 0)',
                        'rgb(119, 0, 255)',
                        'rgb(255, 0, 85)',
                    ],
                    borderColor: 'rgb(34, 12, 12)',
                    borderWidth: 2
                }]
            };
        case 'dataParaRendimientoPorRegión':
            return {
                labels: labels,
                datasets: [{
                    label: label,
                    data: RefDatos,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            };
        default:
            return { labels: [], datasets: [] };
    }

}

