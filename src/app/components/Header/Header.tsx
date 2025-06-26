'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { getCurrentUser, logout } from '../../utils/auth';
import type { User } from '../../types/user';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
        Летучка
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Главная
          </Link>
          <Link href="/tours" className={styles.navLink}>
            Туры
          </Link>
          <Link href="/about" className={styles.navLink}>
            О нас
          </Link>
          <Link href="/contacts" className={styles.navLink}>
            Контакты
          </Link>
        </nav>
        <div className={styles.actions}>
          {user ? (
            <div className={styles.profileContainer}>
              <button onClick={handleProfileClick} className={styles.profileButton}>
                <FaUserCircle className={styles.profileIcon} />
                <span className={styles.userName}>{user.name}</span>
              </button>
              {isMenuOpen && (
                <div className={styles.profileMenu}>
                  <Link href="/profile" className={styles.menuItem}>
                    <FaUserCircle />
                    <span>Профиль</span>
                  </Link>
                  <button onClick={handleLogout} className={styles.menuItem}>
                    <IoLogOutOutline />
                    <span>Выйти</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.actionButton}>
                Войти
              </Link>
              <Link href="/register" className={styles.actionButton}>
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 