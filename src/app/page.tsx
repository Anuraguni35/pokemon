"use client";
import Navbar from "@/components/ui/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


type Pokemon = {
  name: string;
 
};
function Home() {
   
  return (
    <div>
      "event": {
    "name": "Holi Madness 🎨🔥",
    "type": "Daruuu... Attack Party 💥",
    "festival": "Holi 🌈",
    "description": "Warning ⚠️: You WILL get colored! Join us for madness, music, Daruuuu.... and zero regrets 😎💃🕺"
  },
  "host": {
    "name": "Sahil (Chief Color Officer) 😜",
    "location": "Sahil ki haveli",
  },
  "date_time": {
    "date": "2026-03-14 📅",
    "start_time": "10:00 AM ⏰",
    "end_time": "Till We Drop 💃🕺",
  },
 "rsvp": {
    "required": true,
    "deadline": "2026-02-10 ⏳",
    "contact_method": "Call, Text, DM, or Send a Pigeon 🐦"
  },
  "additional_notes": [
    "Daru daba kr (No cheating with Nashe 😜).",
    "Parking available 🚗",
    "Bring energy, leave ego at home 😌",
    "Friends allowed. Enemies… optional 😏"
  ]
});
    </div>
}


export default Home;
