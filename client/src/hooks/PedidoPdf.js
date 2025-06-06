import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generarPDF = (pedido) => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Configuración inicial
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;

        // Encabezado con estilo
        doc.setFillColor(230, 126, 34);
        doc.rect(0, 0, pageWidth, 28, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('DETALLE DEL PEDIDO', pageWidth / 2, 12, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Pedido # ${pedido.id} - ${new Date(pedido.createdAt).toLocaleDateString()}`, pageWidth / 2, 20, { align: 'center' });

        // Información del cliente
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Información de Entrega', margin, 40);

        doc.setDrawColor(230, 126, 34);
        doc.setLineWidth(0.5);
        doc.line(margin, 43, pageWidth - margin, 43);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        // Columna izquierda
        let yPos = 50;
        doc.setFont('helvetica', 'bold');
        doc.text('Dirección:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(pedido.direccion, margin + 30, yPos);

        yPos += 8;
        doc.setFont('helvetica', 'bold');
        doc.text('Municipio:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(pedido.municipioLocalidad || 'N/A', margin + 30, yPos);

        yPos += 8;
        doc.setFont('helvetica', 'bold');
        doc.text('Referencia:', margin, yPos);
        doc.setFont('helvetica', 'normal');

        // Control de texto largo con saltos de línea para punto de referencia
        const puntosRef = doc.splitTextToSize(pedido.puntoDeReferencia, pageWidth - (margin * 2) - 30);
        doc.text(puntosRef, margin + 30, yPos);
        yPos += (puntosRef.length * 6);

        // Detalles del pedido
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Detalles del Producto', margin, yPos);

        doc.setDrawColor(230, 126, 34);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);

        // Información del producto con diseño de tabla mejorado
        doc.setFillColor(240, 240, 240);
        doc.setDrawColor(230, 126, 34);

        yPos += 10;

        // Tabla de producto
        const productoData = [
            ['Producto', pedido.Producto.NombreProducto],
            ['Precio', pedido.Producto.PrecioProducto],
            ['Cantidad', pedido.cantidadProducto],
        ];

        doc.autoTable({
            startY: yPos,
            head: [['Detalle', 'Descripción']],
            body: productoData,
            theme: 'grid',
            margin: { left: margin, right: margin },
            headStyles: {
                fillColor: [230, 126, 34],
                textColor: 255,
                fontSize: 12
            },
            styles: {
                fontSize: 11,
                cellPadding: 4,
            },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 40 }
            }
        });

        // Tabla para salsas
        yPos = doc.previousAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Complementos', margin, yPos);

        doc.setDrawColor(230, 126, 34);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);

        yPos += 10;

        const salsasGaseosasData = [
            ['Salsas', pedido.deseaSalsas],
            ['Tipos de Salsas', Array.isArray(pedido.tipos_salsas) ? pedido.tipos_salsas.join(', ') : (pedido.tipos_salsas || 'N/A')],
            ['Gaseosa', pedido.deseaGaseosa],
            ['Tipos de Gaseosas', Array.isArray(pedido.tipos_gaseosas) ? pedido.tipos_gaseosas.join(', ') : (pedido.tipos_gaseosas || 'N/A')]
        ];

        doc.autoTable({
            startY: yPos,
            body: salsasGaseosasData,
            theme: 'grid',
            margin: { left: margin, right: margin },
            styles: {
                fontSize: 11,
                cellPadding: 4
            },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 40 }
            }
        });

        // Notas adicionales
        yPos = doc.previousAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Notas Adicionales', margin, yPos);

        doc.setDrawColor(230, 126, 34);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);

        yPos += 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);

        // Control de texto largo con saltos de línea para notas
        const notasTexto = pedido.notasAdicionales ?
            doc.splitTextToSize(pedido.notasAdicionales, pageWidth - (margin * 2)) :
            ['Sin notas adicionales'];

        doc.text(notasTexto, margin, yPos);

        // Pie de página
        const pageHeight = doc.internal.pageSize.height;
        doc.setFillColor(230, 126, 34);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`Pedido generado: ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 5, { align: 'center' });

        doc.save(`pedido_${pedido.id}.pdf`);
    };



