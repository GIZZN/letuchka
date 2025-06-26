'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';
import { login } from '../utils/auth';
import type { LoginData } from '../types/user';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Вход в аккаунт</h1>
          <p className={styles.subtitle}>
            Войдите, чтобы получить доступ к вашим путешествиям
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Введите ваш email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Введите пароль"
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitButton}>
              Войти
            </button>

            <div className={styles.registerLink}>
              Нет аккаунта?{' '}
              <Link href="/register">
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>

        <div className={styles.welcomeSection}>
          <h2>Добро пожаловать!</h2>
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🌟</div>
              <h3>Эксклюзивные предложения</h3>
              <p>Доступ к специальным ценам и акциям для участников</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>📅</div>
              <h3>История поездок</h3>
              <p>Отслеживайте все ваши бронирования в одном месте</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>💝</div>
              <h3>Бонусная программа</h3>
              <p>Накапливайте баллы и обменивайте их на путешествия</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 