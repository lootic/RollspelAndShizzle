from flask import Flask, request, Response
import uuid
import json
import re
import os

# TODO
# - find better way to add lots of simple files

if __name__ == '__main__':

    character_folder = 'Characters'
    valid_script_file_names = ['race_data.js', 'dice.js', 'abilities_data.js',
        'weapons_data.js', 'armour_data.js', 'character.js',
        'equipment_data.js', 'proficiency_data.js']

    # 87afe8e4-84bc-43ee-a6c1-9ac4ada2ea1a
    uuid_regex = re.compile('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')
    app = Flask(__name__)

    def get_file(file_name):
        with open(file_name) as the_file:
            return the_file.read()

    @app.route("/script/<file_name>")
    def javascript(file_name):
        if(not file_name in valid_script_file_names):
            return 'The file "' + file_name + '" does not exist', 404
        else:
            return get_file('script/' + file_name)


    @app.route("/style.css")
    def style():
        return get_file("style.css")

    @app.route("/character", methods = ['POST'])
    def create_character():
        id = str(uuid.uuid4())
        data = request.get_json()

        with open( character_folder +"/" + id + ".json", 'w') as the_file:
            the_file.write(json.dumps(data))

        resp = Response(None, status=201)
        resp.headers['Location'] = '/character/' + id
        return resp

    @app.route("/character/<character>")
    def view_character(character):
        if(not uuid_regex.match(character)):
            return 'Provided character id "'+ character + '" is not a valid uuid', 400

        file_path = character_folder + '/' + character + '.json'
        exists = os.path.isfile(file_path)
        if(not exists):
            return 'Character does not exist', 404

        with open(file_path, 'r') as the_file:
            return Response(the_file.read(), mimetype='application/json')


    @app.route("/character/form")
    def character_creation():
        return get_file("character_creation.html")

    app.run()
