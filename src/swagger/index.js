const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const yamlDoc = YAML.load('./src/swagger/swagger.yaml');
module.exports = [swaggerUi.serve, swaggerUi.setup(yamlDoc)];
