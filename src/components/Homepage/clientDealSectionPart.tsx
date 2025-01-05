"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./dealsSection.module.css";
import pstyles from "./deals.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/api";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";

const ClientDealSectionPart = ({ data }: any) => {
  // State variables for managing media, video index, hover state, and video playing status
  const [media, setMedia] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoPlaying, setVideoPlaying] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    // Set the inner width of the window and fetch data
    setInnerWidth(window.innerWidth);
    getData();
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.style.display = "block"; // Show the current video
      setVideoPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[currentVideoIndex] = true; // Mark the current video as playing
        return newPlaying;
      });
      currentVideo.play(); // Play the current video

      const handleEnded = () => {
        if (!isHovered) {
          playNextVideo(); // Play the next video if not hovered
        }
      };

      currentVideo.addEventListener("ended", handleEnded); // Add event listener for video end

      return () => {
        currentVideo.removeEventListener("ended", handleEnded); // Clean up event listener
      };
    }
  }, [currentVideoIndex, isHovered]);

  const playNextVideo = () => {
    if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex]!.style.display = "none"; // Hide the current video
      setVideoPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[currentVideoIndex] = false; // Mark the current video as not playing
        return newPlaying;
      });
    }
    const nextIndex = (currentVideoIndex + 1) % videoRefs.current.length; // Calculate next video index
    setCurrentVideoIndex(nextIndex); // Update current video index
  };

  const getData = async () => {
    // Fetch product data based on product IDs (currently commented out)
    // let main = data.map(async (val: any) => {
    //   let pId = val.productId;
    //   let temp = [];
    //   for (let i = 0; i < pId.length; i++) {
    //     const response = await getProductById(pId[i]);
    //     temp.push(response.product);
    //   }
    //   return { ...val, productId: temp };
    // });
  };

  const handleMouseEnter = (index: number) => {
    setIsHovered(true); // Set hover state to true
    if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex]!.pause(); // Pause the current video
      videoRefs.current[currentVideoIndex]!.style.display = "none"; // Hide the current video
      setVideoPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[currentVideoIndex] = false; // Mark the current video as not playing
        return newPlaying;
      });
    }
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.style.display = "none"; // Hide other videos
        video.pause(); // Pause other videos
      }
    });
    if (videoRefs.current[index]) {
      videoRefs.current[index]!.style.display = "block"; // Show the hovered video
      videoRefs.current[index]!.play(); // Play the hovered video
      setVideoPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = true; // Mark the hovered video as playing
        return newPlaying;
      });
    }
    setCurrentVideoIndex(index); // Update current video index to hovered index
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false
  };

  return (
    <>
      <Splide
        options={{
          perPage: innerWidth > 600 ? 5 : 2, // Set number of slides per page based on window width
          perMove: 1,
          gap: "10px",
        }}
      >
        {data.map((media: any, index: number) => {
          return (
            <SplideSlide key={index}>
              <div
                className={styles.video}
                onMouseEnter={() => handleMouseEnter(index)} // Handle mouse enter event
                onMouseLeave={() => handleMouseLeave()} // Handle mouse leave event
              >
                {!videoPlaying[index] && (
                  <Image
                    src={media?.productImageUrl || "/placeholder.jpg"} // Display product image
                    alt=""
                    height={563}
                    width={1000}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      position: "absolute",
                    }}
                  />
                )}
                <video
                  // @ts-ignore
                  ref={(el) => (videoRefs.current[index] = el)} // Reference to video element
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    display: "none",
                  }}
                  muted
                  autoPlay
                  playsInline
                >
                  <source src={media?.productVideoUrl} />
                </video>
                <ProductCard products={media.productId} shopBtn={false} />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};

const ProductCard = ({ products, shopBtn = true }: any) => {
  const [data, setData]: any = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    let temp = [];

    for (let i = 0; i < products.length; i++) {
      const response = await getProductById(products[i]); // Fetch product by ID
      temp.push(response.product); // Add product to temporary array
    }

    console.log(temp); // Log fetched products

    setData(temp); // Update state with fetched products
  };

  if (data.length === 0) return <></>; // Return empty if no data

  return (
    <div
      className={pstyles.product_card_container}
      id={"product_media_arrows"}
      style={{ cursor: "pointer" }}
    >
      <Splide
        options={{
          perPage: 1,
          perMove: 1,
          //   type: "loop",
          arrows: false,
          autoplay: false,
          height: "100%",
          pagination: true,
        }}
      >
        {data.map((product: any, index: number) => {
          return (
            <SplideSlide key={index}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  zIndex: 10000,
                  display: "flex",
                  padding: "5px",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={
                  () =>
                    router.push("/products/" + product?.seListing?.routeHandle) // Navigate to product page on click
                }
              >
                <div className={pstyles.product_image_and_text_gap}>
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={product?.mediaUrl[0] || "/placeholder.jpg"} // Display product image
                  />

                  <div style={{ lineHeight: ".9rem" }}>
                    <span
                      style={{
                        fontSize: ".8rem",
                        textTransform: "capitalize",
                        color: "white",
                      }}
                    >
                      {product.category}
                    </span>
                    <h2 className={pstyles.product_heading}>{product.title}</h2>
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default ClientDealSectionPart; // Export the component
