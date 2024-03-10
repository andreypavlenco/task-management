export default () => ({
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_username: process.env.DB_USERNANE,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  jwt_secret: process.env.JWT_SECRET,
  expires: process.env.EXPIRES,
});
