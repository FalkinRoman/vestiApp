import React, { useState, useEffect } from "react";
import ButtonBack from "./UI/Buttons/ButtonsCarousel/ButtonBack/ButtonBack";
import ButtonNext from "./UI/Buttons/ButtonsCarousel/ButtonNext/ButtonNext";

const Carousel = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [itemWidth, setItemWidth] = useState(160); // Начальное значение
  const [itemMargin, setItemMargin] = useState(20); // Начальное значение

  useEffect(() => {
    const calculateVisibleItems = () => {
      const carouselWidth =
        document.querySelector(".carousel-content").clientWidth;
      setItemWidth(
        window.innerWidth <= 422 ? 120 : window.innerWidth <= 579 ? 140 : 160
      );
      setItemMargin(
        window.innerWidth <= 422 ? 6 : window.innerWidth <= 579 ? 8 : 20
      );
      const itemsCount = Math.floor(carouselWidth / (itemWidth + itemMargin));
      setVisibleItems(itemsCount);
    };

    calculateVisibleItems();
    window.addEventListener("resize", calculateVisibleItems);

    return () => {
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, [itemWidth, itemMargin]);

  const handleNext = () => {
    if (currentIndex < items.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel">
      {currentIndex > 0 && <ButtonBack onClick={handlePrev} />}
      <div className="carousel-content">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${
              currentIndex * (itemWidth + itemMargin)
            }px)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-item"
              onClick={() => onItemClick(item)}
            >
              <img
                src={`https://api.smotrim.ru/api/v1/pictures/${item.picId}/bq/redirect`}
                alt={`${item.firstName} ${item.lastName}`}
              />
              <p>{`${item.name}`}</p>
              <p style={{ marginTop: 3 }}>{`${item.surname}`}</p>
            </div>
          ))}
        </div>
      </div>
      {currentIndex < items.length - visibleItems && (
        <ButtonNext onClick={handleNext} />
      )}
    </div>
  );
};

export default Carousel;
