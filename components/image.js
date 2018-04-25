/* eslint camelcase: 0 */
import cloudinary from 'cloudinary-core';
import config from '../config';

const cl = new cloudinary.Cloudinary({
  cloud_name: config.cloudinary,
  secure: true,
});

const thumbs = (ctx) => {
  if (!ctx || !ctx.public_id) return 'https://placehold.it/128x128';
  return cl.url(`${ctx.public_id}.png`, {
    gravity: 'center',
    height: 128,
    quality: 'auto:best',
    radius: 2,
    width: 128,
    crop: 'thumb',
  });
};

const background = (ctx) => {
  if (!ctx || !ctx.public_id) return 'https://placehold.it/1280x960';
  return cl.url(ctx.public_id, {
    gravity: 'auto',
    height: 960,
    quality: 'auto:best',
    width: 1280,
    crop: 'fill',
    background: '#000000',
  });
};

const logo = (ctx) => {
  if (!ctx || !ctx.public_id) return 'https://placehold.it/190x55';
  return cl.url(ctx.public_id, {
    height: 55,
    quality: 'auto:good',
    width: 190,
    crop: 'limit',
  });
};


export { thumbs, background, logo };

export default thumbs;
