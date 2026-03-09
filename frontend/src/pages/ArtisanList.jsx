import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllArtisans, getCategories, searchArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';
import './ArtisansList.scss';

const ArtisansList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [minNote, setMinNote] = useState(searchParams.get('minNote') || '');
  const [showTopOnly, setShowTopOnly] = useState(searchParams.get('top') === 'true');

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Charger les artisans avec les filtres
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {
          search: searchTerm,
          category: selectedCategory,
          location: selectedLocation,
          minNote: minNote,
          top: showTopOnly
        };

        const response = await searchArtisans(filters);
        setArtisans(response.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des artisans:', err);
        setError('Impossible de charger les artisans. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [searchTerm, selectedCategory, selectedLocation, minNote, showTopOnly]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    updateSearchParams({ search: term });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    updateSearchParams({ category: categoryId });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    updateSearchParams({ location });
  };

  const handleMinNoteChange = (note) => {
    setMinNote(note);
    updateSearchParams({ minNote: note });
  };

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  return (
    <div className="artisans-list">
      <div className="artisans-list-header">
        <h1 className="page-title">
          {showTopOnly ? '⭐ Artisans du mois' : 'Nos Artisans'}
        </h1>
        <p className="page-subtitle">
          {showTopOnly
            ? 'Découvrez nos artisans exceptionnels du mois'
            : 'Trouvez l\'artisan parfait pour vos projets'}
        </p>
      </div>

      <div className="artisans-list-filters">
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
          minNote={minNote}
          onMinNoteChange={handleMinNoteChange}
        />
      </div>

      <div className="artisans-list-content">
        {loading && <Loading message="Chargement des artisans..." />}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && artisans.length === 0 && (
          <div className="no-results">
            <p>Aucun artisan trouvé avec ces critères.</p>
            <p>Essayez de modifier vos filtres.</p>
          </div>
        )}

        {!loading && !error && artisans.length > 0 && (
          <>
            <div className="results-count">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
            </div>
            <div className="artisans-grid">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtisansList;