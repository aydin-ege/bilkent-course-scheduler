import json


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

from flask import Flask, request
app = Flask(__name__)


@app.route('/api', methods=['POST'])
def api():

    print(request.form['data'])
    return {"1":"a"}
    if request.method == 'GET':
        wanted_course_lists = []
        for course in request.form['data']:
            wanted_course_lists.append({})
            for section in courses[course][1]:
                wanted_course_lists[-1][section[0]] = (section[1], section[3])

        return {'data': wanted_course_lists}


if __name__ == '__main__':
    app.run()
