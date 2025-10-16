//! PLZ DONT TOUCH THIS :)      - Cahya Winata

import axios from "axios";

// const API_URL = "http://localhost:5678/webhook-test/chatbot"; // UNTUK TESTING
const API_URL = "http://localhost:5678/webhook/chatbot"; // UNTUK ACTIVE, BIAR JALAN TERUS TANPA DITERUS EKSEKUSI
const OPENAI_KEY = "AIzaSyDl4fai728ClHS10Ef75D238_tNvvsDF4Q";

export const sendMessageToChatbot = async (message, previousMessages = []) => {
  try {
    previousMessages = JSON.stringify(previousMessages);
    const res = await axios.post(API_URL, { message, previousMessages });
    let data = res.data;
    console.log(previousMessages);
    
    if (Array.isArray(data)) data = data[0];

    if (typeof data.output === "string") {
      data = JSON.parse(data.output);
    }

    return data.answer || "Maaf, terjadi kesalahan.";
  } catch (err) {
    console.error("Error from chatbot:", err);
    return "Maaf, terjadi kesalahan.";
  }
};
