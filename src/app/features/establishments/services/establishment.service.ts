import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Establishment } from '../../../core/interfaces/establishment.interface';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  private mockData: Establishment[] = [
    {
      id: 1,
      nombreComercial: 'DELI INTERNACIONAL S A',
      ubicacion: {
        provincia: 'BOLÍVAR',
        canton: 'CHILLANES',
        parroquia: 'CHILLANES',
        direccion: 'fsdfs, 5252, dsfsfdf'
      },
      actividad: 'AGENCIAMIENTO TURÍSTICO AGENCIA OPERADORA DE TURISMO',
      numeroRegistro: '179207201B001.001.4011471',
      fechaRegistro: new Date('2025-06-02'),
      estadoCatastro: 'Registro PENDIENTE DE INSPECCION'
    },
    {
      id: 2,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: '',
        canton: '',
        parroquia: '',
        direccion: 'null, null, null'
      },
      actividad: '',
      numeroRegistro: 'Sin Registro',
      estadoCatastro: 'Sin Registro',
      cerradoSri: true
    },
    {
      id: 3,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: 'BOLÍVAR',
        canton: 'CHILLANES',
        parroquia: 'CHILLANES',
        direccion: 'nose, nose, nose'
      },
      actividad: 'ORGANIZADORES DE EVENTOS, CONGRESOS Y CONVENCIONES',
      numeroRegistro: 'Revisar en "Ver Registros"',
      estadoCatastro: 'Revisar en "Ver Registros"'
    },
    {
      id: 4,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: '',
        canton: '',
        parroquia: '',
        direccion: 'null, null, null'
      },
      actividad: '',
      numeroRegistro: 'Sin Registro',
      estadoCatastro: 'Sin Registro',
      cerradoSri: true
    },
    {
      id: 5,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: 'BOLÍVAR',
        canton: 'CHIMBO',
        parroquia: 'SAN JOSÉ DE CHIMBO',
        direccion: 'nose, nose, nose'
      },
      actividad: '',
      numeroRegistro: 'Sin Registro',
      estadoCatastro: 'Sin Registro'
    },
    {
      id: 6,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: '',
        canton: '',
        parroquia: '',
        direccion: 'null, null, null'
      },
      actividad: '',
      numeroRegistro: 'Sin Registro',
      estadoCatastro: 'Sin Registro',
      cerradoSri: true
    },
    {
      id: 7,
      nombreComercial: 'AMERICAN DELI',
      ubicacion: {
        provincia: 'CARCHI',
        canton: 'MIRA',
        parroquia: 'JIJÓN Y CAAMAÑO',
        direccion: 'asd, sad, asd'
      },
      actividad: 'AGENCIAMIENTO TURÍSTICO AGENCIA OPERADORA DE TURISMO',
      numeroRegistro: '179207201B001.007.4011472',
      fechaRegistro: new Date('2025-06-20'),
      estadoCatastro: 'Registro PENDIENTE DE INSPECCION'
    }
  ];

  constructor(private http: HttpClient) {}

  getEstablishments(): Observable<Establishment[]> {
    // Simulamos una llamada HTTP
    return of(this.mockData);
  }

  getEstablishmentsGrouped(): Observable<Establishment[]> {
    // Ordenamos por nombre comercial para facilitar la agrupación
    const sortedData = [...this.mockData].sort((a, b) => 
      a.nombreComercial.localeCompare(b.nombreComercial)
    );
    return of(sortedData);
  }
}