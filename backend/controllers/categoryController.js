const { Category, Specialty } = require('../models');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Specialty,
        as: 'specialties',
        attributes: ['id', 'name']
      }],
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [{
        model: Specialty,
        as: 'specialties',
        attributes: ['id', 'name']
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Catégorie avec l'ID ${id} introuvable`
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};