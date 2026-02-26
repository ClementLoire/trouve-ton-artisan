const Category = require('./Category');
const Specialty = require('./Specialty');
const Artisan = require('./Artisan');

Category.hasMany(Specialty, {
  foreignKey: 'category_id',
  as: 'specialties',
  onDelete: 'RESTRICT'
});

Specialty.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

Specialty.hasMany(Artisan, {
  foreignKey: 'specialty_id',
  as: 'artisans',
  onDelete: 'RESTRICT'
});

Artisan.belongsTo(Specialty, {
  foreignKey: 'specialty_id',
  as: 'specialty'
});

module.exports = {
  Category,
  Specialty,
  Artisan
};