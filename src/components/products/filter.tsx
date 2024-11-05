import styles from "./filter.module.css";
import DropIcon from "@/assets/Icons/dropDown.svg";
import { useRouter } from "next/navigation";
import { convertParamsIntoBrowserQuery } from "@/lib/convertParamsIntoBrowserQuery";
import { getFilterData } from "@/api";
import { FilterSection, FilterSectionPrice } from "./filterSections";
import { ActiveFilters } from "./activeFilters";

export const Filter = async ({ params, data }: any) => {
  const {
    categories,
    collections,
    maxPrice,
    minPrice,
    variants,
    specifications,
  } = await getFilterData();

  return (
    <div className={styles.container}>
      <ActiveFilters params={params} />
      <div className={styles.main}>
        {categories && (
          <FilterSection
            title="Categories"
            value={"category"}
            data={categories}
            params={params}
          />
        )}

        {maxPrice && minPrice && (
          <FilterSectionPrice
            title="Price"
            data={{ maxPrice: maxPrice, minPrice: minPrice }}
            params={params}
          />
        )}

        {variants &&
          Object.keys(variants).length !== 0 &&
          Object.keys(variants)
            .filter((v) => v.toLowerCase() === "size")
            .map((v: any, i: any) => {
              return (
                <FilterSection
                  type="variant"
                  title={v}
                  value={`variant-${v}`}
                  data={variants[v]}
                  key={i}
                  params={params}
                />
              );
            })}

        {collections && (
          <FilterSection
            title="collections"
            value="collectionName"
            data={collections}
            params={params}
          />
        )}

        {specifications &&
          Object.keys(specifications).length !== 0 &&
          Object.keys(specifications).map((v: any, i: any) => {
            return (
              <FilterSection
                type="specification"
                value={`specification-${v}`}
                title={v}
                key={i}
                data={specifications[v]}
                params={params}
              />
            );
          })}
      </div>
    </div>
  );
};
