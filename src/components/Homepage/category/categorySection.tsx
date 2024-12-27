import React, { Suspense } from 'react'
import styles from './categorySection.module.css'
import { getCategories } from '@/api';
import Link from 'next/link';
import Image from 'next/image';
import { capitalize } from '@/lib/capitalize';
import CategoryCarousel from './categoryCarousel';

const CategorySection = async() => {
    const category = await getCategories();
  return (
    <div className={styles.categories_div}>
      <div className={styles.category_head}>
        <h1>Categories</h1>
      </div>
      <CategoryCarousel data={category?.slice(0,10)} />
      {category?.length > 10 && <CategoryCarousel data={category?.slice(10,20)} />}
      {/* </div> */}
    </div>
  );
}

export default CategorySection