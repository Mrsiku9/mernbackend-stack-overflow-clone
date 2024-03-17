import axios from "axios";
const baseUrl= process.env.WEATHER_URL
const weatherReport = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_KEY;
    const weatherResponse = await axios.get(
      `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    res.json(weatherResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export default weatherReport;
