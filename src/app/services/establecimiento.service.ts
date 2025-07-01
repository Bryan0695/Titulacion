import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Establecimiento, TipoTramite, DatosGenerales } from '../models/establecimiento.model';
import { EstadoEstablecimiento, TipoPersonaJuridica } from '../enums/establecimiento.enums';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  private apiUrl = 'https://siturin-pruebas.turismo.gob.ec/siturin/api';

  constructor(private http: HttpClient) {}

  getEstablecimientos(page: number = 0, size: number = 10, search?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    // Simular búsqueda en datos mock
    const allData = this.getMockEstablecimientos();
    let filteredData = allData.content;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = allData.content.filter((establecimiento: any) =>
        establecimiento.nombreComercial.toLowerCase().includes(searchLower) ||
        establecimiento.ubicacionEstablecimientos.toLowerCase().includes(searchLower) ||
        establecimiento.actividad.toLowerCase().includes(searchLower) ||
        establecimiento.numeroDeRegistro.toLowerCase().includes(searchLower) ||
        establecimiento.estadoCategoria.toLowerCase().includes(searchLower)
      );
    }

    // Simular paginación
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const result = {
      content: paginatedData,
      totalElements: filteredData.length,
      totalPages: Math.ceil(filteredData.length / size),
      size: size,
      number: page
    };

    return of(result);
  }

  getEstablecimientoById(id: number): Observable<Establecimiento> {
    return of(this.getMockEstablecimiento());
  }

  getTiposTramite(): Observable<TipoTramite[]> {
    return of([
      { id: 'registro', nombre: 'Registro', descripcion: 'Registro de nuevo establecimiento' },
      { id: 'activacion', nombre: 'Activación', descripcion: 'Activar establecimiento existente' },
      { id: 'inactivacion', nombre: 'Inactivación', descripcion: 'Inactivar establecimiento' },
      { id: 'actualizacion', nombre: 'Actualización', descripcion: 'Actualizar datos del establecimiento' }
    ]);
  }

  crearTramite(establecimientoId: number, tipoTramite: string): Observable<any> {
    const body = { establecimientoId, tipoTramite };
    return this.http.post(`${this.apiUrl}/tramites`, body);
  }

  getTiposPersonaJuridica(): Observable<string[]> {
    return of(Object.values(TipoPersonaJuridica));
  }

  private getMockEstablecimientos(): any {
    const datosGeneralesBase = {
      ruc: '1792072018001',
      estado: 'ACTIVO',
      razonSocial: 'DELI INTERNACIONAL S.A.',
      tipoContribuyente: 'SCD',
      identificacionRepresentanteLegal: '1704196912',
      nombreRepresentanteLegal: 'GUARDERAS RIOFRIO ESTEBAN',
      actividadEconomicaPrincipal: 'RESTAURANTES, CEVICHERÍAS, PICANTERÍAS, CAFETERÍAS, ETCÉTERA, INCLUIDO COMIDA PARA LLEVAR.',
      numeroExpediente: '157271'
    };

    return {
      content: [
        {
          id: 1,
          nombreComercial: 'DELI INTERNACIONAL S.A',
          ubicacionEstablecimientos: 'BOLIVAR, CHILLANES, CHILLANES, fsafs, 5252, dsfssdf',
          actividad: 'AGENCIAMIENTO TURÍSTICO, AGENCIA OPERADORA DE TURISMO',
          numeroDeRegistro: '17920720180001-001-4011471',
          estadoCategoria: 'Registro PENDIENTE DE INSPECCIÓN',
          fechaRegistro: '2 de junio de 2025',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'DELI INTERNACIONAL S.A' }
        },
        {
          id: 2,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'CERRADO SRI',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 3,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'BOLIVAR, CHILLANES, CHILLANES, nose, nose, nose',
          actividad: 'ORGANIZADORES DE EVENTOS, CONGRESOS Y CONVENCIONES',
          numeroDeRegistro: 'Revisar en "Ver Registros"',
          estadoCategoria: 'Revisar en "Ver Registros"',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 4,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'Sin Registro',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 5,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'BOLIVAR, CHIMBO, SAN JOSÉ DE CHIMBO',
          actividad: 'RESTAURANTES, CEVICHERÍAS, PICANTERÍAS, CAFETERÍAS, ETCÉTERA, INCLUIDO COMIDA PARA LLEVAR',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'Sin Registro',
          datosGenerales: datosGeneralesBase
        },
        {
          id: 6,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'Sin Registro',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 7,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'CARCHI, MIRA, JACINTO JIJÓN Y CAAMAÑO',
          actividad: 'AGENCIAMIENTO TURÍSTICO, AGENCIA OPERADORA DE TURISMO',
          numeroDeRegistro: '17920720180001-007-4011472',
          estadoCategoria: 'Registro PENDIENTE DE INSPECCIÓN',
          fechaRegistro: '20 de junio de 2025',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 8,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'AZUAY, CUENCA, BELLAVISTA',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'Sin Registro',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 9,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'GUAYAS, GUAYAQUIL, GUAYAQUIL, AV. JUAN TANCA MARENGO, N15-02, JOAQUÍN ORRANTIA',
          actividad: 'ALIMENTOS Y BEBIDAS',
          numeroDeRegistro: 'Revisar en "Ver Registros"',
          estadoCategoria: 'Revisar en "Ver Registros"',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 10,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'ELIMINADO',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 11,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'Sin Registro',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 12,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'AZUAY, CUENCA, BELLAVISTA',
          actividad: 'AGENCIAMIENTO TURÍSTICO, AGENCIA DE VIAJES DUAL',
          numeroDeRegistro: '17920720180001-012-4011457',
          estadoCategoria: 'Registro RATIFICADO',
          fechaRegistro: '17 de mayo de 2025',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 13,
          nombreComercial: 'AMERICAN DELI',
          ubicacionEstablecimientos: 'GUAYAS, GUAYAQUIL, GUAYAQUIL, AV. LUIS PLAZA DAÑIN, S/N, AV. FRANCISCO DE ORELLANA',
          actividad: 'ALIMENTOS Y BEBIDAS',
          numeroDeRegistro: 'Revisar en "Ver Registros"',
          estadoCategoria: 'Revisar en "Ver Registros"',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'AMERICAN DELI S.A.' }
        },
        {
          id: 14,
          nombreComercial: 'CITY BISTRO',
          ubicacionEstablecimientos: 'null, null, null',
          actividad: '',
          numeroDeRegistro: 'Sin Registro',
          estadoCategoria: 'ELIMINADO',
          datosGenerales: { ...datosGeneralesBase, razonSocial: 'CITY BISTRO S.A.' }
        }
      ],
      totalElements: 50,
      totalPages: 5,
      size: 10,
      number: 0
    };
  }

  private getMockEstablecimiento(): Establecimiento {
    return {
      id: 5,
      nombreComercial: 'AMERICAN DELI',
      ubicacionEstablecimientos: 'BOLIVAR, CHIMBO, SAN JOSÉ DE CHIMBO',
      actividad: 'RESTAURANTES, CEVICHERÍAS, PICANTERÍAS, CAFETERÍAS, ETCÉTERA, INCLUIDO COMIDA PARA LLEVAR',
      numeroDeRegistro: 'No cuenta con Registro de Turismo',
      estadoCategoria: 'Sin Registro',
      direccionWeb: 'www.nose.com',
      datosGenerales: {
        ruc: '1792072018001',
        estado: 'ACTIVO',
        razonSocial: 'DELI INTERNACIONAL S.A.',
        tipoContribuyente: 'SCD',
        identificacionRepresentanteLegal: '1704196912',
        nombreRepresentanteLegal: 'GUARDERAS RIOFRIO ESTEBAN',
        actividadEconomicaPrincipal: 'RESTAURANTES, CEVICHERÍAS, PICANTERÍAS, CAFETERÍAS, ETCÉTERA, INCLUIDO COMIDA PARA LLEVAR.',
        numeroExpediente: '157271'
      }
    };
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (status.toLowerCase()) {
      case 'activo':
      case 'registro':
        return 'success';
      case 'pendiente':
      case 'pendiente de inspección':
        return 'warn';
      case 'sin registro':
      case 'inactivo':
        return 'danger';
      default:
        return 'info';
    }
  }
}