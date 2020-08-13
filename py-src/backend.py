import json


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/api', methods=['POST'])
def api():
    print(request.form)
    if request.method == 'POST':
        wanted_course_lists = []
        for course in request.form['data'].split(","):
            wanted_course_lists.append({})
            for section in courses[course][1]:
                wanted_course_lists[-1][section[0]] = (section[1], section[3])
        print({'data': wanted_course_lists})
        return {'data': wanted_course_lists}


if __name__ == '__main__':
    app.run()
