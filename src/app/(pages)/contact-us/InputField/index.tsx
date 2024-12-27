// "use client";

import styles from "./inputField.module.css";
import Lock from "@/assets/Icons/lock.svg";

type Props = {
  type: string;
  value: string;
  isLocked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const InputField = (props: Props) => {
  return (
    <div className={styles.field_container}>
      <input
        className={styles.field}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={props?.onFocus}
        onBlur={props?.onBlur}
      />
      {props.isLocked ? (
        <div className={styles.lock}>
          <div>
            <Lock />
            <div className={styles.tooltip}>
              Email address cannot be edited.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
