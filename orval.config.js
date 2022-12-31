module.exports = {
  api: {
    // use http protocol to avoid self-signed certificate error
    input: 'http://localhost:5281/swagger/v1/swagger.json',
    output: {
      target: './src/api/v2/api.ts',
      override: {
        mutator: './src/api/v2/axios.ts',
      },
    },
  },
};
