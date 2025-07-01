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

export enum Provincias {
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