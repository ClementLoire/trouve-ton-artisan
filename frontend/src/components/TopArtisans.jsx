import React, { useEffect, useState } from 'react';
import { getTopArtisans } from '../services/api';
import ArtisanCard from './ArtisanCard';
import Loading from './Loading';
import './TopArtisans.scss';

const TopArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtisans = async () => {
      try {
        setLoading(true);
        const response = await getTopArtisans();
        setArtisans(response.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des artisans du mois:', err);
        setError('Impossible de charger les artisans du mois');
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtisans();
  }, []);

  if (loading) return <Loading message="Chargement des artisans du mois..." />;
  if (error) return <div className="error-message">{error}</div>;
  if (artisans.length === 0) return null;

  return (
    <section className="top-artisans">
      <div className="top-artisans-header">
        <h2 className="top-artisans-title">
          ⭐ Artisans du mois
        </h2>
        <p className="top-artisans-subtitle">
          Découvrez nos artisans exceptionnels du mois
        </p>
      </div>

      <div className="top-artisans-grid">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </section>
  );
};

export default TopArtisans;