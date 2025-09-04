# 🚀 NASA Astronomy Picture of the Day

A lightweight Flask app to browse NASA’s **Astronomy Picture of the Day** using the free NASA Open API.

![preview](assts/aHR0cHM6Ly9naXRodWIuY29tL1ZleGlsb25IYWNrZXIvT3ZlclF1YWNrCg==.gif)

---

## Setup

1. Clone the repo:
```bash
git clone https://github.com/VexilonHacker/NASA_Astronomy_Picture_of_the_Day_Flask NAPODF
cd NAPODF
```

2. Install dependencies:
```bash
# using uv which is an extremely fast python package and project manager, written in Rust and  10-100x faster and better than pip 
uv sync 
source .venv/bin/activate
# or using pip :(
python3 -m venv .venv 
source .venv/bin/activate
pip install -r requirements.txt
```

3. Get a free [NASA API key](https://api.nasa.gov/) 

4. Put your NASA API key in the file named `nasa.api` located in the project root directory 
```bash
$ cat nasa.api 
YOUR_NASA_API_KEY # get it from https://api.nasa.gov/
```


5. Run:
```bash
$ python main.py
 * Serving Flask app 'main'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8080
 * Running on http://192.168.100.31:8080
Press CTRL+C to quit
Opening in existing browser session.
2025-09-04
127.0.0.1 - - [04/Sep/2025 13:14:15] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [04/Sep/2025 13:14:15] "GET /static/style.css HTTP/1.1" 304 -
127.0.0.1 - - [04/Sep/2025 13:14:15] "GET /static/apod.js HTTP/1.1" 304 -
127.0.0.1 - - [04/Sep/2025 13:14:17] "GET /get_apod?date=2025-09-04 HTTP/1.1" 200 -
```

> The app opens automatically at [0.0.0.0:8000](http://0.0.0.0:8080).

---

## Project structure
```bash
.
├── assts
│   └── aHR0cHM6Ly9naXRodWIuY29tL1ZleGlsb25IYWNrZXIvT3ZlclF1YWNrCg==.gif
├── main.py
├── nasa.api
├── pyproject.toml
├── README.md
├── requirements.txt
├── static
│   ├── apod.js
│   ├── favicon.ico
│   └── style.css
├── templates
│   ├── 404.html
│   └── index.html
└── uv.lock

4 directories, 12 files

```

