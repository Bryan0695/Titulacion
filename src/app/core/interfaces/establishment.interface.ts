export interface Establishment {
  id: number;
  nombreComercial: string;
  ubicacion: {
    provincia: string;
    canton: string;
    parroquia: string;
    direccion: string;
  };
  actividad: string;
  numeroRegistro: string;
  fechaRegistro?: Date;
  estadoCatastro: string;
  cerradoSri?: boolean;
}

export interface Representative {
  name: string;
  image: string;
}

export interface Country {
  name: string;
  code: string;
}