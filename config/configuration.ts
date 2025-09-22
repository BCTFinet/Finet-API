export default () => ({
  port: Number(process.env.PORT ?? 3000),
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: Number(process.env.DATABASE_PORT ?? 5432)
  // }
});
