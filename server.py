from flask import Flask, request

# TODO
# - find better way to add lots of simple files

if __name__ == '__main__':
    app = Flask(__name__)

    routes = [["/race_data.js", "race_data.js"]]

    def get_file(file_name):
        with open(file_name) as the_file:
            return the_file.read()

    @app.route("/race_data.js")
    def race_data():
        return get_file("race_data.js")

    @app.route("/dice.js")
    def dice():
        return get_file("dice.js")

    @app.route("/abilities_data.js")
    def abilities_data():
        return get_file("abilities_data.js")


    @app.route("/weapons_data.js")
    def weapons_data():
        return get_file("weapons_data.js")

    @app.route("/armour_data.js")
    def armour_data():
        return get_file("armour_data.js")

    @app.route("/character.js")
    def character_script():
        return get_file("character.js")

    @app.route("/equipment_data.js")
    def equipment_data():
        return get_file("equipment_data.js")

    @app.route("/proficiency_data.js")
    def proficiency_data():
        return get_file("proficiency_data.js")

    @app.route("/style.css")
    def style():
        return get_file("style.css")

    @app.route("/character/create", methods = ['POST'])
    def create():
        data = request.get_json()
        print(data)
        return ""

    @app.route("/character/form")
    def character_creation():
        return get_file("character_creation.html")

    app.run()
