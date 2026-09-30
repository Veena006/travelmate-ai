# 🌍 TravelMate AI — Autonomous Route-Based Travel Planner

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An intelligent, full-stack travel planning platform that synthesizes **Large Language Models (LLMs)**, **geographic clustering heuristics**, and **real-time transit estimation** to craft optimized, day-by-day travel itineraries. TravelMate AI eliminates fragmented trip planning by clustering attractions geographically, proposing convenient base accommodations, computing sequential route distances with cab comparisons (Uber & Rapido), and displaying verified physical locations beside every venue.

---

## 📌 Table of Contents

- [Executive Summary & Problem Statement](#-executive-summary--problem-statement)
- [Key Features](#-key-features)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Interactive Pipelines & Flowcharts](#-interactive-pipelines--flowcharts)
  - [1. User Journey & Generation Flowchart](#1-user-journey--generation-flowchart)
  - [2. Algorithmic Routing & Clustering Flow](#2-algorithmic-routing--clustering-flow)
- [Technology Stack](#-technology-stack)
- [API Reference & Route Specifications](#-api-reference--route-specifications)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Academic References & Research Literature](#-academic-references--research-literature)
- [License](#-license)

---

## 🔬 Executive Summary & Problem Statement

### The Problem
Traditional travel planning is fundamentally fragmented. A traveler must manually:
1. Research attractions across travel blogs and aggregators.
2. Determine geographical proximity to prevent inefficient zig-zag transit across cities.
3. Select an accommodation that serves as a logical transit anchor.
4. Estimate itemized budget splits for lodging, food, transit, and entry passes.
5. Inquire about point-to-point transit times and compare ride-hailing options.

This manual process often leads to **backtracking fatigue**, **budget overruns**, and **suboptimal route scheduling**.

### The Solution: TravelMate AI
TravelMate AI addresses the **Tourist Trip Design Problem (TTDP)** by formulating travel planning as a multi-constraint optimization workflow:
- **Heuristic Geographic Clustering**: Points of interest (POIs) are grouped geographically per day to eliminate unnecessary crisscross travel.
- **Anchor-Based Routing**: Day routes originate and terminate at recommended accommodations, minimizing transit friction.
- **Transparent Location Annotations**: Every hotel, landmark, and restaurant prominently features its specific physical neighborhood location right next to its name.
- **Predictive Destination Suggestions**: Prefix-prioritized autocomplete suggests regional and global cities instantly (e.g. typing `m` suggests Mumbai, Mangalore, Mysore, Malaysia, Manali, Madrid, etc.).
- **Multi-Modal Transit & Fare Comparison**: Real-time distance and duration calculations with side-by-side Uber and Rapido fare comparisons.
- **Glassmorphic Dual-Theme UI**: Tailored Light and Dark modes with persistent local storage.

---

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| **⚡ AI-Driven Itinerary Synthesis** | Formulates customized multi-day schedules based on budget, duration, travel style (Budget, Luxury, Adventure, Romantic, Solo), and personal interests. |
| **📍 In-Line Location Annotations** | Displays verified neighborhood addresses (e.g., `Colaba Waterfront, South Mumbai`, `KLCC Precinct, Kuala Lumpur`) directly beside each venue. |
| **🔎 Predictive Autocomplete** | Instant prefix-weighted dropdown supporting popular cities, regional hubs, and international destinations with keyboard navigation. |
| **🏨 Proximity-Aware Stays** | Evaluates base hotels based on distance to Day 1 POIs, serving as the daily anchor for morning departures and evening returns. |
| **🚗 Cab Fare & Transit Engine** | Computes segment distances ($km$) and transit times ($mins$) with integrated Uber and Rapido fare comparisons and deep-link booking buttons. |
| **💰 Smart Budget Allocator** | Real-time budget breakdown for accommodation (35%), food (25%), transit (15%), activities (15%), and contingency buffers (10%). |
| **🌓 Adaptive Light & Dark Theme** | Smooth CSS variable transitions and glassmorphism styling ensuring contrast and readability in any environment. |
| **🛡️ Resilient Dual-Engine Fallback** | Runs in offline/mock mode for instantaneous development and tests without requiring active OpenAI API credits. |

---

## 🏛️ System Architecture & Data Flow

TravelMate AI follows a clean **Full-Stack Next.js (App Router)** architecture separating client components, server route handlers, AI integration layers, and persistence mechanisms.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Presentation Layer                       │
│  React 19 + TypeScript + Tailwind CSS v4 + ThemeProvider (Light/Dark)  │
│                                                                        │
│  [Autocomplete Input] ── [Form State] ── [Itinerary Timeline] ── [Map] │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON Payloads
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Next.js Server Route Handlers                     │
│  /api/travel/generate    /api/places/search    /api/travel/save        │
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │                               │
         ┌──────────┴──────────┐         ┌──────────┴──────────┐
         ▼                     ▼         ▼                     ▼
┌─────────────────┐  ┌─────────────────┐ ┌───────────────┐  ┌──────────┐
│   OpenAI GPT    │  │  Cab Estimator  │ │ Google Places │  │  Prisma  │
│ (Structured JSON│  │ (Uber & Rapido  │ │ (Geo Search & │  │ Postgres │
│  Constraint)    │  │  Heuristics)    │ │  Coordinates) │  │ Database │
└─────────────────┘  └─────────────────┘ └───────────────┘  └──────────┘
```

---

## 📊 Interactive Pipelines & Flowcharts

### 1. User Journey & Generation Flowchart

The following sequence details how user requests are collected, validated, augmented with transit heuristics, and transformed into an interactive timeline:

```mermaid
flowchart TD
    A([User Enters Application]) --> B[Destination & Starting City Input]
    B -->|User types 'm'| C[Interactive Autocomplete Triggers]
    C -->|Selects Mumbai / Mysore / etc.| D[Configure Budget, Days & Style]
    D --> E[Form Validation Client-Side]
    
    E -- Validation Failed --> D
    E -- Validation Passed --> F[POST /api/travel/generate]
    
    F --> G{OpenAI Key Configured?}
    G -- Yes --> H[Call OpenAI Chat Completions with Strict JSON Schema]
    G -- No / API Limit --> I[Activate Local Route & Landmark Generator]
    
    H --> J[Raw JSON Itinerary Received]
    I --> J
    
    J --> K[Transit & Cab Estimator Module]
    K --> L[Calculate Distances, Durations & Uber/Rapido Fares]
    L --> M[Assemble Complete Trip Response Object]
    
    M --> N[Store Itinerary in Session & Cache]
    N --> O[Redirect to Dynamic Itinerary View: /trip/[id]]
    O --> P[Render Daily Timeline, Location Badges, Hotel Bases & Map]
```

---

### 2. Algorithmic Routing & Clustering Flow

This flowchart illustrates how POIs and daily anchors are geographically paired to resolve the Tourist Trip Design Problem:

```mermaid
flowchart LR
    subgraph Input Preferences
        Dest[Destination]
        Dur[Duration: N Days]
        Budg[Budget Target]
    end

    subgraph Selection & Anchor Phase
        Dest --> HotelFilter[Hotel Base Selection]
        HotelFilter --> AnchorStay["Primary Base Hotel (Anchor 0)"]
    end

    subgraph Clustering & Day Division
        Dur --> POIDivision[Geographic POI Clustering]
        POIDivision --> Day1["Day 1: Cluster North / Waterfront"]
        POIDivision --> Day2["Day 2: Cluster Central / Heritage"]
    end

    subgraph Sequential Segment Graph
        AnchorStay --> Spot1["POI 1 (Morning) + Location Tag"]
        Spot1 --> Transit1["Transit Segment (Distance + Cab Fare)"]
        Transit1 --> Spot2["POI 2 (Afternoon) + Location Tag"]
        Spot2 --> Lunch["Integrated Dining along Route"]
        Lunch --> Spot3["POI 3 (Sunset/Evening) + Location Tag"]
        Spot3 --> Dinner["Dinner Recommendation"]
        Dinner --> ReturnStay["Return to Base Hotel Anchor"]
    end
```

---

## 💻 Technology Stack

### Frontend & UI Architecture
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@custom-variant dark` support
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: Context-driven `ThemeProvider` supporting instant Light/Dark toggling with `localStorage` persistence

### Backend & API Layer
- **Runtime**: Node.js (with 4GB memory allocation optimization)
- **API Handlers**: Next.js Route Handlers (`/api/travel/*`, `/api/places/*`, `/api/user/*`)
- **AI Engine**: OpenAI GPT API with structured JSON output constraints
- **Fallback Simulation**: Local heuristic itinerary generator ensuring 100% offline availability
- **Database ORM**: [Prisma 5](https://www.prisma.io/) (PostgreSQL schema support)

---

## 📡 API Reference & Route Specifications

### 1. `POST /api/travel/generate`
Generates a complete, route-connected itinerary with hotel suggestions, POIs, transit estimates, and meal recommendations.

**Request Payload:**
```json
{
  "destination": "Mumbai",
  "startingLocation": "Bengaluru",
  "budget": 25000,
  "currency": "INR",
  "days": 3,
  "travelers": 2,
  "travelStyle": "Budget",
  "interests": ["History", "Food", "Beaches"]
}
```

**Key Response Fields:**
```json
{
  "success": true,
  "data": {
    "id": "trip_1727718000",
    "destination": "Mumbai",
    "hotels": [
      {
        "name": "The Taj Mahal Palace & Tower",
        "location": "Colaba Waterfront, South Mumbai",
        "pricePerNight": 5000,
        "rating": 4.9
      }
    ],
    "famousSpots": [
      {
        "name": "Gateway of India",
        "location": "Colaba Waterfront, South Mumbai",
        "whyFamous": "Historic basalt triumphal arch"
      }
    ],
    "days": [
      {
        "day": 1,
        "activities": [
          {
            "name": "Gateway of India",
            "location": "Colaba Waterfront, South Mumbai",
            "routeToNext": {
              "fromLocation": "Gateway of India",
              "toLocation": "CSMT",
              "distanceKm": "2.8 km",
              "durationMins": "12 min",
              "rideEstimates": [
                { "provider": "Rapido", "serviceName": "Rapido Bike", "estimatedPrice": 45 },
                { "provider": "Uber", "serviceName": "UberGo", "estimatedPrice": 110 }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

### 2. `POST /api/places/search`
Searches attractions and coordinates for a given destination.

### 3. `POST /api/travel/save` & `GET /api/travel`
Persists trips to PostgreSQL via Prisma ORM, falling back to local client persistence.

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** version 18.17.0 or higher
- **npm** or **pnpm** or **yarn**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Veena006/TravelMate_AI.git
cd TravelMate_AI
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the template environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# OpenAI API Key (Keep mock-key-development for free offline test mode)
OPENAI_API_KEY=mock-key-development

# Google Maps API Key
GOOGLE_MAPS_API_KEY=mock-key-development

# Optional PostgreSQL Connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/travel_db
```

### Step 4: Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Academic References & Research Literature

The algorithmic and prompt-engineering architectures implemented in TravelMate AI draw upon formal research in **Tourist Trip Design Problems (TTDP)**, **LLM constraint satisfaction**, and **heuristic route planning**:

1. **Xie, J., Zhang, C., Chen, Z., et al. (2024).**  
   *TravelPlanner: A Benchmark for Evaluating Large Language Models in Tool-Use and Complex Planning.*  
   *arXiv preprint arXiv:2402.01622.*  
   *Contribution:* Evaluates LLM capability in multi-constraint itinerary planning under budget, environmental, and temporal boundaries.

2. **Lim, K. H., Chan, J., Leckie, C., & Karunasekera, S. (2019).**  
   *Personalized Itinerary Recommendation with Queuing Time Awareness.*  
   *IEEE Transactions on Knowledge and Data Engineering (TKDE), 31(12), 2365–2378.*  
   *Contribution:* Models tourist trip generation as a Generalized Orienteering Problem balancing user interest scores against transit times.

3. **Gavalas, D., Konstantopoulos, C., Mastakas, K., & Pantziou, G. (2014).**  
   *A Survey on Algorithmic Approaches to the Tourist Trip Design Problem.*  
   *Journal of Systems and Software, 96, 66–88.*  
   *Contribution:* Comprehensive taxonomy of heuristic and meta-heuristic approaches (clustering, greedy algorithms) for POI sequencing.

4. **Borràs, J., Moreno, A., & Valls, A. (2014).**  
   *Intelligent Tourism Recommender Systems: A Survey.*  
   *Artificial Intelligence Review, 42(4), 937–963.*  
   *Contribution:* Analyzes recommendation strategies, user preference elicitation, and multi-criteria decision making in modern tourism apps.

5. **Willard, B. T., & Louf, R. (2023).**  
   *Efficient Guided Generation for Large Language Models.*  
   *arXiv preprint arXiv:2307.09702.*  
   *Contribution:* Explores formal grammars and JSON Schema constraints to guarantee deterministic structural parsing from generative language models.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with ❤️ by <a href="https://github.com/Veena006">Veena</a> • Powered by Next.js & Artificial Intelligence</sub>
</div>