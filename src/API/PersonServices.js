import axios from "axios";

export default class PersonServices {
  static async getAll() {
    try {
      const responce = await axios.get(
        "https://cdnapi.smotrim.ru/api/v1/boxes/vesti2"
      );
      return responce.data.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getPerson(id) {
    try {
      const response = await axios.get(
        `https://cdnapi.smotrim.ru/api/v1/persons/${id}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
