const { Artisan, Specialty, Category } = require('../models');
const { Op } = require('sequelize');

exports.getAllArtisans = async (req, res, next) => {
  try {
    const { 
      specialty, 
      category, 
      location, 
      top, 
      search,
      minNote,
      page = 1,
      limit = 10
    } = req.query;

    const where = {};
    const includeSpecialty = {
      model: Specialty,
      as: 'specialty',
      attributes: ['id', 'name'],
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    };

    if (specialty) where.specialty_id = specialty;
    if (category) includeSpecialty.where = { category_id: category };
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (top === 'true') where.top = true;
    if (minNote) where.note = { [Op.gte]: parseFloat(minNote) };
    if (search) where.name = { [Op.like]: `%${search}%` };

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: artisans } = await Artisan.findAndCountAll({
      where,
      include: [includeSpecialty],
      order: [['top', 'DESC'], ['note', 'DESC'], ['name', 'ASC']],
      limit: parseInt(limit),
      offset
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      data: artisans
    });
  } catch (error) {
    next(error);
  }
};

exports.getArtisanById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artisan = await Artisan.findByPk(id, {
      include: [{
        model: Specialty,
        as: 'specialty',
        attributes: ['id', 'name'],
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      }]
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: `Artisan avec l'ID ${id} introuvable`
      });
    }

    res.status(200).json({
      success: true,
      data: artisan
    });
  } catch (error) {
    next(error);
  }
};

exports.getTopArtisans = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [{
        model: Specialty,
        as: 'specialty',
        attributes: ['id', 'name'],
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      }],
      order: [['note', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    next(error);
  }
};