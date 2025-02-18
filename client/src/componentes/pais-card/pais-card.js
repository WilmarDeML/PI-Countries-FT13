import { Link } from "react-router-dom";

import './pais-card.css';

const PaisCard = ({ id, nombre, bandera, continente, poblacion }) => { 
    
    poblacion = new Intl.NumberFormat('en-EN').format(poblacion)

    return (
        <Link to={`/countries/${id}`} className='link card'>
            <figure className="bg-body-tertiary">
                <img src={`${bandera}`} alt={`Bandera de ${nombre}`} className="rounded d-block m-auto" />
            </figure>
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
            </div>
            <div className="card-footer">
                <span>people: {poblacion}</span>
                <span >{continente}</span>
            </div>
        </Link>
    );
};

export default PaisCard;
