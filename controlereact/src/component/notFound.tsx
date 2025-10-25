import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div >
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n’existe pas.</p>
      <Link to="/" className="back-button">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
