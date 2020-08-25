<p align="center"><a href="https://quiz-scraper.netlify.app/"><img src="https://i.imgur.com/L0ItdG3.gif" title="source: imgur.com" /></a></p>

# Dance Judge App

A replication of a real-world application called [CODA](https://coda.breakthefloor.com/)
by Break The Floor Productions. The app is designed to assist judges in giving critiques for dance performances. To accomplish this, the app makes requests to Dance360's API to populate the user interface and submit scoring breakdowns to its database.

## Usage

The data that is fetched from Dance360's API is periodically updated and this app may not handle it as originally intended.

It is recommended that the user makes the following selections when prompted:

- Choose Your Event: "NUVO"
- Choose Your City: "Phoenix: May 14-16, 2020"
- Judge Information: Any selection is fine, except for the last question ("What competition group is this for?"). **Always select "Finals"**.

## Setup

Clone this repo to your desktop and go to its root directory and run npm install to install its dependencies.

Once the dependencies are installed, you can run npm start to start the application. You will then be able to access it at [http://localhost:3000](http://localhost:3000)
