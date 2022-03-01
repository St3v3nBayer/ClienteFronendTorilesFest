import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const doc = new jsPDF();

const ExportPdf = ({ salidas }) => {

    const array = [];

    const handleExportar = () => {
        salidas.forEach((e) => {
            let temp = [e.fecha_movimiento, e.nombre_producto, e.cant, e.id_usuario_movimiento];
            array.push(temp);
        })
        handlePdf();

    }
    const handlePdf = () => {
        doc.autoTable({
            theme: 'grid',
            columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
            margin: { top: 10 },
            head: [['Fecha', 'Producto', 'Cantidad', 'Usuario']],
            body: array
        })
        doc.save('reporte.pdf')
        array.length = 0;
    }

    return (
        <div>
            {/* <FontAwesomeIcon icon={faFileArrowDown} fixedWidth size="2x" color="red" /> */}
            <Button onClick={handleExportar} variant="success" size="sm">
                <FontAwesomeIcon icon={faFileArrowDown} fixedWidth size="2x" color="white" />
                {" "}
                <h6>Exportar Pdf</h6>
            </Button>
        </div>
    )
}

export default ExportPdf
