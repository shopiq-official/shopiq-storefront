"use client";
import { convertParamsIntoBrowserQuery } from "@/lib/convertParamsIntoBrowserQuery";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import DropIcon from "@/assets/Icons/dropDown.svg";

import styles from "./filter.module.css";

export const FilterSection = ({
  title,
  data,
  value = "",
  params,
  type,
}: {
  title: string;
  data: string[];
  value: string;
  params: Record<string, any>;
  type?: string;
}) => {
  type ListProp = {
    title: string;
    value: boolean;
  };

  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [list, setList] = useState<ListProp[]>([]);

  useEffect(() => {
    const temp: ListProp[] = [];

    data.forEach((v: string) => {
      temp.push({ title: v, value: checkedValue(v) });
    });
    setList([...temp]);
  }, [params[value]]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, v: string) => {
    let temp_params = params;

    if (params[value]) {
      if (Array.isArray(params[value])) {
        if (params[value].indexOf(v) === -1) {
          temp_params[value].push(v);
          const query = convertParamsIntoBrowserQuery(temp_params);
          router.push(`/products?${query}`);
        } else {
          temp_params[value].splice(params[value].indexOf(v), 1);
          const query = convertParamsIntoBrowserQuery(temp_params);
          router.push(`/products?${query}`);
        }
      } else {
        if (params[value] === v) {
          delete temp_params[value];
          const query = convertParamsIntoBrowserQuery(temp_params);
          router.push(`/products?${query}`);
        } else {
          temp_params[value] = [temp_params[value], v];
          const query = convertParamsIntoBrowserQuery(temp_params);
          router.push(`/products?${query}`);
        }
      }
    } else {
      temp_params[value] = [v];
      const query = convertParamsIntoBrowserQuery(temp_params);
      router.push(`/products?${query}`);
    }
  };

  const checkedValue = (v: string) => {
    if (params[value]) {
      if (Array.isArray(params[value])) {
        return params[value].indexOf(v) !== -1;
      } else {
        return params[value] === v;
      }
    } else {
      return false;
    }
  };

  return (
    <div className={styles.section}>
      <div
        className={styles.section_head}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>{title}</p>
        <DropIcon className={open ? styles.svg_open : ""} />
      </div>
      <ul
        className={`${styles.section_body} ${open && styles.section_body_open}`}
      >
        {list.map((v: ListProp, i: number) => {
          return (
            <li key={i}>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, v.title)
                }
                type="checkbox"
                id={`${v}:${i}`}
                checked={v.value}
              />
              <label
                htmlFor={`${v}:${i}`}
                style={{ textTransform: "capitalize" }}
              >
                {v.title}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const FilterSectionPrice = ({
  title,
  data,
  params,
}: {
  title: string;
  data: { maxPrice: number; minPrice: number };
  params: Record<string, string>;
}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [current, setCurrent] = useState(params?.price || "");

  useEffect(() => {
    setCurrent(params?.price || "");
  }, [params?.price]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp_params: Record<string, string> = params;

    if (params?.price) {
      if (params?.price === e.target.id) {
        delete temp_params.price;
      } else {
        temp_params.price = e.target.id;
      }
    } else {
      temp_params.price = e.target.id;
    }

    const query = convertParamsIntoBrowserQuery(temp_params);
    router.push(`/products?${query}`);
  };

  return (
    <div className={styles.section}>
      <div
        className={styles.section_head}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>{title}</p>
        <DropIcon className={open ? styles.svg_open : ""} />
      </div>
      <ul
        className={`${styles.section_body} ${open && styles.section_body_open}`}
      >
        <li>
          <input
            id="under-999"
            type="checkbox"
            onChange={handleChange}
            checked={current === "under-999"}
          />
          <label htmlFor="under-999">Under Rs.999</label>
        </li>
        <li>
          <input
            onChange={handleChange}
            id="999"
            type="checkbox"
            checked={current === "999"}
          />
          <label htmlFor="999">Rs.999</label>
        </li>
        <li>
          <input
            onChange={handleChange}
            id="999-1499"
            type="checkbox"
            checked={current === "999-1499"}
          />
          <label htmlFor="999-1499">Rs.999 - Rs.1499</label>
        </li>
        <li>
          <input
            onChange={handleChange}
            id="1499-1999"
            type="checkbox"
            checked={current === "1499-1999"}
          />
          <label htmlFor="1499-1999">Rs.1499 - Rs.1999</label>
        </li>
        <li>
          <input
            onChange={handleChange}
            id="above-1999"
            type="checkbox"
            checked={current === "above-1999"}
          />
          <label htmlFor="above-1999">Above Rs.1999</label>
        </li>
      </ul>
    </div>
  );
};
