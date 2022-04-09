import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "./404Page.module.scss";

const pageTitle = "404: Page Not Found | Pokédex";
const metaDescription = "Page not found";

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={styles.container}>
        <div className={styles.container__content}>
          <div className={styles.container__main_content}>
            <h1 className={styles.container__page_title}>Page not found!</h1>
            <h3>The page you are trying to reach does not exist.</h3>
            <Link href="/">
              <a aria-label="home page link">
                <div
                  role="button"
                  className={styles.container__go_to_home_page}
                >
                  Go to Home Page
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.container__pokemon_image_container}>
            <Image
              width={276}
              height={359}
              src="https://assets.pokemon.com/static2/_ui/img/global/psyduck.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
