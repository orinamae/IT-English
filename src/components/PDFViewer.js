import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../pdf/english.pdf'; // импорт pdf
pdfjs.GlobalWorkerOptions.workerSrc = `file://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  return (
    <div>
      <Document file={pdfFile}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;