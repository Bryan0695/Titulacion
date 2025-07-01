export enum EstadoEstablecimiento {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  PENDIENTE = 'PENDIENTE',
  SUSPENDIDO = 'SUSPENDIDO'
}

export enum TipoPersonaJuridica {
  COMPANIA_COMANDITA_SIMPLE_DIVIDIDA_ACCIONES = 'Compañía en Comandita Simple y Dividida por Acciones',
  COMPANIA_LIMITADA = 'Compañía Limitada',
  SOCIEDAD_ANONIMA = 'Sociedad Anónima',
  SOCIEDADES_CIVILES = 'Sociedades Civiles'
}

export enum TipoTramiteEnum {
  REGISTRO = 'registro',
  ACTIVACION = 'activacion',
  INACTIVACION = 'inactivacion',
  ACTUALIZACION = 'actualizacion'
}

export enum PasosAcreditacion {
  DATOS_GENERALES_PERSONA = 1,
  DATOS_GENERALES_ESTABLECIMIENTO = 2,
  ACREDITACION_TURISTICA = 3
}

export enum SeverityStatus {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warn',
  DANGER = 'danger'
}

// Provincias con códigos y nombres
export enum ProvinciaCodigo {
  AZUAY = 'AZU',
  BOLIVAR = 'BOL',
  CANAR = 'CAN',
  CARCHI = 'CAR',
  CHIMBORAZO = 'CHI',
  COTOPAXI = 'COT',
  EL_ORO = 'EOR',
  ESMERALDAS = 'ESM',
  GALAPAGOS = 'GAL',
  GUAYAS = 'GUA',
  IMBABURA = 'IMB',
  LOJA = 'LOJ',
  LOS_RIOS = 'LRO',
  MANABI = 'MAN',
  MORONA_SANTIAGO = 'MSA',
  NAPO = 'NAP',
  ORELLANA = 'ORE',
  PASTAZA = 'PAS',
  PICHINCHA = 'PIC',
  SANTA_ELENA = 'SEL',
  SANTO_DOMINGO = 'SDE',
  SUCUMBIOS = 'SDO',
  TUNGURAHUA = 'TUN',
  ZAMORA_CHINCHIPE = 'ZCH'
}

export enum ProvinciaNombre {
  AZUAY = 'AZUAY',
  BOLIVAR = 'BOLÍVAR',
  CANAR = 'CAÑAR',
  CARCHI = 'CARCHI',
  CHIMBORAZO = 'CHIMBORAZO',
  COTOPAXI = 'COTOPAXI',
  EL_ORO = 'EL ORO',
  ESMERALDAS = 'ESMERALDAS',
  GALAPAGOS = 'GALÁPAGOS',
  GUAYAS = 'GUAYAS',
  IMBABURA = 'IMBABURA',
  LOJA = 'LOJA',
  LOS_RIOS = 'LOS RÍOS',
  MANABI = 'MANABÍ',
  MORONA_SANTIAGO = 'MORONA SANTIAGO',
  NAPO = 'NAPO',
  ORELLANA = 'ORELLANA',
  PASTAZA = 'PASTAZA',
  PICHINCHA = 'PICHINCHA',
  SANTA_ELENA = 'SANTA ELENA',
  SANTO_DOMINGO = 'SANTO DOMINGO DE LOS TSÁCHILAS',
  SUCUMBIOS = 'SUCUMBÍOS',
  TUNGURAHUA = 'TUNGURAHUA',
  ZAMORA_CHINCHIPE = 'ZAMORA CHINCHIPE'
}

// Cantones de Bolívar
export enum CantonBolivarCodigo {
  CHIMBO = 'CHI',
  ECHEANDIA = 'ECH',
  GUARANDA = 'GUA',
  LAS_NAVES = 'LAS',
  CALUMA = 'CAL',
  CHILLANES = 'CHL',
  SAN_MIGUEL = 'SAN'
}

export enum CantonBolivarNombre {
  CHIMBO = 'CHIMBO',
  ECHEANDIA = 'ECHEANDÍA',
  GUARANDA = 'GUARANDA',
  LAS_NAVES = 'LAS NAVES',
  CALUMA = 'CALUMA',
  CHILLANES = 'CHILLANES',
  SAN_MIGUEL = 'SAN MIGUEL'
}

// Cantones de Pichincha
export enum CantonPichinchaCodigo {
  QUITO = 'QUI',
  CAYAMBE = 'CAY',
  MEJIA = 'MEJ',
  RUMINAHUI = 'RUM',
  SAN_MIGUEL_BANCOS = 'SMB',
  PEDRO_MONCAYO = 'PED',
  PEDRO_VICENTE_MALDONADO = 'PVM',
  PUERTO_QUITO = 'PUE'
}

export enum CantonPichinchaNombre {
  QUITO = 'QUITO',
  CAYAMBE = 'CAYAMBE',
  MEJIA = 'MEJÍA',
  RUMINAHUI = 'RUMIÑAHUI',
  SAN_MIGUEL_BANCOS = 'SAN MIGUEL DE LOS BANCOS',
  PEDRO_MONCAYO = 'PEDRO MONCAYO',
  PEDRO_VICENTE_MALDONADO = 'PEDRO VICENTE MALDONADO',
  PUERTO_QUITO = 'PUERTO QUITO'
}

// Parroquias de Chimbo
export enum ParroquiaChimboCodigo {
  CHIMBO = 'CHI',
  SAN_JOSE_CHIMBO = 'SJC',
  MAGDALENA = 'MAG',
  ASUNCION = 'ASU',
  TELIMBELA = 'TEL'
}

export enum ParroquiaChimboNombre {
  CHIMBO = 'CHIMBO',
  SAN_JOSE_CHIMBO = 'SAN JOSÉ DE CHIMBO',
  MAGDALENA = 'MAGDALENA',
  ASUNCION = 'ASUNCIÓN',
  TELIMBELA = 'TELIMBELA'
}

// Interfaces para mapear códigos con nombres
export interface UbicacionData {
  codigo: string;
  nombre: string;
  padre?: string;
}

// Constantes para facilitar el mapeo
export const PROVINCIAS_DATA: UbicacionData[] = [
  { codigo: ProvinciaCodigo.AZUAY, nombre: ProvinciaNombre.AZUAY },
  { codigo: ProvinciaCodigo.BOLIVAR, nombre: ProvinciaNombre.BOLIVAR },
  { codigo: ProvinciaCodigo.CANAR, nombre: ProvinciaNombre.CANAR },
  { codigo: ProvinciaCodigo.CARCHI, nombre: ProvinciaNombre.CARCHI },
  { codigo: ProvinciaCodigo.CHIMBORAZO, nombre: ProvinciaNombre.CHIMBORAZO },
  { codigo: ProvinciaCodigo.COTOPAXI, nombre: ProvinciaNombre.COTOPAXI },
  { codigo: ProvinciaCodigo.EL_ORO, nombre: ProvinciaNombre.EL_ORO },
  { codigo: ProvinciaCodigo.ESMERALDAS, nombre: ProvinciaNombre.ESMERALDAS },
  { codigo: ProvinciaCodigo.GALAPAGOS, nombre: ProvinciaNombre.GALAPAGOS },
  { codigo: ProvinciaCodigo.GUAYAS, nombre: ProvinciaNombre.GUAYAS },
  { codigo: ProvinciaCodigo.IMBABURA, nombre: ProvinciaNombre.IMBABURA },
  { codigo: ProvinciaCodigo.LOJA, nombre: ProvinciaNombre.LOJA },
  { codigo: ProvinciaCodigo.LOS_RIOS, nombre: ProvinciaNombre.LOS_RIOS },
  { codigo: ProvinciaCodigo.MANABI, nombre: ProvinciaNombre.MANABI },
  { codigo: ProvinciaCodigo.MORONA_SANTIAGO, nombre: ProvinciaNombre.MORONA_SANTIAGO },
  { codigo: ProvinciaCodigo.NAPO, nombre: ProvinciaNombre.NAPO },
  { codigo: ProvinciaCodigo.ORELLANA, nombre: ProvinciaNombre.ORELLANA },
  { codigo: ProvinciaCodigo.PASTAZA, nombre: ProvinciaNombre.PASTAZA },
  { codigo: ProvinciaCodigo.PICHINCHA, nombre: ProvinciaNombre.PICHINCHA },
  { codigo: ProvinciaCodigo.SANTA_ELENA, nombre: ProvinciaNombre.SANTA_ELENA },
  { codigo: ProvinciaCodigo.SANTO_DOMINGO, nombre: ProvinciaNombre.SANTO_DOMINGO },
  { codigo: ProvinciaCodigo.SUCUMBIOS, nombre: ProvinciaNombre.SUCUMBIOS },
  { codigo: ProvinciaCodigo.TUNGURAHUA, nombre: ProvinciaNombre.TUNGURAHUA },
  { codigo: ProvinciaCodigo.ZAMORA_CHINCHIPE, nombre: ProvinciaNombre.ZAMORA_CHINCHIPE }
];

export const CANTONES_DATA: (UbicacionData & { provincia: string })[] = [
  // Cantones de Bolívar
  { codigo: CantonBolivarCodigo.CHIMBO, nombre: CantonBolivarNombre.CHIMBO, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.ECHEANDIA, nombre: CantonBolivarNombre.ECHEANDIA, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.GUARANDA, nombre: CantonBolivarNombre.GUARANDA, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.LAS_NAVES, nombre: CantonBolivarNombre.LAS_NAVES, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.CALUMA, nombre: CantonBolivarNombre.CALUMA, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.CHILLANES, nombre: CantonBolivarNombre.CHILLANES, provincia: ProvinciaCodigo.BOLIVAR },
  { codigo: CantonBolivarCodigo.SAN_MIGUEL, nombre: CantonBolivarNombre.SAN_MIGUEL, provincia: ProvinciaCodigo.BOLIVAR },
  
  // Cantones de Pichincha
  { codigo: CantonPichinchaCodigo.QUITO, nombre: CantonPichinchaNombre.QUITO, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.CAYAMBE, nombre: CantonPichinchaNombre.CAYAMBE, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.MEJIA, nombre: CantonPichinchaNombre.MEJIA, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.RUMINAHUI, nombre: CantonPichinchaNombre.RUMINAHUI, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.SAN_MIGUEL_BANCOS, nombre: CantonPichinchaNombre.SAN_MIGUEL_BANCOS, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.PEDRO_MONCAYO, nombre: CantonPichinchaNombre.PEDRO_MONCAYO, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.PEDRO_VICENTE_MALDONADO, nombre: CantonPichinchaNombre.PEDRO_VICENTE_MALDONADO, provincia: ProvinciaCodigo.PICHINCHA },
  { codigo: CantonPichinchaCodigo.PUERTO_QUITO, nombre: CantonPichinchaNombre.PUERTO_QUITO, provincia: ProvinciaCodigo.PICHINCHA }
];

export const PARROQUIAS_DATA: (UbicacionData & { canton: string })[] = [
  // Parroquias de Chimbo
  { codigo: ParroquiaChimboCodigo.CHIMBO, nombre: ParroquiaChimboNombre.CHIMBO, canton: CantonBolivarCodigo.CHIMBO },
  { codigo: ParroquiaChimboCodigo.SAN_JOSE_CHIMBO, nombre: ParroquiaChimboNombre.SAN_JOSE_CHIMBO, canton: CantonBolivarCodigo.CHIMBO },
  { codigo: ParroquiaChimboCodigo.MAGDALENA, nombre: ParroquiaChimboNombre.MAGDALENA, canton: CantonBolivarCodigo.CHIMBO },
  { codigo: ParroquiaChimboCodigo.ASUNCION, nombre: ParroquiaChimboNombre.ASUNCION, canton: CantonBolivarCodigo.CHIMBO },
  { codigo: ParroquiaChimboCodigo.TELIMBELA, nombre: ParroquiaChimboNombre.TELIMBELA, canton: CantonBolivarCodigo.CHIMBO }
];

// Coordenadas predefinidas por parroquia
export const COORDENADAS_PARROQUIAS: { [key: string]: { lat: number; lng: number } } = {
  [ParroquiaChimboCodigo.SAN_JOSE_CHIMBO]: { lat: -1.2847, lng: -79.0217 },
  [ParroquiaChimboCodigo.CHIMBO]: { lat: -1.2900, lng: -79.0150 },
  [CantonPichinchaCodigo.QUITO]: { lat: -0.1807, lng: -78.4678 }
};