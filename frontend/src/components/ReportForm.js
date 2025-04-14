import React, { useState } from 'react';
import { getReport } from '../services/api';
import { Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import 'jspdf-autotable';

const ReportForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getReport(from, to);
    setReport(response);
  };

  const handleDownloadExcel = () => {
    if (report.length === 0) {
      alert('No hay datos para generar el archivo Excel');
      return;
    }

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(
      report.map((entry) => ({
        'Placa': entry.license_plate,
        'Hora de Entrada': entry.entry_time,
        'Hora de Salida': entry.exit_time,
        'Tiempo Estacionado (min)': entry.total_time_minutes,
        'Tipo': entry.vehicle_type,
        'Cantidad a Pagar ($)': entry.total_amount,
      }))
    );

    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Estacionamiento');
    XLSX.writeFile(wb, 'reporte_estacionamiento.xlsx');
  };

  const handleDownloadPDF = () => {
    if (report.length === 0) {
      alert('No hay datos para generar el PDF');
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Estacionamiento', 14, 20);
  
    const tableColumn = [
      'Placa',
      'Entrada',
      'Salida',
      'Tiempo (min)',
      'Tipo',
      'Total ($)',
    ];
  
    const tableRows = report.map((entry) => [
      entry.license_plate,
      entry.entry_time,
      entry.exit_time,
      entry.total_time_minutes,
      entry.vehicle_type,
      entry.total_amount,
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
  
    doc.save('reporte_estacionamiento.pdf');
  };
  

  return (
    <div className="container mt-5">
      <h2>Generar Reporte de Estacionamiento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Desde</Form.Label>
          <Form.Control
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Hasta</Form.Label>
          <Form.Control
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Generar Reporte</Button>
      </Form>

      {report.length > 0 && (
        <div className="mt-5">
          <h3>Reporte</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Tiempo Estacionado</th>
                <th>Tipo</th>
                <th>Cantidad a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {report.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.license_plate}</td>
                  <td>{entry.entry_time}</td>
                  <td>{entry.exit_time}</td>
                  <td>{entry.total_time_minutes} minutos</td>
                  <td>{entry.vehicle_type}</td>
                  <td>${entry.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button onClick={handleDownloadExcel} className="mt-3 me-2">
            Descargar Excel
          </Button>
          <Button onClick={handleDownloadPDF} className="mt-3">
            Descargar PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
