const { gql } = require('apollo-server');
const models = require('./models');
const queries = require('./queries');
const mutations = require('./mutations');

const schema = gql`
  ${models}
  ${queries}
  ${mutations}
`;

module.exports = schema;
