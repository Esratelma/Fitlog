# FitLog — Workout Library

**FitLog** is a responsive workout library web application that helps users explore exercises, organize their daily workout plans, and save their favorite workouts. It provides a simple, modern interface for tracking workout duration, estimated calories burned, and daily exercise goals.

## Technologies Used

* **Next.js** — React framework for building the web application.
* **React** — Component-based user interface.
* **Tailwind CSS** — Responsive styling and modern UI design.
* **Context API** — Global state management for workout plans and saved workouts.
* **LocalStorage** — Persisting workout plans and saved workouts in the browser.
* **Lucide React** — Icons for the user interface.
* **REST API** — Fetching workout data and individual workout details.

## Key Features

1. **Workout Library** — Browse workouts displayed in a responsive card grid, with up to 12 workouts shown on the home page.

2. **Workout Details** — View detailed information about individual workouts through dedicated detail pages.

3. **My Plan** — Add workouts to your daily plan, track exercises, total workout minutes, and estimated calories burned.

4. **Save Favorite Workouts** — Save workouts for later and access them from the Saved tab. Workout plans and saved items persist using LocalStorage.

5. **Sorting and Notifications** — Sort workouts by duration, calories burned, or rating, and receive toast notifications when performing workout actions.

## Getting Started

### Prerequisites

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project directory:

```bash
cd fitlog
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Workout API

FitLog retrieves workout data from the following REST API endpoints:

* **All workouts:** https://api.abcz.workers.dev/api/fitlog
* **Workout details:** `https://api.abcz.workers.dev/api/fitlog/:id`

An alternative API is also available:

* **All workouts:** https://api.api-store.workers.dev/api/fitlog
* **Workout details:** `https://api.api-store.workers.dev/api/fitlog/:id`

## Project Goal

FitLog aims to make workout planning simple and accessible through a responsive interface, convenient workout organization, and persistent saved data.

---

*Built with Next.js, React, and Tailwind CSS.*
