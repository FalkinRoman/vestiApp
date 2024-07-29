import React, { useEffect, useState } from "react";
import st from "./ModalInfo.module.css";
import ButtonClose from "../UI/Buttons/ButtonClose/ButtonClose";
import { useFetching } from "../../hooks/useFetching";
import PersonServices from "../../API/PersonServices";
import parse from "html-react-parser";
import Loader from "../UI/Loader/Loader";

const ModalInfo = ({ person, setVisible }) => {
  const [personDetails, setPersonDetails] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [fetchPersonDetails, isLoading, isError] = useFetching(async () => {
    setTimeout(() => {}, 5000);
    const personInfo = await PersonServices.getPerson(person.id);
    setPersonDetails(personInfo);
  });

  useEffect(() => {
    if (person) {
      setPersonDetails(null);
      fetchPersonDetails();
    }
  }, [person]);

  if (!person) {
    return null;
  }

  // Функция для обрезки текста до 200 символов, сохраняя целостность HTML-тегов
  const truncateHTML = (html, maxLength) => {
    let trimmedString = html.substring(0, maxLength);
    // Обрезаем на последнем пробеле
    trimmedString = trimmedString.substring(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    return trimmedString + "...";
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={st.box}>
      <ButtonClose setVisible={setVisible} />
      <div className={st.box2}>
        <img
          src={`https://api.smotrim.ru/api/v1/pictures/${person.picId}/bq/redirect`}
          alt={`${person.name} ${person.surname}`}
        />
        <h4>
          {person.name} {person.surname}
        </h4>
      </div>
      {isLoading && <Loader />}
      {isError && <p>Ошибка запроса: {isError}</p>}
      {personDetails && (
        <div className={st.textContainer}>
          {isExpanded
            ? parse(personDetails.data.body)
            : parse(truncateHTML(personDetails.data.body, 300))}
          <button onClick={handleToggleExpand} className={st.toggleButton}>
            {isExpanded ? "Показать меньше" : "Показать еще"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalInfo;
