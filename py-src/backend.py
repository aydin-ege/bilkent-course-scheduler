import json


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

from flask import Flask
app = Flask(__name__)


@app.route('/api')
def api():
    wanted_courses = ["EEE 102", "EEE 211"]
    # todo: get wanted courses
    wanted_course_lists = {}
    for course in wanted_courses:
        wanted_course_lists[course] = []
        for section in courses[course][1]:
            wanted_course_lists[course].append([section[0], section[1], section[3]])

    return wanted_course_lists


if __name__ == '__main__':
    app.run()
