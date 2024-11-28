import React, { useState } from 'react';
import TopBar from './TopBar'; // Importa o TopBar
    import './TopBar.css'; // estilização do TopBar

function Menu() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        // lógica para filtrar os produtos com base na busca
    };

    return (
        <div className="menu-page">
            <TopBar /> {/* Inclui o TopBar no topo da página */}

            <header className="menu-header">
                <h1 className="company-name">Nome da Empresa</h1>
            </header>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por produto, empresa ou cidade..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <div className="product-gallery">
                {/* Mapear produtos com as colunas desejadas */}
            </div>
        </div>
    );
}

export default Menu;
