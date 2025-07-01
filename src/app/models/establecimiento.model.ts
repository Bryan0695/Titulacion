export interface Establecimiento {
  id: number;
  nombreComercial: string;
  ubicacionEstablecimientos: string;
  actividad: string;
  numeroDeRegistro: string;
  estadoCategoria: string;
  opciones?: OpcionesEstablecimiento;
  datosGenerales?: DatosGenerales;
  direccionWeb?: string;
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
  provincia: string;
  canton: string;
  parroquia: string;
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