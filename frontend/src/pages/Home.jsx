import React from 'react';
import { Link } from 'react-router-dom';
import TopArtisans from '../components/TopArtisans';
import './Home.scss';

const Home = () => {
  const categories = [
    { id: 1, name: 'Bâtiment', icon: '🏗️', description: 'Plombiers, électriciens, menuisiers...' },
    { id: 2, name: 'Services', icon: '✂️', description: 'Coiffeurs, fleuristes, photographes...' },
    { id: 3, name: 'Fabrication', icon: '⚒️', description: 'Bijoutiers, couturiers, ébénistes...' },
    { id: 4, name: 'Alimentation', icon: '🍞', description: 'Boulangers, bouchers, chocolatiers...' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Trouvez l'artisan qu'il vous faut
          </h1>
          <p className="hero-subtitle">
            Plus de 17 artisans qualifiés en Auvergne-Rhône-Alpes
          </p>
          <Link to="/artisans" className="hero-button">
            Découvrir nos artisans
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="categories-container">
          <h2 className="section-title">Nos catégories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/artisans?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artisans Section */}
      <TopArtisans />

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Prêt à trouver votre artisan ?</h2>
          <p className="cta-text">
            Parcourez notre annuaire complet et découvrez les meilleurs artisans
            de votre région
          </p>
          <Link to="/artisans" className="cta-button">
            Voir tous les artisans
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;