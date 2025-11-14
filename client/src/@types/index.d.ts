declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';
  
  interface AutoTableOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    theme?: string;
    headStyles?: any;
    styles?: any;
  }

  global {
    interface jsPDF {
      autoTable: (options: AutoTableOptions) => jsPDF;
    }
  }
}
