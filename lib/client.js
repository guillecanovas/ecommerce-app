import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '7k5g0gpu',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_TOKEN
});

//para poder usar imagenes
const builder = imageUrlBuilder(client); //le pasamos el cliente que acabamos de crear

export const urlFor = (source) => builder.image(source);

