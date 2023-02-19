export interface Bloco {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  cidade: string;
  estado: string;
  position: {
    lat: number;
    lng: number;
  };
  data: string;
  horario: string;
}