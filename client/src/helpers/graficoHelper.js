
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
            position: 'top'
        },
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
        case 'Config1':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        position: 'top'
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
        case 'Config2':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 20,
                            padding: 10,
                            // Puedes limitar cuántos aparecen si lo combinas con scroll
                        }
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
                        beginAtZero: true,
                        min: -200,
                        max: 200
                    },

            }
        }
        case 'Config3':
            return {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        position: 'top',
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
    }
}

export const setData = (Dates, labels, RefDatos, label) => {
    switch (Dates) {
        case 'data1':
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
        case 'data2':
            return {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: [30, -150, 30, -25, 30, -35, 73, -80, -90, 100, -110, 120],
                        borderColor: '#ffcd56',
                        backgroundColor: 'rgb(255, 205, 86)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    },
                    {
                        label: label,
                        data: [-50, 109, -15, 60, -25, 30, -35, 73, -80, -90, 100, -111, 120],
                        borderColor: '#a936eb',
                        backgroundColor: 'rgb(169, 54, 235)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            };
        case 'data3':
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
        case 'data4':
            return {
                labels: labels,
                datasets: [{
                    label: label,
                    data: RefDatos,
                    backgroundColor: [
                        'rgba(255, 99, 133, 0.8)',
                        'rgba(54, 163, 235, 0.8)',
                        'rgba(255, 207, 86, 0.87)',
                        'rgba(75, 192, 192, 0.9)',
                        'rgb(153, 102, 255)',
                        'rgba(255, 160, 64, 0.9)',
                        'rgba(201, 203, 207, 0.76)'
                    ],
                    borderColor: 'rgb(34, 12, 12)',
                    borderWidth: 2
                }]
            };
        default:
            return { labels: [], datasets: [] };
    }

}









