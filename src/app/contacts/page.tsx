'use client'

import { useState } from 'react';
import styles from './contacts.module.css';
import Image from 'next/image';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contacts() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.contactsPage}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Свяжитесь с нами</h1>
            <p className={styles.subtitle}>
              Мы всегда рады помочь вам спланировать идеальное путешествие
            </p>
          </div>
        </section>

        <div className={styles.contentWrapper}>
          <section className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/location.svg"
                  alt="Адрес"
                  width={24}
                  height={24}
                />
              </div>
              <h3>Наш адрес</h3>
              <p>ул. Примерная, 123</p>
              <p>г. Москва, 123456</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/phone.svg"
                  alt="Телефон"
                  width={24}
                  height={24}
                />
              </div>
              <h3>Телефон</h3>
              <p>+7 (999) 123-45-67</p>
              <p>Пн-Пт: 9:00 - 20:00</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Image
                  src="/email.svg"
                  alt="Email"
                  width={24}
                  height={24}
                />
              </div>
              <h3>Email</h3>
              <p>info@travel.com</p>
              <p>support@travel.com</p>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.formWrapper}>
              <h2>Напишите нам</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Телефон"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ваше сообщение"
                    required
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Отправить сообщение
                </button>

                {isSubmitted && (
                  <div className={styles.successMessage}>
                    Спасибо! Ваше сообщение отправлено.
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>

        <section className={styles.socialSection}>
          <h2>Мы в социальных сетях</h2>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <Image
                src="/vk.svg"
                alt="VK"
                width={32}
                height={32}
              />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image
                src="/telegram.svg"
                alt="Telegram"
                width={32}
                height={32}
              />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={32}
                height={32}
              />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 