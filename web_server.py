import streamlit as st
import pandas as pd
import json
from itertools import product


def check_time_collision(course_combo):
    schedule = {}
    for course in course_combo:
        course_times = course[1]
        for day in course_times:
            if day not in schedule:
                schedule[day] = []
            for times in schedule[day]:
                start, stop = times
                for i in range(start, stop + 1):
                    if i in schedule[day]:
                        return False
                    schedule[day].append(i)
    return True


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

wanted_courses = ["EEE 313", "EEE 351", "MBG 110", "EEE 321"]

wanted_course_lists = []
for course in wanted_courses:
    wanted_course_lists.append([])
    for section in courses[course][1]:
        section_no = section[0]
        time = section[3]
        wanted_course_lists[-1].append([section_no, time])

all_products = list(product(*wanted_course_lists))



