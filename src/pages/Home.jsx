import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import PersonServices from "../API/PersonServices";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import ModalInfo from "../components/ModalInfo/ModalInfo";

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [Modal, setModal] = useState(false);
  const isFetched = useRef(false);
  const [fetching, isLoading, isError] = useFetching(async () => {
    const person = await PersonServices.getAll();
    setPersons(person.content[11].content);
  });

  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;
      fetching();
    }
  }, []);

  const handleItemClick = (person) => {
    setSelectedPerson(person);
    setModal(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="error-box">
        <b>Ошибка загрузки данных: </b>
        {isError}
      </div>
    );
  }

  return (
    <div className="container2">
      <MyModal visible={Modal} setVisible={setModal}>
        <ModalInfo person={selectedPerson} setVisible={setModal} />
      </MyModal>
      <Carousel items={persons} onItemClick={handleItemClick} />
    </div>
  );
};

export default Home;
