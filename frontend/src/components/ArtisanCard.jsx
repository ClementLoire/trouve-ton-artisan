import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import './ArtisanCard.scss';

const ArtisanCard = ({ artisan }) => {
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

  return (
    <div className={`artisan-card ${artisan.top ? 'featured' : ''}`}>
      {artisan.top && (
        <div className="artisan-card-badge">
          ⭐ Artisan du mois
        </div>
      )}

      <div className="artisan-card-header">
        <h3 className="artisan-card-name">{artisan.name}</h3>
        {artisan.specialty && (
          <p className="artisan-card-specialty">
            {artisan.specialty.name}
          </p>
        )}
      </div>

      <div className="artisan-card-body">
        <div className="artisan-card-rating">
          <div className="stars">
            {renderStars(artisan.note)}
          </div>
          <span className="note">{artisan.note.toFixed(1)}/5</span>
        </div>

        <div className="artisan-card-info">
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>{artisan.location}</span>
          </div>

          {artisan.specialty?.category && (
            <div className="info-item">
              <span className="category-tag">
                {artisan.specialty.category.name}
              </span>
            </div>
          )}
        </div>

        {artisan.about && (
          <p className="artisan-card-description">
            {artisan.about.length > 120 
              ? `${artisan.about.substring(0, 120)}...` 
              : artisan.about
            }
          </p>
        )}
      </div>

      <div className="artisan-card-footer">
        <div className="artisan-card-contact">
          {artisan.email && (
            <a 
              href={`mailto:${artisan.email}`} 
              className="contact-icon"
              title="Email"
            >
              <FaEnvelope />
            </a>
          )}
          {artisan.website && (
            <a 
              href={artisan.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-icon"
              title="Site web"
            >
              <FaGlobe />
            </a>
          )}
        </div>

        <Link 
          to={`/artisans/${artisan.id}`} 
          className="artisan-card-button"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  );
};

export default ArtisanCard;