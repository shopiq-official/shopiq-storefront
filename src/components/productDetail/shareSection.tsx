"use client";

import { useState } from "react";
import ExportIcon from "@/assets/Icons/export.svg";
import styles from "./shareSection.module.css";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { usePathname } from "next/navigation";

const ShareSection = () => {
  const [modal, setModal] = useState(false);
  const pathname = usePathname();
  const [copied, setcopied] = useState(false);

  const pId = pathname.split("/").splice(-1);

  const shareUrl = process.env.NEXT_PUBLIC_WEBSITE_URL + `/products/${pId}`;
  const title = process.env.NEXT_PUBLIC_WEBSITE_NAME_FOR_TITLE;

  const copyToClipBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setcopied(true);
  };

  return (
    <>
      <span className={styles.share_container}>
        <span onClick={() => setModal((prev: boolean) => !prev)}>
          <ExportIcon />
        </span>
        {modal && (
          <div
            className={styles.share_main_model}
            onClick={() => setModal((prev: boolean) => !prev)}
          >
            <div className={styles.share_modal}>
              <div>
                <FacebookShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <FacebookIcon size={22} round />
                  <p>Facebook</p>
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <XIcon size={22} round />
                  <p>Twitter</p>
                </TwitterShareButton>
              </div>
              <div>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <WhatsappIcon size={22} round />
                  <p>Whats App</p>
                </WhatsappShareButton>
              </div>
              <div onClick={copyToClipBoard}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Interface / Link">
                    <path
                      id="Vector"
                      d="M9.1718 14.8288L14.8287 9.17192M7.05086 11.293L5.63664 12.7072C4.07455 14.2693 4.07409 16.8022 5.63619 18.3643C7.19829 19.9264 9.7317 19.9259 11.2938 18.3638L12.7065 16.9498M11.2929 7.05L12.7071 5.63579C14.2692 4.07369 16.8016 4.07397 18.3637 5.63607C19.9258 7.19816 19.9257 9.73085 18.3636 11.2929L16.9501 12.7071"
                      stroke="var(--body)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>

                {copied ? (
                  <p style={{ color: "var(--primary)" }}>Link Copied</p>
                ) : (
                  <p>Copy Link</p>
                )}
              </div>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default ShareSection;
