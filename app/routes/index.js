const inventoryRoutes = require('./inventory_routes');

module.exports = function(app, db){
    inventoryRoutes(app, db);
}