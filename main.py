from flask import Flask, render_template, request, jsonify
from nasapy import Nasa
import datetime, threading, webbrowser, sys

AUTHOR = 'NeoCasper AKA VexilonHacker'
HOST = '0.0.0.0'
PORT = 8080
API_FILE = 'nasa.api'

with open(API_FILE, "r") as f:
    nasa_api_key = f.readlines()[0].strip()
    if nasa_api_key.startswith('YOUR_NASA_API_KEY'):
        print(f'You need to put your NASA api key in {API_FILE}\nGet your free api from "https://api.nasa.gov/"')
        sys.exit(1)

nasa = Nasa(key=nasa_api_key)
app = Flask(__name__, template_folder='docs')

@app.route('/', methods=["GET", "POST"])
def index():
    apod_data = None
    selected_date = datetime.date.today().strftime("%Y-%m-%d")
    print(selected_date)
    return render_template("index.html", apod=apod_data, date=selected_date, author=AUTHOR)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/get_apod')
def get_apod():
    date = request.args.get('date')
    if not date:
        return jsonify({'error': 'No date provided.'})

    try:
        apod_data = nasa.picture_of_the_day(date=date, hd=True)

        if 'error' in apod_data:
            return jsonify({'error': apod_data['error']})

        return jsonify({
            'title': apod_data.get('title', 'No title'),
            'url': apod_data.get('url'),
            'explanation': apod_data.get('explanation'),
            'media_type': apod_data.get('media_type', 'image'),
            'date': apod_data.get('date')
        })
    except Exception as e:
        return jsonify({'error': f'Failed to fetch image or it may not be uploaded yet: {e}'})

# long name but .... FUN
def OpenWebsiteInBrowser():
    webbrowser.open_new(f"http://{HOST}:{PORT}")

if __name__ == "__main__":
    threading.Timer(0.5, OpenWebsiteInBrowser).start()
    app.run(host=HOST, port=PORT)

