const config = {
  port: 3000,
  jwtSecret: 'placeholder',
  jwtExpiresIn: '1h',
  saltRounds: 10,  db: {
    dev: {
      host: 'localhost',
      user: 'dev',
      password: 'secret',
      database: 'devdatabase',
    },
    test: {
      host: 'localhost',
      user: 'test',
      password: 'secret',
      database: 'testdatabase',
    },
  },
};

export default config;