const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const yamlDoc = YAML.load('./src/swagger/swagger.yaml');
//yamlDoc.host = yamlDoc[`${process.env.SWAGGER_ENV}_host`];
module.exports = [swaggerUi.serve, swaggerUi.setup(yamlDoc)];
