import { Bloco } from '../models/Bloco';
import { api } from './api';

export const fetchBlocos = async (): Promise<Bloco[]> => {
  const query = `
  *[ _type == 'bloco']
  {
    _id,
    nome,
    descricao,
    imagem,
    cidade,
    estado,
    latitude,
    longitude,
    data,
    horario
  }`;

  const response = await api.get(`${import.meta.env.VITE_SANITY_DATASET}?query=${encodeURIComponent('*[_type == "bloco"]')}`);
  const dados = response.data.result;

  const blocos: Bloco[] = dados.map((bloco: any) => {
    return {
      _id: bloco._id,
      nome: bloco.nome,
      descricao: bloco.descricao,
      imagem: bloco.imagem,
      cidade: bloco.cidade,
      estado: bloco.estado,
      position: {
        lat: bloco.latitude,
        lng: bloco.longitude,
      },
      data: bloco.data,
      horario: bloco.horario,
    };
  });

  return blocos;
}