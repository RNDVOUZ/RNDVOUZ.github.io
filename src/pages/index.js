import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const Typewriter = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCaret, setShowCaret] = useState(0);
  const [isClearing, setIsClearing] = useState(false);
  
  useEffect(() => {
    let currentIndex = 0;
    let calledWait = false;
    const delay = (milliseconds) => {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    };
    
    async function waitToClear() {
      await delay(5000);
      setIsClearing(true);
    }

    async function typeText() {
      if (isClearing) {
        if (currentIndex < text.length) {
          setDisplayedText((prevText) => prevText.slice(0, -1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          await delay(1000);
          setIsClearing(false);
        }
      } else if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex+1));
        currentIndex++;
      } else {
        // Start clearing after typing is complete
        clearInterval(typingInterval);
        await delay(5000);
        setIsClearing(true);
      }
    };
    
    const typingInterval = setInterval(typeText, speed);

    // Blink the caret
    const caretInterval = setInterval(() => {
      setShowCaret((prevShowCaret) => 1 - prevShowCaret);
    }, 280);
    // Clear intervals when component unmounts
    return () => {
      clearInterval(typingInterval);
      clearInterval(caretInterval);
    };
  }, [isClearing]);
  
  return (
    <span>
      {displayedText}
      {<span className="cursor" style={{opacity: showCaret}}>|</span>}
    </span>
  );
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{flex: "1"}}>
      <div className="container">
        <h1 className="hero__title main-title">{siteConfig.title}</h1>
        <div className="type_container">
          <p className="hero__subtitle sub-title">
            <Typewriter text={siteConfig.tagline} speed={70} />  
          </p>
        </div>  
        <div className={styles.buttons}>
          <Link
            className="button button--lg mybutton"
            to="/docs/intro">
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="RNDVOUZ is a Flutter-powered mobile application that revolutionizes the way people trade clothes. With a simple swipe interface, users can quickly browse through a curated selection of clothing items from others in their community. Swipe right to express interest, or swipe left to pass on items. When two users mutually like each other's clothing, a match is made, enabling them to connect and arrange a convenient swap.">
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
