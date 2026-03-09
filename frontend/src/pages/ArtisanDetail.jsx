import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtisanById } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaEnvelope, FaGlobe, FaArrowLeft } from 'react-icons/fa';
import Loading from '../components/Loading';
import './ArtisanDetail.scss';

const ArtisanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        setLoading(true);
        const response = await getArtisanById(id);
        setArtisan(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'artisan:', err);
        setError('Artisan introuvable');
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  const renderStars = (note) => {
    const stars = [];
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    const emptyStars = 5 - Math.ceil(note);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }
    return stars;
  };

  if (loading) return <Loading message="Chargement..." />;
  if (error) {
    return (
      <div className="error-page">
        <h2>{error}</h2>
        <Link to="/artisans" className="back-button">
          Retour à la liste
        </Link>
      </div>
    );
  }
  if (!artisan) return null;

  return (
    <div className="artisan-detail">
      <div className="artisan-detail-container">
        <button onClick={() => navigate(-1)} className="back-link">
          <FaArrowLeft /> Retour
        </button>

        <div className="artisan-detail-content">
          <div className="artisan-header">
            {artisan.top && (
              <div className="top-badge">
                ⭐ Artisan du mois
              </div>
            )}
            <h1 className="artisan-name">{artisan.name}</h1>
            {artisan.specialty && (
              <p className="artisan-specialty">{artisan.specialty.name}</p>
            )}
            <div className="artisan-rating">
              <div className="stars">{renderStars(artisan.note)}</div>
              <span className="note">{artisan.note.toFixed(1)}/5</span>
            </div>
          </div>

          <div className="artisan-info-section">
            <h2 className="section-title">Informations</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <p className="info-label">Localisation</p>
                  <p className="info-value">{artisan.location}</p>
                </div>
              </div>

              {artisan.specialty?.category && (
                <div className="info-item">
                  <span className="category-badge">
                    {artisan.specialty.category.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {artisan.about && (
            <div className="artisan-about-section">
              <h2 className="section-title">À propos</h2>
              <p className="artisan-about">{artisan.about}</p>
            </div>
          )}

          <div className="artisan-contact-section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-buttons">
              {artisan.email && (
                <a
                  href={`mailto:${artisan.email}`}
                  className="contact-button"
                >
                  <FaEnvelope /> Envoyer un email
                </a>
              )}
              {artisan.website && (
                <a
                  href={artisan.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button secondary"
                >
                  <FaGlobe /> Visiter le site web
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetail;