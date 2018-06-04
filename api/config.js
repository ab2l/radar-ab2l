import applicationConfiguration from '../config';

export default Object.assign(applicationConfiguration, {
  cloudinary: {
    cloud_name: process.env.RADAR_AB2L_CLOUDINARY_NAME,
    api_key: process.env.RADAR_AB2L_CLOUDINARY_KEY,
    api_secret: process.env.RADAR_AB2L_CLOUDINARY_SECRET,
  },
  mailgun: {
    apiKey: process.env.RADAR_AB2L_MAILGUN_APIKEY,
    domain: process.env.RADAR_AB2L_MAILGUN_DOMAIN,
  },
  bipbop: {
    apiKey: process.env.RADAR_AB2L_BIPBOP_APIKEY,
  },
  database: (process.env.RADAR_AB2L_DATABASE_DSN || 'mongodb://127.0.0.1/radar'),
  redis: process.env.RADAR_AB2L_REDIS_DSN,
  http: {
    port: (process.env.RADAR_AB2L_HTTP_PORT ?
      parseInt(process.env.RADAR_AB2L_HTTP_PORT, 10) : 3000) /* DEFAULT HTTP PORT 3000 */,
  },
});
