import { defineField } from 'sanity';

export default {
  name: 'bloco',
  title: 'Bloco',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'string',
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'string',
    }),
    defineField({
      name: 'horario',
      title: 'Horário',
      type: 'string',
    }),
  ]
}