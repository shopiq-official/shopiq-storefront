"use client";

import { useEffect, useState } from "react";

import styles from "./filterMobile.module.css";
import { getFilterData } from "@/api";
import { convertParamsIntoBrowserQuery } from "@/lib/convertParamsIntoBrowserQuery";
import { useRouter } from "next/navigation";

export const FilterMobile = ({ params, filterData }: any) => {
  const [openfilterModal, setopenfilterModal] = useState(false);
  const [smSelected, setSmSelected] = useState<any>(params);
  const [data, setData]: any = useState({});
  const [activeFilter, setactiveFilter] = useState<any>(0);

  const router = useRouter();

  const addToQuery = (s: any) => {
    router.push(`/products?${convertParamsIntoBrowserQuery(s)}`);
  };

  const handleClearAll = () => {};

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const {
      categories,
      collections,
      maxPrice,
      minPrice,
      variants,
      specifications,
    } = filterData;

    setData([
      {
        _id: "category",
        options_value: categories,
        options_name: "Categories",
      },
      {
        _id: "Price",
        options_value: [
          "Under Rs. 999",
          "Rs. 999",
          "Rs. 999 - Rs. 1499",
          "Rs. 1499 - Rs. 1999",
          "Above Rs. 1999",
        ],
        options_name: "Price",
      },
      {
        _id: "variant-size",
        options_value: variants.size,
        options_name: "Size",
      },
      {
        _id: "collectionName",
        options_value: collections,
        options_name: "Collections",
      },
      ...Object.keys(specifications).map((key) => {
        return {
          _id: "specification-" + key,
          options_value: specifications[key],
          options_name: key,
        };
      }),
    ]);
  };

  const handleselect = (e: any) => {
    var { name, value } = e.target;

    // first we will check if the name exists in the smSelected

    if (smSelected[name]) {
      // if value already exists
      if (smSelected[name].includes(value)) {
        let i = smSelected[name].indexOf(value);
        let temp = smSelected[name];
        temp.splice(i, 1);
        setSmSelected((prev: any) => ({ ...prev, [name]: temp }));
      } else {
        setSmSelected((prev: any) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      }
    } else {
      let n = "";
      if (name === "Categories") {
        n = "category";
      }

      setSmSelected((prev: any) => ({ ...prev, [name]: [value] }));
    }

    // let temp = { ...selectedData };
    let temp: any = {};

    if (e.target.checked) {
      temp[name]
        ? (temp[name] = [...temp[name], value])
        : (temp[name] = [value]);
    } else {
      let dum = temp[name];

      dum.splice(temp[name].indexOf(value), 1);
      temp[name] = dum;
    }
  };

  const displaySmFilter = () => {
    var filters = data[activeFilter];
    var filtervalue = filters.options_name;

    return (
      <div className={styles.new_filter}>
        {filters?.options_value?.map((val: any, index: any) => {
          return (
            <span key={index}>
              <input
                type="checkbox"
                name={data[activeFilter]?._id}
                value={val}
                onChange={handleselect}
                checked={
                  smSelected[data[activeFilter]?._id]?.includes(val) || false
                }
              />
              <p style={{ textTransform: "capitalize", fontSize: ".9rem" }}>
                {val}
              </p>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {openfilterModal ? (
        <div className={styles.filter_button_open}>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              background: "white",
            }}
          >
            <p
              style={{
                flex: 1,
                textAlign: "center",
                border: "1px solid var(--primary)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                fontSize: "1.1rem",
              }}
              onClick={() => setopenfilterModal((prev: any) => !prev)}
            >
              CLOSE
            </p>
            <p
              style={{
                flex: 1,
                textAlign: "center",
                border: "1px solid var(--primary)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                borderLeft: "none",
                fontSize: "1.1rem",
              }}
              onClick={() => {
                addToQuery(smSelected);
                setopenfilterModal(false);
              }}
            >
              APPLY
            </p>
          </span>
        </div>
      ) : (
        <div
          className={styles.filter_button}
          onClick={() => setopenfilterModal((prev: any) => !prev)}
        >
          <span>
            <p>Filter</p>
          </span>
        </div>
      )}

      {openfilterModal && (
        <div className={styles.filter_modal_main}>
          <div className={styles.filter_modal_top}>
            <p style={{ fontSize: "1.1rem" }}>Filters</p>
            <p onClick={() => handleClearAll()} style={{ fontSize: "1.1rem" }}>
              Clear All
            </p>
          </div>
          <div className={styles.main_filter_container}>
            <div className={styles.filter_items}>
              {data?.map((val: any, index: any) => {
                return (
                  <h5 key={index} onClick={() => setactiveFilter(index)}>
                    {val?.options_name}
                  </h5>
                );
              })}
            </div>

            <div className={styles.selected_filter}>{displaySmFilter()}</div>
          </div>
        </div>
      )}
    </>
  );
};
