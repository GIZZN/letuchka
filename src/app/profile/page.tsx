'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './profile.module.css';
import { getCurrentUser, updateUser, logout } from '../utils/auth';
import type { User } from '../types/user';
import { FaCalendarAlt } from 'react-icons/fa';

type PreferenceKey = 'notifications' | 'newsletter' | 'theme';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
    });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = updateUser({
        ...user,
        ...formData,
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key: PreferenceKey) => {
    if (!user?.preferences) return;

    try {
      const updatedUser = updateUser({
        ...user,
        preferences: {
          ...user.preferences,
          [key]: !user.preferences[key]
        }
      });
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <Image
                src={user.avatar || '/default-avatar.svg'}
                alt={user.name}
                width={120}
                height={120}
                className={styles.avatar}
              />
            </div>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2>Личные данные</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editButton}
              >
                {isEditing ? 'Отменить' : 'Редактировать'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Имя</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Телефон</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className={styles.saveButton}>
                  Сохранить изменения
                </button>
              </form>
            ) : (
              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Имя:</span>
                  <span>{user.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Телефон:</span>
                  <span>{user.phone || 'Не указан'}</span>
                </div>
              </div>
            )}
          </section>

          <section className={styles.profileSection}>
            <h2>Мои туры</h2>
            <div className={styles.toursGrid}>
              {user.bookedTours && user.bookedTours.length > 0 ? (
                user.bookedTours.map((tour) => (
                  <div key={`${tour.id}-${tour.bookingDate}`} className={styles.tourCard}>
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
                      <h3>{tour.title}</h3>
                      <div className={styles.tourDetails}>
                        <span className={styles.tourPrice}>{tour.price}</span>
                        <span className={styles.tourDuration}>{tour.duration}</span>
                      </div>
                      {tour.bookingDate && (
                        <div className={styles.bookingDate}>
                          <FaCalendarAlt />
                          <span>Забронировано: {formatDate(tour.bookingDate)}</span>
                        </div>
                      )}
                      <div className={styles.tourFeatures}>
                        {tour.features.map((feature, index) => (
                          <span key={index} className={styles.feature}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyState}>
                  У вас пока нет забронированных туров
                </p>
              )}
            </div>
          </section>

          <section className={styles.profileSection}>
            <h2>Настройки</h2>
            <div className={styles.preferences}>
              <div className={styles.preferenceItem}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={user.preferences?.notifications}
                    onChange={() => handlePreferenceChange('notifications')}
                  />
                  <span className={styles.slider}></span>
                </label>
                <div className={styles.preferenceInfo}>
                  <h3>Уведомления</h3>
                  <p>Получать уведомления о новых предложениях</p>
                </div>
              </div>

              <div className={styles.preferenceItem}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={user.preferences?.newsletter}
                    onChange={() => handlePreferenceChange('newsletter')}
                  />
                  <span className={styles.slider}></span>
                </label>
                <div className={styles.preferenceInfo}>
                  <h3>Рассылка</h3>
                  <p>Подписка на email-рассылку с новостями</p>
                </div>
              </div>
            </div>
          </section>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
} 