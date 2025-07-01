// ARCHIVO: src/app/components/proceso-acreditacion/estado-tramite/estado-tramite.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-tramite.component.html',
  styleUrls: ['./estado-tramite.component.scss']
})
export class EstadoTramiteComponent {
  @Input() numeroRegistro: string = '';
  @Input() establecimiento: any = {};
  
  pasoActual = 1; // Paso actual (0-based)
  
  pasosTramite = [
    { 
      titulo: 'Solicitud Recibida', 
      descripcion: 'Su solicitud de registro ha sido recibida y está en cola de procesamiento', 
      fecha: '2025-01-15',
      observaciones: ''
    },
    { 
      titulo: 'Revisión Documental', 
      descripcion: 'Nuestro equipo está revisando toda la documentación enviada', 
      fecha: '2025-01-18',
      observaciones: ''
    },
    { 
      titulo: 'Inspección Técnica', 
      descripcion: 'Se programará una visita técnica al establecimiento', 
      fecha: 'Pendiente',
      observaciones: 'Pendiente de coordinar fecha y hora'
    },
    { 
      titulo: 'Resolución Final', 
      descripcion: 'Emisión del certificado de registro turístico', 
      fecha: 'Pendiente',
      observaciones: ''
    }
  ];

  siguientePaso(): void {
    if (this.pasoActual < this.pasosTramite.length - 1) {
      this.pasoActual++;
      console.log(`Avanzando al paso: ${this.pasoActual + 1}`);
    }
  }

  get progresoCompletado(): number {
    return ((this.pasoActual + 1) / this.pasosTramite.length) * 100;
  }
}