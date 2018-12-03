from flask import Flask, request

if __name__ == '__main__':
    app = Flask(__name__)

    def get_file(file_name):
        with open(file_name) as the_file:
            return the_file.read()

    @app.route("/abilities_data.js")
    def abilities_data():
        return get_file("abilities_data.js")

    @app.route("/armour_data.js")
    def armour_data():
        return get_file("armour_data.js")

    @app.route("/character.js")
    def character_script():
        return get_file("character.js")

    @app.route("/equipment_data.js")
    def equipment_data():
        return get_file("armour_data.js")

    @app.route("/proficiency_data.js")
    def proficiency_data():
        return get_file("proficiency_data.js")

    @app.route("/style.css")
    def style():
        return get_file("style.css")

    @app.route("/character_creation", methods = ['GET', 'POST'])
    def character_creation():
        if request.method == 'GET':
            return get_file("character_creation.html")
        elif request.method == 'POST':
            pass
            #add to a db, sqlite or maybe just store to scratch space

    app.run()
