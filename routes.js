const routes = require('next-routes')();

routes.add('/metadatas/new', '/metadatas/new').add('/metadatas/:address', '/metadatas/show').add('/metadatas/:address/requests', '/metadatas/requests').add('/metadatas/:address/requests/manager', '/metadatas/requests/manager/index').add('/metadatas/:address/requests/new', '/metadatas/requests/new');

module.exports = routes;
