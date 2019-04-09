from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder="../build/static", template_folder="../build")

@app.route("/")
def root():
  return render_template('index.html')

@app.route('/favicon.ico') 
def favicon(): 
  print(app.template_folder)  
  return send_from_directory(app.template_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
  app.run(host='0.0.0.0')