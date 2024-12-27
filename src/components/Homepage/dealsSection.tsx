import { getAllProductMedia } from "@/api";
import styles from "./dealsSection.module.css";
import ClientDealSectionPart from "./clientDealSectionPart";

const DealsSection = async () => {
  const res = await getAllProductMedia();

  console.log(res.productMedias);

  if (res.productMedias?.length === 0) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.videos}>
        {/* <ClientDealSectionPart data={[...res?.productMedias]} /> */}
      </div>
    </div>
  );
};

export default DealsSection;
