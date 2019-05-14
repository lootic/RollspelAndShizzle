from flask import Flask, request, Response
import uuid
import json
import re
import os

def get_file(file_name):
    with open(file_name) as the_file:
        return the_file.read()

def load_json(json_string):
    return json.loads(json_string)

def dump_json(dict):
    return json.dumps(dict, indent=4, sort_keys=True)

def create_id():
    return str(uuid.uuid4())

def validate_character_id(character):
    if(not uuid_regex.match(character)):
        return 'Provided character id "'+ character + '" is not a valid uuid', 400

    file_path = character_folder + '/' + character + '.json'
    exists = os.path.isfile(file_path)
    if(not exists):
        return 'Character does not exist', 404
    return True

def get_file_from_folder(file_name, folder, valid_file_names):
    if(not file_name in valid_file_names):
        return 'The file "' + file_name + '" does not exist', 404
    else:
        return get_file(folder + '/' + file_name)

if __name__ == '__main__':
    character_folder = 'storage/character'
    adventure_folder = 'storage/adventure'
    script_folder = "script"
    language_folder = "language"
    valid_script_file_names = ['race_data.js', 'dice.js', 'abilities_data.js',
        'weapons_data.js', 'armour_data.js', 'character.js', 'rest.js',
        'equipment_data.js', 'proficiency_data.js', 'adventure.js']
    valid_language_file_names = ["swedish.json"]
    uuid_regex = re.compile('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')
    app = Flask(__name__)

    character_list = load_json(get_file(character_folder + "/list.json"))

    @app.route("/script/<file_name>")
    def javascript(file_name):
        return get_file_from_folder(file_name, script_folder, valid_script_file_names)

    @app.route("/language/<language>")
    def getLanguage(language):
        return get_file_from_folder(language + '.json', language_folder, valid_language_file_names)

    @app.route("/style.css")
    def style():
        return get_file("style.css")

    @app.route("/rest/character", methods=["GET"])
    def list_characters():
        return Response(dump_json(character_list), mimetype='application/json')

    @app.route("/rest/character", methods = ['POST'])
    def create_character():
        id = create_id()
        data = request.get_json()

        character_list.append({
            "name": data["name"],
            "id": id,
            "proficiency": data["proficiency"],
            "race": data["race"],
            "sex": data["sex"]})

        with open(character_folder + "/" + id + ".json", 'w') as the_file:
            the_file.write(dump_json(data))

        with open(character_folder + "/list.json", 'w') as the_file:
            the_file.write(dump_json(character_list))

        resp = Response(None, status=201)
        resp.headers['Location'] = '/rest/character/' + id
        return resp

    @app.route("/rest/character/<character>", methods= ["PUT"])
    def update_character(character):
        validation = validate_character_id(character)
        if(validation != True):
            return validation
        data = request.get_json()
        with open(character_folder + '/' + character + '.json', 'w') as the_file:
            the_file.write(dump_json(data))
        return Response(None, status=204)

    @app.route("/rest/character/<character>")
    def view_character(character):
        validation = validate_character_id(character)
        if(validation != True):
            return validation

        return Response(get_file(character_folder + '/' + character + '.json'), mimetype='application/json')

    #should we distinguish between real pages and rest? yes ofc! but how?
    @app.route("/")
    def character_creation():
        return get_file("index.html")

    app.run()
