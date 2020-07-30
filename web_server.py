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
            if any(i in schedule[day] for i in course_times[day]):
                return False
            schedule[day].extend(course_times[day])
    return True


def get_valid_schedules(wanted_courses):
    global courses
    wanted_course_lists = []
    for course in wanted_courses:
        wanted_course_lists.append([])
        for section in courses[course][1]:
            section_no = section[0]
            time = section[3]
            wanted_course_lists[-1].append([section_no, time])

    all_combinations = list(product(*wanted_course_lists))

    valid_combinations = []
    for combination in all_combinations:
        if check_time_collision(combination):
            valid_combinations.append(combination)
    return valid_combinations


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

wanted_courses = ["EEE 313", "EEE 351", "MBG 110", "EEE 321"]
get_valid_schedules(wanted_courses)





