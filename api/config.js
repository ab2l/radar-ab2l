import applicationConfiguration from '../config';

export default Object.assign(applicationConfiguration, {
  cloudinary: {
    name: process.env.RADAR_AB2L_CLOUDINARY_NAME,
    key: process.env.RADAR_AB2L_CLOUDINARY_KEY,
    secret: process.env.RADAR_AB2L_CLOUDINARY_SECRET,
  },
  mailgun: {
    apiKey: process.env.RADAR_AB2L_MAILGUN_APIKEY,
    domain: process.env.RADAR_AB2L_MAILGUN_DOMAIN,
  },
  bipbop: {
    apiKey: process.env.RADAR_AB2L_BIPBOP_APIKEY,
  },
  database: process.env.RADAR_AB2L_DATABASE_DSN,
});
