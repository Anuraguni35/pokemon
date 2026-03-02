"use client";
import React from "react";

function Home() {
  const json = {
    event: {
      name: "Holi Madness 🎨🔥",
      type: "Daruuu... Attack Party 💥",
      festival: "Holi 🌈",
      description:
        "Warning ⚠️: You WILL get colored! Join us for madness, music, Daruuuu.... and zero regrets 😎💃🕺",
    },
    host: {
      name: "Sahil (Chief Color Officer) 😜",
      location: "Sahil ki haveli",
    },
    date_time: {
      date: "2026-03-14 📅",
      start_time: "10:00 AM ⏰",
      end_time: "Till We Drop 💃🕺",
    },
    rsvp: {
      required: true,
      deadline: "2026-02-10 ⏳",
      contact_method: "Call, Text, DM, or Send a Pigeon 🐦",
    },
    additional_notes: [
      "Daru daba kr (No cheating with Nashe 😜).",
      "Parking available 🚗",
      "Bring energy, leave ego at home 😌",
      "Friends allowed. Enemies… optional 😏",
    ],
  };

  return (
    <div>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}

export default Home;
