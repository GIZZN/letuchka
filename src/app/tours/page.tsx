'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './tours.module.css';
import Image from 'next/image';
import { getCurrentUser, updateUser } from '../utils/auth';
import type { Tour, User } from '../types/user';

const tours: Tour[] = [
  {
    id: 1,
    title: "Магия Бали",
    description: "Откройте для себя тропический рай с белоснежными пляжами, древними храмами и захватывающими рисовыми террасами.",
    price: "от 120 000 ₽",
    duration: "12 дней",
    image: "/bali.jpg",
    category: 'exotic',
    features: ["Все включено", "Персональный гид", "Спа-процедуры", "Экскурсии"]
  },
  {
    id: 2,
    title: "Очарование Парижа",
    description: "Погрузитесь в романтическую атмосферу города любви, искусства и изысканной кухни.",
    price: "от 95 000 ₽",
    duration: "7 дней",
    image: "/paris.jpg",
    category: 'europe',
    features: ["Завтраки", "Экскурсии", "Речной круиз", "Дегустации"]
  },
  {
    id: 3,
    title: "Мальдивский рай",
    description: "Насладитесь безмятежным отдыхом в роскошных виллах над кристально чистой водой.",
    price: "от 180 000 ₽",
    duration: "10 дней",
    image: "/maldives.jpg",
    category: 'popular',
    features: ["Премиум всё включено", "Спа-центр", "Водные виды спорта", "Трансфер"]
  },
  {
    id: 4,
    title: "Солнечная Греция",
    description: "Погрузитесь в греческий колорит, сияющие белоснежные пляжи и древние руины.",
    price: "от 150 000 ₽",
    duration: "14 дней",
    image: "/greece.jpg",
    category: 'popular',
    features: ["Все включено", "Экскурсии", "Рестораны", "Спа-процедуры"]
  },
  {
    id: 5,
    title: "Магическая Италия",
    description: "Погрузитесь в романтическую атмосферу Италии, с ее древними городами и удивительными памятниками.",
    price: "от 120 000 ₽",
    duration: "10 дней",
    image: "/italy.jpg",
    category: 'europe',
    features: ["Все включено", "Экскурсии", "Рестораны", "Спа-процедуры"]
  },
  {
    id: 6,
    title: "Экзотический Таиланд",
    description: "Насладитесь безмятежным отдыхом на белоснежных пляжах Таиланда, с его удивительными водопадами и древней культурой.",
    price: "от 180 000 ₽",
    duration: "12 дней",
    image: "/thailand.jpg",
    category: 'europe',
    features: ["Все включено", "Экскурсии", "Рестораны", "Спа-процедуры"]
  },

  {
    id: 7,
    title: "Солнечная Греция",
    description: "Погрузитесь в греческий колорит, сияющие белоснежные пляжи и древние руины.",
    price: "от 180 000 ₽",
    duration: "12 дней",
    image: "/greece.jpg",
    category: 'popular',
    features: ["Все включено", "Экскурсии", "Рестораны", "Спа-процедуры"]
  },
];

function ToursContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'exotic' | 'europe'>('all');
  const [hoveredTour, setHoveredTour] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const category = searchParams.get('category');
    if (category) {
      const categoryMap: { [key: string]: 'popular' | 'exotic' | 'europe' } = {
        'солнечная греция': 'europe',
        'магическая италия': 'europe',
        'экзотический таиланд': 'exotic'
      };
      
      const mappedCategory = categoryMap[category];
      if (mappedCategory) {
        setActiveCategory(mappedCategory);
      }
    }
  }, [searchParams]);

  const filteredTours = activeCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  const handleBooking = (tour: Tour) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setBookingTour(tour);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (!user || !bookingTour) return;

    const bookedTour = {
      ...bookingTour,
      bookingDate: new Date().toISOString()
    };

    const updatedUser = {
      ...user,
      bookedTours: [...(user.bookedTours || []), bookedTour]
    };

    try {
      updateUser(updatedUser);
      setUser(updatedUser);
      setShowBookingModal(false);
      router.push('/profile');
    } catch (error) {
      console.error('Error booking tour:', error);
    }
  };

  return (
    <div className={styles.toursPage}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Наши туры</h1>
            <p className={styles.subtitle}>
              Откройте для себя удивительные направления и незабываемые впечатления
            </p>
          </div>
        </section>

        <section className={styles.categories}>
          <div className={styles.categoryButtons}>
            <button
              className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Все туры
            </button>
            <button
              className={`${styles.categoryButton} ${activeCategory === 'popular' ? styles.active : ''}`}
              onClick={() => setActiveCategory('popular')}
            >
              Популярные
            </button>
            <button
              className={`${styles.categoryButton} ${activeCategory === 'exotic' ? styles.active : ''}`}
              onClick={() => setActiveCategory('exotic')}
            >
              Экзотика
            </button>
            <button
              className={`${styles.categoryButton} ${activeCategory === 'europe' ? styles.active : ''}`}
              onClick={() => setActiveCategory('europe')}
            >
              Европа
            </button>
          </div>
        </section>

        <section className={styles.toursGrid}>
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className={`${styles.tourCard} ${hoveredTour === tour.id ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredTour(tour.id)}
              onMouseLeave={() => setHoveredTour(null)}
            >
              <div className={styles.tourImageWrapper}>
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className={styles.tourImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.tourContent}>
                <h3 className={styles.tourTitle}>{tour.title}</h3>
                <p className={styles.tourDescription}>{tour.description}</p>
                <div className={styles.tourDetails}>
                  <span className={styles.tourPrice}>{tour.price}</span>
                  <span className={styles.tourDuration}>{tour.duration}</span>
                </div>
                <div className={styles.tourFeatures}>
                  {tour.features.map((feature, index) => (
                    <span key={index} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>
                <button 
                  className={styles.bookButton}
                  onClick={() => handleBooking(tour)}
                >
                  Забронировать
                </button>
              </div>
            </div>
          ))}
        </section>

        {showBookingModal && bookingTour && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Подтверждение бронирования</h2>
              <div className={styles.modalContent}>
                <h3>{bookingTour.title}</h3>
                <p>Стоимость: {bookingTour.price}</p>
                <p>Длительность: {bookingTour.duration}</p>
                <div className={styles.modalButtons}>
                  <button 
                    className={styles.confirmButton}
                    onClick={confirmBooking}
                  >
                    Подтвердить
                  </button>
                  <button 
                    className={styles.cancelButton}
                    onClick={() => setShowBookingModal(false)}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className={styles.callToAction}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Готовы к путешествию?</h2>
            <p className={styles.ctaText}>
              Свяжитесь с нами, и мы поможем организовать ваш идеальный отдых
            </p>
            <button className={styles.ctaButton}>
              Связаться с нами
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Tours() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToursContent />
    </Suspense>
  );
} 