import streamlit as st
import pandas as pd
import json
from itertools import product
import SessionState


def check_time_collision(course_combo):
    schedule = {}
    for course_3 in course_combo:
        course_times = course_3[1]
        for day in course_times:
            if day not in schedule:
                schedule[day] = []
            if any(i in schedule[day] for i in course_times[day]):
                return False
            schedule[day].extend(course_times[day])
    return True


# @st.cache
def get_valid_schedules(wanted_courses_1):
    global courses
    wanted_course_lists = []
    for course_2 in wanted_courses_1:
        wanted_course_lists.append([])
        for section in courses[course_2][1]:
            section_no_2 = section[0]
            instructor = section[1]
            time = section[3]
            wanted_course_lists[-1].append([section_no_2, time, instructor])

    all_combinations = list(product(*wanted_course_lists))

    valid_combinations = []
    for combination in all_combinations:
        if check_time_collision(combination):
            new_combination = []
            for i in range(len(combination)):
                new_combination.append([])
                new_combination[i].append(wanted_courses[i] + "-" + combination[i][0])
                new_combination[i].append(combination[i][1].copy())
                new_combination[i].append(combination[i][2])
            valid_combinations.append(new_combination)
    return valid_combinations


def schedule_into_table(schedule):
    table = {"Mon": ["\t"]*9, "Tue": ["\t"]*9, "Wed": ["\t"]*9, "Thu": ["\t"]*9, "Fri": ["\t"]*9}
    for course_1 in schedule:
        course_name_1 = course_1[0]
        course_schedule = course_1[1]
        for day in course_schedule:
            for i in range(9):
                if i in course_schedule[day]:
                    table[day][i] = course_name_1
    return table


# @st.cache(allow_output_mutation=True)
def load_data():
    with open('course_data.json', 'r') as fp:
        courses_4 = json.load(fp)
    with open('course_codes.json', 'r') as fp:
        course_codes_1 = json.load(fp)
    return courses_4, course_codes_1


courses, course_codes = load_data()

course_prefixes = ['ACC', 'ADA', 'AMER', 'ARCH', 'BF', 'BIM', 'BTE', 'CHEM', 'CI', 'CINT', 'COMD', 'CS', 'CTE', 'CTIS', 'ECON', 'EDEB', 'EEE', 'EEPS', 'ELIT', 'ELS', 'EMBA', 'ENG', 'ETE', 'FA', 'FRP', 'GE', 'GRA', 'HART', 'HCIV', 'HIST', 'HUM', 'IAED', 'IE', 'IELTS', 'IR', 'LAUD', 'LAW', 'LNG', 'MAN', 'MATH', 'MBA', 'MBG', 'ME', 'MIAPP', 'MSC', 'MSN', 'MTE', 'MUS', 'NSC', 'PE', 'PHIL', 'PHYS', 'POLS', 'PREP', 'PSYC', 'SFL', 'SOC', 'TE', 'TEFL', 'THEA', 'THM', 'THR', 'TOEFL', 'TRIN', 'TURK']

session_state = SessionState.get(old_wanted_courses=[], wanted_courses=[], course_code="", schedule_no=0)

st.title('Scheduler')
course_code = st.selectbox("Select the course code", course_prefixes)

wanted_courses = []
if session_state.course_code != "" and session_state.course_code != course_code and len(session_state.old_wanted_courses) > 0:
    session_state.wanted_courses = session_state.old_wanted_courses

extended_course_codes = course_codes[course_code]
extended_course_codes.extend(session_state.wanted_courses)
wanted_courses = st.multiselect("Select courses", extended_course_codes, session_state.wanted_courses)
session_state.old_wanted_courses = wanted_courses
session_state.course_code = course_code

sections = set()
instructors = set()
all_instructors = {}
all_sections = {}

schs = get_valid_schedules(wanted_courses)
for sch in schs:
    for course in sch:
        sections.add(course[0])
        course_name, section_no = course[0].split("-")
        if course_name not in all_instructors:
            all_instructors[course_name] = set()
        if course_name not in all_sections:
            all_sections[course_name] = set()
        all_instructors[course_name].add(course[2])
        all_sections[course_name].add(course[0])
        if course[2] == "staff":
            instructors.add(course_name+" staff")
        else:
            instructors.add(course[2])


sections = list(sections)
instructors = list(instructors)
sections.sort()
instructors.sort()

include_instructors = st.sidebar.multiselect("Only include following instructors for their courses", instructors, key="inc_inst")
exclude_instructors = st.sidebar.multiselect("Exclude following instructors", instructors, key="exc_inst")
include_sections = st.sidebar.multiselect("Only include following sections for their courses", sections, key="inc_sec")
exclude_sections = st.sidebar.multiselect("Exclude following sections", sections, key="exc_sec")


inverse_instructor_inclusions = [instructor for instructor in instructors if instructor not in include_instructors]
for course in all_instructors:
    if not any(instructor in all_instructors[course] for instructor in include_instructors):
        inverse_instructor_inclusions = [instructor for instructor in inverse_instructor_inclusions if instructor not in all_instructors[course]]

inverse_section_inclusions = [section for section in sections if section not in include_sections]
for course in all_sections:
    if not any(section in all_sections[course] for section in include_sections):
        inverse_section_inclusions = [section for section in inverse_section_inclusions if section not in all_sections[course]]

extended_exclude_sections = set(exclude_sections).union(inverse_section_inclusions)
extended_exclude_instructors = set(exclude_instructors).union(inverse_instructor_inclusions)

dfs = []
for sch in schs:
    for course in sch:
        course_name, section_no = course[0].split("-")
        if course[2] in extended_exclude_instructors or course[0] in extended_exclude_sections:
            break
    else:
        dfs.append(pd.DataFrame(schedule_into_table(sch)))


if len(dfs) > 1:
    session_state.schedule_no = st.slider("Selected combination", 1, len(dfs), 1, 1) - 1
    st.table(dfs[session_state.schedule_no - 1])
elif len(dfs):
    st.table(dfs[0])
