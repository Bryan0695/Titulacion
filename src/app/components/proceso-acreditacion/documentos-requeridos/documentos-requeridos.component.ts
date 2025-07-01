// ARCHIVO: src/app/components/proceso-acreditacion/documentos-requeridos/documentos-requeridos.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentos-requeridos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos-requeridos.component.html',
  styleUrls: ['./documentos-requeridos.component.scss']
})
export class DocumentosRequeridosComponent implements OnInit {
  @Input() tipoTramite: string = '';
  @Input() establecimiento: any = {};
  @Output() documentosCompletos = new EventEmitter<boolean>();
  
  documentosRequeridos = [
    { id: 1, nombre: 'RUC del establecimiento', estado: 'pendiente', archivo: null },
    { id: 2, nombre: 'Licencia de funcionamiento', estado: 'pendiente', archivo: null },
    { id: 3, nombre: 'Certificado de seguridad', estado: 'subido', archivo: 'certificado.pdf' },
    { id: 4, nombre: 'Planos del establecimiento', estado: 'pendiente', archivo: null }
  ];

  ngOnInit(): void {
    // Emitir estado inicial
    this.verificarCompletado();
  }

  get documentosSubidos(): number {
    return this.documentosRequeridos.filter(d => d.estado === 'subido' || d.estado === 'validado').length;
  }

  get todosDocumentosSubidos(): boolean {
    return this.documentosSubidos === this.documentosRequeridos.length;
  }

  subirArchivo(event: any, documento: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      console.log(`Subiendo archivo para: ${documento.nombre}`, archivo);
      documento.estado = 'subido';
      documento.archivo = archivo.name;
      this.verificarCompletado();
    }
  }

  verArchivo(documento: any): void {
    console.log(`Viendo archivo: ${documento.archivo}`);
    // Aquí puedes abrir el archivo en una nueva ventana o mostrar un modal
  }

  eliminarArchivo(documento: any): void {
    documento.estado = 'pendiente';
    documento.archivo = null;
    console.log(`Archivo eliminado para: ${documento.nombre}`);
    this.verificarCompletado();
  }

  private verificarCompletado(): void {
    // Emitir si todos los documentos obligatorios están subidos
    const completo = this.todosDocumentosSubidos;
    this.documentosCompletos.emit(completo);
  }
}