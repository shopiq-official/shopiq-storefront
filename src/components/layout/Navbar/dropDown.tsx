import Link from "next/link";
import styles from "./navbar.module.css";

type Props = {
  title: string;
  categories: string[];
};

export const NavDropDown = ({ title, categories }: Props) => {
  return (
    <li className={styles.dropdown}>
      <Link
        aria-label="nav drop menu"
        style={{ textTransform: "capitalize" }}
        href={`/${title}/`}
      >
        {title}
      </Link>
      <span className={styles.list_items}>
        {categories?.map((val: any, index: any) => {
          return (
            <Link
              aria-label="nav drop menu"
              key={index}
              href={`/${title}/${val}`}
              style={{ textTransform: "capitalize" }}
            >
              {val}
            </Link>
          );
        })}
      </span>
    </li>
  );
};
