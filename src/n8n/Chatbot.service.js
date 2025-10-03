//! PLZ DONT TOUCH THIS :)      - Cahya Winata

import axios from "axios";

const API_URL = "http://localhost:5678/webhook-test/chatbot";
// const API_URL = "http://localhost:5678/webhook/chatbot";
const OPENAI_KEY = "AIzaSyDl4fai728ClHS10Ef75D238_tNvvsDF4Q";


//! BUAT BERSIHIN FORMAT \n \r \t \ DARI AI
function cleanText(text) {
  if (typeof text !== "string") return "";
  let cleaned = text.replace(/\\[nrt\\]+/g, " ");
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

export const sendMessageToChatbot = async (message) => {
  try {
    const res = await axios.post(API_URL, { message });
    let data = res.data;

    if (Array.isArray(data)) data = data[0];

    if (typeof data.output === "string") {
      try {
        data = JSON.parse(data.output);
      } catch (e) {
        console.error("Gagal parse JSON:", e, data);
        return "Maaf, terjadi kesalahan.";
      }
    }

    let answer = (data.answer || data) + "";
    answer = cleanText(answer);

    return answer;
  } catch (err) {
    console.error("Error from chatbot:", err);
    return "Maaf, terjadi kesalahan.";
  }
};
