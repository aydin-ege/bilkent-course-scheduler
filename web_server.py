import streamlit as st
import pandas as pd
import json
from itertools import product
import SessionState

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
    table = {"Mon": ["\t"]*9, "Tue": ["\t"]*9, "Wed": ["\t"]*9, "Thu": ["\t"]*9, "Fri": ["\t"]*9}
    for course in schedule:
        course_name = course[0]
        course_schedule = course[1]
        for day in course_schedule:
            for i in range(9):
                if i in course_schedule[day]:
                    table[day][i] = course_name
    return table


courses = {}
course_codes = {}
with open('course_data.json', 'r') as fp:
    courses = json.load(fp)
with open('course_codes.json', 'r') as fp:
    course_codes = json.load(fp)

course_prefixes = ['ACC', 'ADA', 'AMER', 'ARCH', 'BF', 'BIM', 'BTE', 'CHEM', 'CI', 'CINT', 'COMD', 'CS', 'CTE', 'CTIS', 'ECON', 'EDEB', 'EEE', 'EEPS', 'ELIT', 'ELS', 'EMBA', 'ENG', 'ETE', 'FA', 'FRP', 'GE', 'GRA', 'HART', 'HCIV', 'HIST', 'HUM', 'IAED', 'IE', 'IELTS', 'IR', 'LAUD', 'LAW', 'LNG', 'MAN', 'MATH', 'MBA', 'MBG', 'ME', 'MIAPP', 'MSC', 'MSN', 'MTE', 'MUS', 'NSC', 'PE', 'PHIL', 'PHYS', 'POLS', 'PREP', 'PSYC', 'SFL', 'SOC', 'TE', 'TEFL', 'THEA', 'THM', 'THR', 'TOEFL', 'TRIN', 'TURK']

session_state = SessionState.get(old_wanted_courses=[], wanted_courses=[], course_code="", schedule_no=0)

st.title('My first app')
course_code = st.selectbox("Select the course code", course_prefixes)


wanted_courses = []
if session_state.course_code != "" and session_state.course_code != course_code and len(session_state.old_wanted_courses) > 0:
    session_state.wanted_courses = session_state.old_wanted_courses
    print("here")
print(wanted_courses, session_state.wanted_courses, "\n\n")
extended_course_codes = course_codes[course_code]
extended_course_codes.extend(session_state.wanted_courses)
wanted_courses = st.multiselect("Select courses", extended_course_codes, session_state.wanted_courses)
session_state.old_wanted_courses = wanted_courses
session_state.course_code = course_code

dfs = []
for sch in get_valid_schedules(wanted_courses):
    dfs.append(pd.DataFrame(schedule_into_table(sch)))

st.write("Here's our first attempt at using data to create a table:")

st.write("Combination " + str(session_state.schedule_no % len(dfs) + 1) + " of "+ str(len(dfs)))
st.table(dfs[session_state.schedule_no % len(dfs)])

if st.button('Next'):
    session_state.schedule_no += 1
if st.button('Prev'):
    session_state.schedule_no -= 1
