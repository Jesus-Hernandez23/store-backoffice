export default {
  api: {
    // use http protocol to avoid self-signed certificate error
    input: 'http://localhost:5281/swagger/v1/swagger.json',
    output: {
      mode: 'tags-split',
      client: 'react-query',
      schemas: 'src/api/interfaces',
      target: './src/api/task/api.ts',
      /*override: {
        mutator: './src/api/utilities/axios.ts',
      },*/
    },
  },
};
