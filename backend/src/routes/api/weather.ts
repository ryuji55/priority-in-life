// src/routes/weather.ts
import { Router } from "express";

const router = Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Weather API error");
    }

    const data = await response.json();
    const returnResponse = {
      city: data.name,
      temperatureMax: data.main.temp_max,
      temperatureMin: data.main.temp_min,
      description: data.weather[0].description,
    };
    res.json(returnResponse);
  } catch (error) {
    console.error("Weather API Error:", error);
    res.status(500).json({ error: "天気情報の取得に失敗しました" });
  }
});

export { router as weatherRouter };
