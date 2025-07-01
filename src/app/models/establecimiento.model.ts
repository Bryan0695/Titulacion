export interface Establecimiento {
  id: number;
  nombreComercial: string;
  ubicacionEstablecimientos: string; 
  ubicacion?: UbicacionEstablecimiento; 
  actividad: string;
  numeroDeRegistro: string;
  estadoCategoria: string;
  opciones?: OpcionesEstablecimiento;
  datosGenerales?: DatosGenerales;
  direccionWeb?: string;
  personalEstablecimiento?: PersonalEstablecimiento;
  personaContacto?: PersonaContacto;
}

export interface OpcionesEstablecimiento {
  crearTramite: boolean;
  solicitarInspeccion: boolean;
  descargarCertificado: boolean;
}

export interface DatosGenerales {
  ruc: string;
  estado: string;
  razonSocial: string;
  tipoContribuyente: string;
  identificacionRepresentanteLegal: string;
  nombreRepresentanteLegal: string;
  actividadEconomicaPrincipal: string;
  numeroExpediente?: string;
}

export interface TipoTramite {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface PersonaContacto {
  cedulaIdentidad: string;
  datosRegistroCivil: string;
  numeroTelefonoPrincipal: string;
  numeroTelefonoSecundario?: string;
  correoElectronico: string;
}

export interface UbicacionEstablecimiento {
  provincia: string; // Código de provincia (ej: 'BOL', 'PIC')
  canton: string; // Código de cantón (ej: 'CHI', 'QUI')
  parroquia: string; // Código de parroquia (ej: 'SJC', 'CHI')
  callePrincipal: string;
  numeracion: string;
  calleInterseccion: string;
  referenciaUbicacion: string;
  latitud: number;
  longitud: number;
}

export interface PersonalEstablecimiento {
  totalHombresTrabajanEstablecimiento: number;
  totalHombresDiscapacidad: number;
  totalMujeresTrabajanEstablecimiento: number;
  totalMujeresDiscapacidad: number;
}

// Interfaces adicionales para el manejo de datos de ubicación
export interface UbicacionCompleta {
  provincia: {
    codigo: string;
    nombre: string;
  };
  canton: {
    codigo: string;
    nombre: string;
  };
  parroquia: {
    codigo: string;
    nombre: string;
  };
  direccion: {
    callePrincipal: string;
    numeracion: string;
    calleInterseccion: string;
    referenciaUbicacion: string;
  };
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  direccionCompleta?: string;
}

// Interface para respuesta de APIs de ubicación
export interface UbicacionResponse {
  success: boolean;
  data: UbicacionEstablecimiento;
  message?: string;
}

// Interface para validación de ubicación
export interface UbicacionValidacion {
  esValida: boolean;
  errores: string[];
  advertencias?: string[];
}