import { createClient } from '@sanity/client';
import React from 'react';
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: import.meta.env.PROD,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
})

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}