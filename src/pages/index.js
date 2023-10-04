import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  let subtitle_length = 0;
  
  let clearId;

  function type() {
    let subtitle = siteConfig.tagline;
    let subtitle_obj = document.getElementById("caption");
    if(subtitle_length <= subtitle.length) {
      subtitle_obj.innerHTML = subtitle.substring(0, subtitle_length);
      subtitle_length++;
    }
    else {
      clearInterval(typeId);
      setTimeout(callClear, 5000);
    }
  }

  function callClear() {
    clearId = setInterval(clear, 50);
  }

  function callType() {
    typeId = setInterval(type, 70);
  }
  function clear() {
    let subtitle = siteConfig.tagline;
    let subtitle_obj = document.getElementById("caption");
    if(subtitle_length > 0) {
      subtitle_length--;
      subtitle_obj.innerHTML = subtitle.substring(0, subtitle_length);
    }
    else {
      clearInterval(clearId);
      setTimeout(callType, 800);
    }
  } 

  useEffect(() => {
    let typeId = setInterval(type, 70);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title main-title">{siteConfig.title}</h1>
        <div className="type_container">
          <p className="hero__subtitle sub-title">
            <span id="caption"></span>
            <span className="cursor">|</span>
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
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
