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
            new_combination = []
            for i in range(len(combination)):
                new_combination.append([])
                new_combination[i].append(wanted_courses[i] + "-" + combination[i][0])
                new_combination[i].append(combination[i][1].copy())
            valid_combinations.append(new_combination)
    return valid_combinations


def schedule_into_table(schedule):
    table = {"Mon": [""]*9, "Tue": [""]*9, "Wed": [""]*9, "Thu": [""]*9, "Fri": [""]*9}
    for course in schedule:
        course_name = course[0]
        course_schedule = course[1]
        for day in course_schedule:
            for i in range(9):
                if i in course_schedule[day]:
                    table[day][i] = course_name
    return table


with open('course_data.json', 'r') as fp:
    courses = json.load(fp)

wanted_courses = ["EEE 313", "EEE 351", "MBG 110", "EEE 321"]
for sch in get_valid_schedules(wanted_courses):
    schedule_into_table(sch)
    





