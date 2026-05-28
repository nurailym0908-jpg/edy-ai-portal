from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Сәлем! Бұл Python серверінен жауап."

if __name__ == '__main__':
    app.run(debug=True)
