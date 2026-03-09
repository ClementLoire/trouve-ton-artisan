import React from 'react';
import './FilterBar.scss';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  minNote,
  onMinNoteChange
}) => {
  const locations = [
    'Toutes les villes',
    'Lyon',
    'Grenoble',
    'Clermont-Ferrand',
    'Saint-Étienne',
    'Chambéry',
    'Annecy',
    'Valence'
  ];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter" className="filter-label">
          Catégorie
        </label>
        <select
          id="category-filter"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter" className="filter-label">
          Ville
        </label>
        <select
          id="location-filter"
          className="filter-select"
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          {locations.map((loc, index) => (
            <option key={index} value={loc === 'Toutes les villes' ? '' : loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="note-filter" className="filter-label">
          Note minimum
        </label>
        <select
          id="note-filter"
          className="filter-select"
          value={minNote}
          onChange={(e) => onMinNoteChange(e.target.value)}
        >
          <option value="">Toutes les notes</option>
          <option value="4">4★ et plus</option>
          <option value="4.5">4.5★ et plus</option>
          <option value="5">5★ uniquement</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;