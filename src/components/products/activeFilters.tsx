"use client";
import Link from "next/link";
import styles from "./activeFilters.module.css";
import CloseIcon from "@/assets/Icons/cross.svg";
import { convertParamsIntoQuery } from "@/lib/convertParamsIntoQuery";
import { useRouter } from "next/navigation";
import { convertParamsIntoBrowserQuery } from "@/lib/convertParamsIntoBrowserQuery";

export const ActiveFilters = ({ params }: any) => {
  let params_key = Object.keys(params).filter((v) => v !== "page");
  const router = useRouter();

  if (params_key.length === 0) return <></>;

  const handleRemove = (e: any) => {
    const p_for = e.target.getAttribute("data-for");
    const temp_params = params;

    if (Array.isArray(params[p_for])) {
      temp_params[p_for].splice(e.target.getAttribute("data-index"), 1);
    } else {
      delete temp_params[p_for];
    }

    const p = convertParamsIntoBrowserQuery(temp_params);

    router.push(`/products?${p}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>Active Filters</p>
        <Link href="/products">Clear All</Link>
      </div>
      <div className={styles.filter_list}>
        {params_key.map((v: any, i: any) => {
          if (Array.isArray(params[v]))
            return (
              <>
                {params[v]?.map((vv: any, ii: any) => {
                  return (
                    <div
                      key={ii}
                      onClick={handleRemove}
                      data-for={v}
                      data-index={ii}
                    >
                      {params[v][ii]}
                      <CloseIcon data-for={v} data-index={ii} />
                    </div>
                  );
                })}
              </>
            );
          return (
            <div
              key={i}
              data-for={v}
              data-data={params[v]}
              onClick={handleRemove}
            >
              {params[v]}
              <CloseIcon data-for={v} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
