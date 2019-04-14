# SoundBooth

The premier social media platform for indie vocalists to share and discover easy-to-digest soundclips.

## Installation

SoundBooth is built on top of React (front-end) and Flask (back-end), and so has two sets of dependencies. SoundBooth also requires [ffmpeg](http://ffmpeg.org/download.html) and various environment variables. For a simpler installation/deployment, consider this one-click deploy to Heroku: [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Regardless of your choice, you'll need to get API credentials for Firebase, Google Cloud, and Spotify. Create a [Firebase](https://console.firebase.google.com) project, then save the config information and download a service account JSON key. Then create a [Google Cloud](https://console.developers.google.com) project, enable the Speech to Text API, and download a service account JSON key. Finally, create a [Spotify](https://developer.spotify.com/dashboard) project and keep track of your Client ID and Secret. You'll need all these values later to fill out environment variables.

To handle the front-end dependencies, make sure you have both [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/docs/install) installed. Then run the following in the root directory:

```bash
yarn install
```

To install the back-end dependencies, first make sure you have [Python 3](https://www.python.org/downloads/) installed. It's recommended that before continuing, you create a virtual environment so packages don't conflict with your other projects. To do so, install Python virtual-env:

```bash
pip install virtualenv
```

In the root directory, create a folder for the virtual environment and then activate it with:

```bash
virtualenv venv
. venv/bin/activate
```

You can exit the environment by running `deactivate` at any time. Now install the back-end dependencies with:

```bash
pip install -r requirements.txt
```

SoundBooth also requires [ffmpeg](http://ffmpeg.org/download.html), so make sure it is installed and available in your system path.

Finally, SoundBooth requires the following environment variables to be set:

```bash
# Create a Firebase project and fill out these (last one is a JSON service account credential)
REACT_APP_API_KEY=<GET_FROM_FIREBASE>
REACT_APP_AUTH_DOMAIN=<GET_FROM_FIREBASE>
REACT_APP_DATABASE_URL=<GET_FROM_FIREBASE>
REACT_APP_PROJECT_ID=<GET_FROM_FIREBASE>
REACT_APP_STORAGE_BUCKET=<GET_FROM_FIREBASE>
REACT_APP_MESSAGING_SENDER_ID=<GET_FROM_FIREBASE>
FIREBASE_CREDENTIALS={"type":"service_account",...}

# Choose your own key
REACT_APP_SERVER_KEY=<CHOOSE_A_SECURE_KEY>

# Create a Spotify app and fill out these
REACT_APP_SPOTIFY_ID=<GET_FROM_SPOTIFY>
REACT_APP_SPOTIFY_SECRET=<GET_FROM_SPOTIFY>

# Create a Google Cloud project with access to the Speech to Text API and get a JSON service account credential
GOOGLE_CREDENTIALS={"type":"service_account",...}
```

## Running

To use SoundBooth, run the following from the root directory:

```bash
yarn build # compile React front-end
gunicorn --chdir server -w 4 app:app # run a WSGI server in front of the Flask application
```

The app should then be available on http://localhost:8000.

For front-end development, run `yarn start`, which starts a development server on http://localhost:3000. This server has hot-reloading enabled, so you can focus on making changes. However, it won't start the Flask server, and so you won't be able to test any changes to the classifiers or server. To see those changes, have a gunicorn server running in one terminal and use another terminal to run `yarn build` whenever you have changes to the front-end. You'll have to restart the gunicorn server if changes are made to the back-end as hot-reloading is not configured for it, but feel free to submit a pull request!

## License
[MIT](https://choosealicense.com/licenses/mit/)