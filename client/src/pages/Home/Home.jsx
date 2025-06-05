import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ImageHero from "../../assets/mock6666.png"
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";


import Screen1 from "../../assets/screen1.PNG"
import Screen2 from "../../assets/screen2.PNG"
import Screen3 from "../../assets/screen3.PNG"
import Screen4 from "../../assets/screen4.PNG"
import Screen5 from "../../assets/screen5.PNG"
import Screen6 from "../../assets/screen6.PNG"
import Screen7 from "../../assets/screen7.PNG"

   

let images = [
  Screen1, 
  Screen1, 
  Screen2, 
  Screen3, 
  Screen4, 
  Screen5, 
  Screen6, 
  Screen7
];


const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [faqs, setFaqs] = useState([
    {
      question: "Est-ce que Noobtech fonctionne sur tous les appareils ?",
      isOpen: false,
      answer:
        "Oui, Noobtech est compatible avec tous les navigateurs modernes, smartphones, tablettes et écrans d’affichage. Vous pouvez gérer les files d’attente et les paiements où que vous soyez.",
    },
    {
      question: "Puis-je personnaliser l'apparence de l'application ?",
      isOpen: false,
      answer:
        "Absolument ! Avec le plan Premium, vous pouvez adapter l’apparence de l’application à votre image de marque : logo, couleurs, messages d’attente, et plus encore.",
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      isOpen: false,
      answer:
        "Oui. Toutes les données sont cryptées en stockage et en transfert. L’infrastructure est conforme aux normes ISO 27001 et RGPD, avec des contrôles d’accès stricts pour garantir votre sécurité.",
    },
  ]);
  const imagesPerView = 1;
  const navigate = useNavigate();

  const displayedImages = useMemo(
    () => images.slice(currentIndex, currentIndex + imagesPerView),
    [images, currentIndex]
  );




  const goToPlan = (plan) => {
    navigate(`/register?plan=${plan}`);
  };



  const next = () => {
    if (currentIndex + imagesPerView < images.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };



  const toggleAnswer = (index) => {
    setFaqs(prevFaqs =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  

  return (
    <div className='HomeContainer'>
      <Navbar />
      <div className="heroContainer">
        <div className="containerOfStars">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          +190 avis positifs
        </div>

        <span className="titleHero1">
          Facilitez la coordination
        </span>

        <span className="titleHero1 titleHero2">
          réduisez <span className="titleHeroHighLighted">les délais d’attente</span>
        </span>

        <p className="descHero1">
          Avec Noobtech, dites adieu aux files d'attente désorganisées et compliqués. Offrez à vos clients une expérience fluide grâce à un système de ticketing, une gestion en temps réel des files d'attente, et une interface entièrement personnalisable pour votre établissement.
        </p>

        <div className="containerTwoButtons">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="uhsfwuodhuhwdofxho">
              Démarrer maintenant
            </button>
          </Link>

          <span className="or">
            Ou bien
          </span>

          <Link to="/book-demo" style={{ textDecoration: 'none' }}>
            <button className="uosfwhdohwuhdofuhsduof">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar-days-icon lucide-calendar-days"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              &nbsp;&nbsp;Demander une démo
            </button>
          </Link>
        </div>
      </div>

      <div className="imageContainerOfMockup">
        <img src={ImageHero} alt="" className="imageMockUp" />
      </div>




      <div className="heroContainer2" id="why">
        <div className="containerOfStars">
          <i className="fa-regular fa-lightbulb"></i>
          &nbsp;Une gestion fluide, des attentes réduites.
        </div>
        <span className="titleHero1">Pourquoi NoobTech ?</span>
        <p className="descHero1"></p>
        <div className="gridX">
          <div className="cardX">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-stack-icon lucide-square-stack"
              >
                <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
                <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
                <rect width="8" height="8" x="14" y="14" rx="2" />
              </svg>
            </div>
            <h3 className="card-titleX">Gestion des files d'attente simplifiée</h3>
            <p className="card-textX">
              Grâce à un système de ticketing intuitif, chaque client est informé en temps réel de sa position
              dans la file, réduisant le stress et les frustrations liées à l'attente. 
            </p>
          </div>

          <div className="cardX">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-columns3-cog-icon lucide-columns-3-cog"
              >
                <path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
                <path d="m14.3 19.6 1-.4" />
                <path d="M15 3v7.5" />
                <path d="m15.2 16.9-.9-.3" />
                <path d="m16.6 21.7.3-.9" />
                <path d="m16.8 15.3-.4-1" />
                <path d="m19.1 15.2.3-.9" />
                <path d="m19.6 21.7-.4-1" />
                <path d="m20.7 16.8 1-.4" />
                <path d="m21.7 19.4-.9-.3" />
                <path d="M9 3v18" />
                <circle cx="18" cy="18" r="3" />
              </svg>
            </div>
            <h3 className="card-titleX">Interface entièrement personnalisable</h3>
            <p className="card-textX">
              Adaptez l’apparence et l’ergonomie de l’application à l’image de votre organisation. Noobtech offre
              une flexibilité totale pour personnaliser l'affichage et l'expérience utilisateur selon vos besoins.
            </p>
          </div>

          <div className="cardX">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-radio-tower-icon lucide-radio-tower"
              >
                <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
                <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
                <circle cx="12" cy="9" r="2" />
                <path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" />
                <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
                <path d="M9.5 18h5" />
                <path d="m8 22 4-11 4 11" />
              </svg>
            </div>
            <h3 className="card-titleX">Suivi en temps réel</h3>
            <p className="card-textX">
              Le système affiche en temps réel l’évolution des files d’attente sur de grands écrans, ce qui garantit
              une gestion transparente et efficace pour vos clients et vos équipes.
            </p>
          </div>
        </div>
      </div>

      <div className="heroContainer2" id="tarif">
        <div className="containerOfStars">
          <i className="fa-solid fa-dollar"></i>
          &nbsp;Votre plan, vos rythme
        </div>
        <span className="titleHero1">Tarification à la carte</span>
        <p className="descHero1">
          Choisissez le forfait adapté à votre organisation. Sans surprises, sans engagement.
        </p>
        <section className="pricing-container">
          <div className="card">
            <h2 className="card-title">Standard</h2>
            <p className="card-price">
              0 MAD<span className="period">/mois</span>
            </p>
            <p className="card-subtitle"></p>
            <button className="btn btn-outline" onClick={() => goToPlan("standard")}>
              Démarrer gratuitement
            </button>
            <ul className="features">
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Accès au système de ticketing</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Affichage de la file d’attente en temps réel</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Tableau de bord de base pour l’administration</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Support client limité</span>
              </li>
            </ul>
          </div>

          <div className="card popular">
            <div className="badge badgeX">
              <i className="fa-solid fa-fire"></i>&nbsp;Le plus populaire
            </div>
            <h2 className="card-title">Premium</h2>
            <p className="card-price">
              499 MAD<span className="period">/mois</span>
            </p>
            <p className="card-subtitle">Jusqu'à 500 plannings / mois</p>
            <button className="btn btn-primary btnKKK" onClick={() => goToPlan("premium")}>
              Choisir Premium
            </button>
            <ul className="features">
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Tout le Basique, plus :</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Personnalisation avancée de l'interface</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Suivi détaillé des performances</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Gestion multi-site</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Support client prioritaire</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="heroContainer2" id="security">
        <div className="containerOfStars">
          <i className="fa-solid fa-shield"></i>
          &nbsp;Sécurité garantie
        </div>
        <span className="titleHero1">Sécurité intégrée, tranquillité assurée</span>
        <p className="descHero1">
          <span className="descHero1Span">
            Conçu et désigné pour protéger vos données
          </span>
          , qui restent strictement confidentielles, protégées par des mesures rigoureuses, et
          jamais partagées.
        </p>
        <div className="gridXY">
          <div className="cardXY">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-check-icon lucide-shield-check"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="card-titleX">Protection des données</h3>
            <p className="card-textX">
              Toutes les données sont cryptées lors du stockage et des transferts, selon les standards les
              plus exigeants.
            </p>
          </div>

          <div className="cardXY">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layout-panel-top-icon lucide-layout-panel-top"
              >
                <rect width="18" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
              </svg>
            </div>
            <h3 className="card-titleX">Infrastructure certifiée</h3>
            <p className="card-textX">
              Vos données sont stockées sur des serveurs conformes aux normes ISO 27001, RGPD, avec haute
              disponibilité.
            </p>
          </div>

          <div className="cardXY">
            <div className="card-iconX">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-key-round-icon lucide-key-round"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
            </div>
            <h3 className="card-titleX">Gestion des autorisations</h3>
            <p className="card-textX">
              Grâce à des mécanismes d'authentification multi-facteurs et des contrôles d'accès basés sur les
              rôles, nous assurons que seules les personnes autorisées peuvent accéder à certaines données ou
              fonctionnalités critiques
            </p>
          </div>
        </div>
      </div>

      <div className="heroContainer2" id="screens">
        <div className="containerOfStars">
          <i className="fa-solid fa-eye"></i>
          &nbsp;Un aperçu concret
        </div>
        <span className="titleHero1">Avant d’adopter, explorez</span>
        <p className="descHero1">
          Découvrez l’interface mobile telle qu’elle est, sans filtres : claire, intuitive et pensée pour
          les professionnels de santé.
        </p>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={previous}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="carousel-images">
            {displayedImages.map((img, idx) => (
              <div key={idx} className="carousel-image">
                <img src={img} alt="Screenshot" />
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={next}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="heroContainer2" id="faq">
        <div className="containerOfStars">
          <i className="fa-solid fa-question"></i>
          &nbsp;Questions fréquentes
        </div>
        <span className="titleHero1">FAQ</span>
        <p className="descHero1 descHero22">
          Vous avez des interrogations ? Explorez notre section FAQ pour trouver des réponses claires et détaillées.
        </p>

        <div className="faq-container">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="question" onClick={() => toggleAnswer(i)}>
                <h3 className={faq.isOpen ? "questionActivated" : ""}>{faq.question}</h3>
                {!faq.isOpen && <i className="fa-solid fa-plus"></i>}
                {faq.isOpen && <i className="fa-solid fa-minus"></i>}
              </div>
              {faq.isOpen && (
                <div className="answer" onClick={() => toggleAnswer(i)}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="areYouSureWanna">
        <p className="isjowfd">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="30"
            height="30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
          Rejoignez-nous et transformez l’avenir
        </p>
        <p className="swdfouj">
          Plus qu’un service, une nouvelle façon de gérer vos activités.
          Adoptez une solution intuitive, moderne et conçue pour simplifier votre
          organisation. Faites partie de celles et ceux qui ont déjà choisi
          l’efficacité, l’innovation et le changement.
        </p>
        <Link to="/book-demo" style={{ textDecoration: "none" }}>
          <button className="buttonXyX">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-days-icon lucide-calendar-days"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            &nbsp;&nbsp;Réserver une démo
          </button>
        </Link>
      </div>

      <footer className="mini-footer">
        <div className="footer-bottom">
          <div className="footer-top">
            <div className="contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#202020"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-call-icon lucide-phone-call"
              >
                <path d="M13 2a9 9 0 0 1 9 9" />
                <path d="M13 6a5 5 0 0 1 5 5" />
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <span>+213 616 506 586</span>
            </div>
            <div className="contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#202020"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-icon lucide-mail"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <span>contact&#64;edu.ma</span>
            </div>
          </div>
          <br />
          <p>© 2025 EDU - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
