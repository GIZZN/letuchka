'use client'
import { useState } from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  year: string;
}

export default function Home() {
  const router = useRouter();
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const targetPosition = section.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDestinationClick = (destId: number) => {
    router.push(`/tours?category=${destinations[destId - 1].title.toLowerCase()}`);
  };

  const destinations: Destination[] = [
    {
      id: 1,
      title: "Солнечная Греция",
      description: "Откройте для себя древние руины, кристально чистые воды и великолепные пляжи Средиземноморья",
      image: "/greece.jpg",
      price: "от 89,900 ₽",
      rating: 4.8
    },
    {
      id: 2,
      title: "Магическая Италия",
      description: "Погрузитесь в мир искусства, истории и непревзойденной кухни в сердце Европы",
      image: "/italy.jpg",
      price: "от 95,500 ₽",
      rating: 4.9
    },
    {
      id: 3,
      title: "Экзотический Таиланд",
      description: "Исследуйте тропические острова, древние храмы и яркую культуру Юго-Восточной Азии",
      image: "/thailand.jpg",
      price: "от 75,900 ₽",
      rating: 4.7
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Таиланд превзошел все ожидания! Спасибо за прекрасно организованный отдых.",
      author: "Елена Смирнова",
      location: "Таиланд",
      year: "2023"
    },
    {
      id: 2,
      text: "Незабываемое путешествие по Европе! Каждая деталь была продумана до мелочей.",
      author: "Михаил Петров",
      location: "Европа",
      year: "2023"
    },
    {
      id: 3,
      text: "Мальдивы - это рай на земле! Благодарим за помощь в организации нашего медового месяца.",
      author: "Анна и Дмитрий",
      location: "Мальдивы",
      year: "2023"
    }
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.floating}>Откройте Мир с Нами</h1>
            <p className={styles.heroText}>Незабываемые путешествия и яркие впечатления ждут вас</p>
            <div className={styles.heroCtas}>
              <button 
                onClick={() => scrollToSection('destinations')} 
                className={`${styles.cta} ${styles.ctaPrimary}`}
              >
                Исследовать направления
                <span className={styles.ctaArrow}>→</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`${styles.cta} ${styles.ctaSecondary}`}
              >
                Получить консультацию
              </button>
            </div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Довольных клиентов</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Направлений</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Положительных отзывов</span>
            </div>
          </div>
        </section>

        <section id="destinations" className={styles.destinations}>
          <h2 className={styles.sectionTitle}>Популярные направления</h2>
          <div className={styles.destinationsGrid}>
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={`${styles.destination} ${hoveredDestination === dest.id ? styles.destinationHovered : ''}`}
                onMouseEnter={() => setHoveredDestination(dest.id)}
                onMouseLeave={() => setHoveredDestination(null)}
              >
                <div className={styles.destinationImage}>
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    width={400}
                    height={300}
                    style={{
                      transform: hoveredDestination === dest.id ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  <div className={styles.destinationOverlay}>
                    <span className={styles.price}>{dest.price}</span>
                    <div className={styles.rating}>
                      {'★'.repeat(Math.floor(dest.rating))}
                      <span className={styles.ratingNumber}>{dest.rating}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.destinationContent}>
                  <h3>{dest.title}</h3>
                  <p>{dest.description}</p>
                  <button 
                    onClick={() => handleDestinationClick(dest.id)} 
                    className={styles.destinationCta}
                  >
                    Подробнее
                    <span className={styles.ctaArrow}>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className={styles.features}>
          <div className={styles.featureHighlight}>
            <h2>Почему выбирают нас</h2>
            <p>Мы создаем незабываемые путешествия уже более 10 лет</p>
          </div>
          <div className={styles.featureGrid}>
            <div className={`${styles.feature} ${styles.featureAnimated}`}>
              <Image src="/globe.svg" alt="Глобус" width={48} height={48} className={styles.floating} />
              <h3>Уникальные маршруты</h3>
              <p>Авторские туры и индивидуальный подход к каждому путешествию</p>
            </div>
            <div className={`${styles.feature} ${styles.featureAnimated}`}>
              <Image src="/window.svg" alt="Окно" width={48} height={48} className={styles.floating} />
              <h3>Премиум сервис</h3>
              <p>Лучшие отели, рестораны и частные гиды в каждой стране</p>
            </div>
            <div className={`${styles.feature} ${styles.featureAnimated}`}>
              <Image src="/file.svg" alt="Документ" width={48} height={48} className={styles.floating} />
              <h3>Полная поддержка</h3>
              <p>Персональный менеджер 24/7 на связи во время путешествия</p>
            </div>
          </div>
        </section>

        <section className={styles.testimonials} id="testimonials">
          <h2 className={styles.testimonialTitle}>Отзывы наших путешественников</h2>
          <div className={styles.testimonialSlider}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${styles.testimonialCard} ${
                  index === activeTestimonial ? styles.active : ''
                }`}
                style={{
                  display: index === activeTestimonial ? 'block' : 'none'
                }}
              >
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>{testimonial.author}</div>
                <div className={styles.testimonialLocation}>
                  {testimonial.location}, {testimonial.year}
                </div>
              </div>
            ))}
            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === activeTestimonial ? styles.active : ''
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Показать отзыв ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactContent}>
            <h2>Готовы к путешествию?</h2>
            <p>Оставьте заявку, и мы поможем организовать ваш идеальный отдых</p>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Ваше имя" required />
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Ваш email" required />
              </div>
              <div className={styles.formGroup}>
                <select required>
                  <option value="">Выберите направление</option>
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>{dest.title}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                Отправить заявку
                <span className={styles.buttonSpinner}></span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
