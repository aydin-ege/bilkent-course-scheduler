import json

def load_data():
    with open('course_codes.json', 'r') as fp:
        course_codes = json.load(fp)
    return course_codes_1


