import styles from "./loading.module.css";

const ProductDetailPageLoading = () => {
  return (
    <div className={styles.product_container}>
      <div className={`${styles.product_image} ${styles.skeleton}`}></div>
      <div className={`${styles.product_content}`}>
        <p></p>
        <h1></h1>
        <div>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <h1></h1>
        <h5></h5>
        <h1>
          <h1></h1>
        </h1>
      </div>
    </div>
  );
};

export default ProductDetailPageLoading;
