import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'semantic-ui-css/semantic.min.css';
import {
    Label, Menu, Table, Button, Sidebar, Grid
} from 'semantic-ui-react'
import './index.css';
import WelcomeDialog from './welcome.js';
const PolicyDialog = lazy(() => import("./policy.js"));

const course_prefixes = []
import('./course_prefixes.json').then(e => e.data.forEach(element => {
    course_prefixes.push({ "value": element, "label": element })
}));

const log = console.log
const animatedComponents = makeAnimated();
let selected_courses = []
let old_selection = []
let excluded_instructors, excluded_sections = []
const course_colors = []

class MoreOptions extends React.Component {


    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    render() {
        const section_options = []
        for (let key in this.props.all_sections)
            for (let i in this.props.all_sections[key])
                section_options.push({ "value": key + "-" + this.props.all_sections[key][i], "label": key + "-" + this.props.all_sections[key][i] })
        const instructor_options = []
        for (let key in this.props.all_instructors)
            for (let i in this.props.all_instructors[key])
                instructor_options.push({ "value": key + "-" + this.props.all_instructors[key][i], "label": key + "-" + this.props.all_instructors[key][i] })


        return (
            <div style={{ "padding": "0 0 2%" }}>
                <div style={{ "position": "absolute", "top": "4.5%", "padding": "3% 0px 2%" }}>
                    <Button icon='angle double right' onClick={() => this.setState({ visible: true })} size='huge' color='blue' />
                </div>
                <div>
                    <Grid columns={1}>
                        <Grid.Column>
                            <Sidebar
                                as={Menu}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                onHide={() => this.setState({ visible: false })}
                                vertical
                                visible={this.state.visible}
                                direction='left'
                                style={{ "width": "min(100%, 450px)" }}
                            >

                                <Menu.Item as='a'>
                                    <div>
                                        <Label content='Exclude Section' color='blue' />
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[]}
                                            isMulti
                                            options={section_options}
                                            onChange={e => { excluded_sections = e; this.props.refresh() }}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary50: 'hsl(0, 0%, 30%)',
                                                    dangerLight: '#E68900',
                                                    danger: 'black',
                                                    primary25: 'grey',
                                                    neutral0: 'black',
                                                    neutral50: 'hsl(0, 0%, 70%)',
                                                    neutral10: 'hsl(0, 0%, 20%)',
                                                    neutral80: 'white'
                                                },
                                            })}
                                            className="select"
                                        />
                                    </div>
                                </Menu.Item>

                                <Menu.Item as='a'>
                                    <div>
                                        <Label content='Exclude Instructor' color='blue' />
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[]}
                                            isMulti
                                            options={instructor_options}
                                            onChange={e => { excluded_instructors = e; this.props.refresh() }}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary50: 'hsl(0, 0%, 30%)',
                                                    dangerLight: '#E68900',
                                                    danger: 'black',
                                                    primary25: 'grey',
                                                    neutral0: 'black',
                                                    neutral50: 'hsl(0, 0%, 70%)',
                                                    neutral10: 'hsl(0, 0%, 20%)',
                                                    neutral80: 'white'
                                                },
                                            })}
                                            className="select"
                                        />
                                    </div>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button content='Cancel' color='red' onClick={() => this.setState({ visible: false })} />
                                </Menu.Item>
                            </Sidebar>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}


class CourseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course_codes: {},
            prefix_options: [],
        };
        fetch("course_codes.json").then(response => response.json()).then(data => this.setState({ course_codes: data }));
    }

    refresh_course_codes(value) {
        const options = []
        for (let i = 0; i < this.state.course_codes[value].length; i++) {
            options.push({ 'value': this.state.course_codes[value][i], 'label': this.state.course_codes[value][i] })
        }
        this.setState({ prefix_options: options })
    }

    course_prefix_select() {
        return (
            <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                options={course_prefixes}
                onChange={e => { this.refresh_course_codes(e.value) }}
                theme={theme => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary50: 'hsl(0, 0%, 30%)',
                        primary: '#737373',
                        danger: 'black',
                        primary25: 'grey',
                        neutral0: 'white',
                        neutral50: 'black',
                        neutral10: 'hsl(0, 0%, 20%)',
                        neutral40: 'hsl(0, 0%, 90%)',
                        neutral80: 'black',
                    },
                })}
                className="select" />
        );
    }

    getColor() {
        return "hsl(" + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (75 + 10 * Math.random()) + '%)'
    }
    handle_course_codes(keys) {
        const arr = []
        if (keys != null)
            keys.forEach(key => arr.push(key['value']))
        selected_courses = arr
        course_colors.push(this.getColor())
        this.props.onNewCourse()
    }


    course_code_select(options) {

        return (
            <Select

                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={options}
                onChange={e => { this.handle_course_codes(e) }}
                theme={theme => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: '#737373',
                        primary50: 'hsl(0, 0%, 30%)',
                        dangerLight: '#E68900',
                        danger: 'red',
                        primary25: 'grey',
                        neutral0: 'white',
                        neutral50: 'black',
                        neutral10: 'hsl(0, 0%, 20%)',
                        neutral80: 'white',
                    },
                })}
                className="select"
            />
        );
    }

    render() {
        return (
            <div>
                {this.course_prefix_select()}
                {this.course_code_select(this.state.prefix_options)}
            </div>
        )
    }

}


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }
    render() {
        return (
            <Table.Cell style={this.state.selected ? { 'backgroundColor': '#737373' } : {}} onClick={() => { this.setState({ selected: !this.state.selected }); this.props.onClick(this.state.selected) }}>
                {this.props.value ? <Label style={{ "width": "100%", "fontSize": this.props.value.length > 8 ? "min(1.04vw, 12.2px)" : "min(1.34vw, 14px)", "backgroundColor": course_colors[selected_courses.indexOf(this.props.value.split("-")[0])] }}>{this.props.value}</Label> : ""}
            </Table.Cell>
        )
    }
}


class Schedule extends React.Component {

    renderCell(row, column, style = {}) {
        return (
            <Cell value={this.props.schedule_table[row * 7 + column]} style={style} onClick={(selected) => this.props.blockCell(column, row, selected)}></Cell>
        )
    }

    render() {
        return (
            <div>
                <div className='table'>
                    <link rel="stylesheet" type="text/css" href="index.css"></link>
                    <Table singleLine unstackable color='grey'>
                        <Table.Header>
                            <Table.Row as='tr'>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Mon</Table.HeaderCell>
                                <Table.HeaderCell>Tue</Table.HeaderCell>
                                <Table.HeaderCell>Wed</Table.HeaderCell>
                                <Table.HeaderCell>Thu</Table.HeaderCell>
                                <Table.HeaderCell>Fri</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Sat</Table.HeaderCell>
                                <Table.HeaderCell>Sun</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>8:30-9:20</Table.HeaderCell>
                                {this.renderCell(0, 0)}
                                {this.renderCell(0, 1)}
                                {this.renderCell(0, 2)}
                                {this.renderCell(0, 3)}
                                {this.renderCell(0, 4)}
                                <Table.HeaderCell>8:30-9:20</Table.HeaderCell>
                                {this.renderCell(0, 5)}
                                {this.renderCell(0, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>9:30-10:20</Table.HeaderCell>
                                {this.renderCell(1, 0)}
                                {this.renderCell(1, 1)}
                                {this.renderCell(1, 2)}
                                {this.renderCell(1, 3)}
                                {this.renderCell(1, 4)}
                                <Table.HeaderCell>9:30-10:20</Table.HeaderCell>
                                {this.renderCell(1, 5)}
                                {this.renderCell(1, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>10:30-11:20</Table.HeaderCell>
                                {this.renderCell(2, 0)}
                                {this.renderCell(2, 1)}
                                {this.renderCell(2, 2)}
                                {this.renderCell(2, 3)}
                                {this.renderCell(2, 4)}
                                <Table.HeaderCell>10:30-11:20</Table.HeaderCell>
                                {this.renderCell(2, 5)}
                                {this.renderCell(2, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>11:30-12:20</Table.HeaderCell>
                                {this.renderCell(3, 0)}
                                {this.renderCell(3, 1)}
                                {this.renderCell(3, 2)}
                                {this.renderCell(3, 3)}
                                {this.renderCell(3, 4)}
                                <Table.HeaderCell></Table.HeaderCell>
                                {this.renderCell(3, 5)}
                                {this.renderCell(3, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>12:20-13:30</Table.HeaderCell>
                                {this.renderCell(4, 0)}
                                {this.renderCell(4, 1)}
                                {this.renderCell(4, 2)}
                                {this.renderCell(4, 3)}
                                {this.renderCell(4, 4)}
                                <Table.HeaderCell>12:00-12:50</Table.HeaderCell>
                                {this.renderCell(4, 5)}
                                {this.renderCell(4, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>13:30-14:20</Table.HeaderCell>
                                {this.renderCell(5, 0)}
                                {this.renderCell(5, 1)}
                                {this.renderCell(5, 2)}
                                {this.renderCell(5, 3)}
                                {this.renderCell(5, 4)}
                                <Table.HeaderCell>13:00-13:50</Table.HeaderCell>
                                {this.renderCell(5, 5)}
                                {this.renderCell(5, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>14:30-15:20</Table.HeaderCell>
                                {this.renderCell(6, 0)}
                                {this.renderCell(6, 1)}
                                {this.renderCell(6, 2)}
                                {this.renderCell(6, 3)}
                                {this.renderCell(6, 4)}
                                <Table.HeaderCell>14:00-14:50</Table.HeaderCell>
                                {this.renderCell(6, 5)}
                                {this.renderCell(6, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>15:30-16:20</Table.HeaderCell>
                                {this.renderCell(7, 0)}
                                {this.renderCell(7, 1)}
                                {this.renderCell(7, 2)}
                                {this.renderCell(7, 3)}
                                {this.renderCell(7, 4)}
                                <Table.HeaderCell>15:30-16:20</Table.HeaderCell>
                                {this.renderCell(7, 5)}
                                {this.renderCell(7, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>16:20-17:30</Table.HeaderCell>
                                {this.renderCell(8, 0)}
                                {this.renderCell(8, 1)}
                                {this.renderCell(8, 2)}
                                {this.renderCell(8, 3)}
                                {this.renderCell(8, 4)}
                                <Table.HeaderCell>16:30-17:20</Table.HeaderCell>
                                                {this.renderCell(8, 5)}
                                                {this.renderCell(8, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>17:30-18:20</Table.HeaderCell>
                                {this.renderCell(9, 0)}
                                {this.renderCell(9, 1)}
                                {this.renderCell(9, 2)}
                                {this.renderCell(9, 3)}
                                {this.renderCell(9, 4)}
                                <Table.HeaderCell>17:30-18:20</Table.HeaderCell>
                                                {this.renderCell(9, 5)}
                                                {this.renderCell(9, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>18:30-19:20</Table.HeaderCell>
                                {this.renderCell(10, 0)}
                                {this.renderCell(10, 1)}
                                {this.renderCell(10, 2)}
                                {this.renderCell(10, 3)}
                                {this.renderCell(10, 4)}
                                <Table.HeaderCell>18:30-19:20</Table.HeaderCell>
                                                {this.renderCell(10, 5)}
                                                {this.renderCell(10, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>19:20-20:00</Table.HeaderCell>
                                {this.renderCell(11, 0)}
                                {this.renderCell(11, 1)}
                                {this.renderCell(11, 2)}
                                {this.renderCell(11, 3)}
                                {this.renderCell(11, 4)}
                                <Table.HeaderCell>19:30-20:20</Table.HeaderCell>
                                                {this.renderCell(11, 5)}
                                                {this.renderCell(11, 6)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>20:00-20:50</Table.HeaderCell>
                                {this.renderCell(12, 0)}
                                {this.renderCell(12, 1)}
                                {this.renderCell(12, 2)}
                                {this.renderCell(12, 3)}
                                {this.renderCell(12, 4)}
                            </Table.Row>
                            <tr style={{ "height": "2px" }} />
                            <Table.Row>
                                <Table.HeaderCell>21:00-21:50</Table.HeaderCell>
                                {this.renderCell(13, 0)}
                                {this.renderCell(13, 1)}
                                {this.renderCell(13, 2)}
                                {this.renderCell(13, 3)}
                                {this.renderCell(13, 4)}
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </div>
            </div>
        );
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule_table: [],
            recvd_data: [],
            valid_combos: [],
            blocked_cells: { "Mon": [], "Tue": [], "Wed": [], "Thu": [], "Fri": [], "Sat": [], "Sun": [] },
            schedule_no: 0,
            all_sections: {},
            all_instructors: {}
        };
    }

    product(args) {
        return args.reduce(function tl(accumulator, value) {
            var tmp = [];
            accumulator.forEach(function (a0) {
                value.forEach(function (a1) {
                    tmp.push(a0.concat(a1));
                });
            });
            return tmp;
        }, [[]]);
    }


    check_time_collision(course_combo) {

        for (let i in excluded_sections) {
            let str_arr = excluded_sections[i]["value"].split("-")
            if (course_combo[selected_courses.indexOf(str_arr[0])] === str_arr[1])
                return false
        }
        for (let i in excluded_instructors) {
            let str_arr = excluded_instructors[i]["value"].split("-")
            if (this.state.recvd_data[selected_courses.indexOf(str_arr[0])][course_combo[selected_courses.indexOf(str_arr[0])]][0] === str_arr[1])
                return false
        }

        let schedule = {}
        for (let i = 0; i < course_combo.length; i++) {
            let course_times = this.state.recvd_data[i][course_combo[i]][1]
            for (let day in course_times) {
                if (!(day in schedule)) {
                    schedule[day] = []
                }
                if (course_times[day].some(i => schedule[day].includes(i)) || course_times[day].some(i => this.state.blocked_cells[day].includes(i)))
                    return false
                schedule[day].push(...course_times[day])
            }
        }
        return true
    }

    create_table(valid_combo) {
        const current_schedule = []
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 7; j++) {
                for (let k = 0; k < valid_combo.length; k++) {
                    let section_no = valid_combo[k]
                    let course_name = selected_courses[k]
                    let course_hours = this.state.recvd_data[k][section_no][1]
                    if (course_hours[days[j]] && course_hours[days[j]].includes(i)) {
                        current_schedule[i * 7 + j] = course_name + "-" + section_no
                    }
                    else if (!current_schedule[i * 7 + j])
                        current_schedule[i * 7 + j] = ""
                }
            }
        }
        this.setState({ schedule_table: current_schedule })
    }

    async get_schedules() {
        if (!(selected_courses.length)) {
            old_selection = selected_courses;
            this.setState({ schedule_no: 0, schedule_table: [], valid_combos: [] })
            return
        }

        if (old_selection !== selected_courses) {
            let str = selected_courses.join(",")
            await fetch('http://54.159.35.2:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "data=" + str
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({ recvd_data: data.data })
                });
            old_selection = selected_courses;
        }
        let all_combos = []
        let section_list = []
        await this.state.recvd_data.forEach(course => {
            section_list.push(Object.keys(course));
        });
        all_combos = this.product(section_list)

        let valid_combos = []
        await all_combos.forEach(combo => {
            if (this.check_time_collision(combo))
                valid_combos.push(combo)
        })

        let all_sections = {}
        for (let i = 0; i < valid_combos.length; i++) {
            for (let j = 0; j < valid_combos[i].length; j++) {
                if (!all_sections[selected_courses[j]])
                    all_sections[selected_courses[j]] = []
                if (!all_sections[selected_courses[j]].includes(valid_combos[i][j]))
                    all_sections[selected_courses[j]].push(valid_combos[i][j])
            }
        }
        if (all_sections.length)
            for (let i = 0; i < selected_courses.length; i++)
                all_sections[selected_courses[i]].sort()

        let all_instructors = {}
        for (let i = 0; i < valid_combos.length; i++) {
            for (let j = 0; j < valid_combos[i].length; j++) {
                if (!all_instructors[selected_courses[j]])
                    all_instructors[selected_courses[j]] = []
                if (!all_instructors[selected_courses[j]].includes(this.state.recvd_data[j][valid_combos[i][j]][0]))
                    all_instructors[selected_courses[j]].push(this.state.recvd_data[j][valid_combos[i][j]][0])
            }
        }
        if (all_instructors.length)
            for (let i = 0; i < selected_courses.length; i++)
                all_instructors[selected_courses[i]].sort()

        this.setState({ all_instructors: all_instructors, all_sections: all_sections, valid_combos: valid_combos })
        if (valid_combos.length)
            this.create_table(this.state.valid_combos[0])
        else
            this.setState({ schedule_table: [] })
        this.setState({ schedule_no: 0 })
    }

    nextSchedule(inc) {
        let schedule_no = this.state.schedule_no + inc
        let n = this.state.valid_combos.length
        schedule_no = ((schedule_no % n) + n) % n
        if (this.state.valid_combos[schedule_no])
            this.create_table(this.state.valid_combos[schedule_no])
        this.setState({ schedule_no: schedule_no })
    }

    blockCell(column, row, selected) {
        let blocked_cells = this.state.blocked_cells
        if (!selected)
            if (column === 0)
                blocked_cells["Mon"].push(row)
            else if (column === 1)
                blocked_cells["Tue"].push(row)
            else if (column === 2)
                blocked_cells["Wed"].push(row)
            else if (column === 3)
                blocked_cells["Thu"].push(row)
            else if (column === 4)
                blocked_cells["Fri"].push(row)
            else if (column === 5)
                blocked_cells["Sat"].push(row)
            else
                blocked_cells["Sun"].push(row)
        else {
            if (column === 0) {
                if (blocked_cells["Mon"].indexOf(row) > -1)
                    blocked_cells["Mon"].splice(blocked_cells["Mon"].indexOf(row), 1)
            }
            else if (column === 1) {
                if (blocked_cells["Tue"].indexOf(row) > -1)
                    blocked_cells["Tue"].splice(blocked_cells["Tue"].indexOf(row), 1)
            }
            else if (column === 2) {
                if (blocked_cells["Wed"].indexOf(row) > -1)
                    blocked_cells["Wed"].splice(blocked_cells["Wed"].indexOf(row), 1)
            }
            else if (column === 3) {
                if (blocked_cells["Thu"].indexOf(row) > -1)
                    blocked_cells["Thu"].splice(blocked_cells["Thu"].indexOf(row), 1)
            }
            else if (column === 4) {
                if (blocked_cells["Fri"].indexOf(row) > -1)
                    blocked_cells["Fri"].splice(blocked_cells["Fri"].indexOf(row), 1)
            }
            else if (column === 5) {
                if (blocked_cells["Sat"].indexOf(row) > -1)
                    blocked_cells["Sat"].splice(blocked_cells["Sat"].indexOf(row), 1)
            }
            else if (column === 6) {
                if (blocked_cells["Sun"].indexOf(row) > -1)
                    blocked_cells["Sun"].splice(blocked_cells["Sun"].indexOf(row), 1)
            }
        }
        log(blocked_cells)

        this.setState({ blocked_cells: blocked_cells })
    }

    render() {
        return (
            <div style={{ "position": "relative", "width": "100%" }}>
                <WelcomeDialog></WelcomeDialog>
                <MoreOptions all_sections={this.state.all_sections} all_instructors={this.state.all_instructors} refresh={() => this.get_schedules()} />
                <h1 style={{ "textAlign": "center", "padding": "3% 0 2%", "fontSize": "min(8vw, 2.7em)" }}>Bilkent Scheduler</h1>
                <div style={{ "position": "relative", "left": "50%", "transform": "translateX(-50%)", "width": "100%", "maxWidth": "1000px" }}>
                    <div style={{ "padding": "3% 0 3%" }}>
                        <CourseSelection onNewCourse={() => this.get_schedules()} />
                    </div>
                    <table style={{ "overflow": "auto", "width": "100%" }}>
                        <tbody>
                            <tr>
                                <td id="npbutton" className='prevbutton'>
                                    <Button onClick={() => this.nextSchedule(-1)} color='blue'>Prev</Button>
                                </td>
                                <td className='combination'>Combination {this.state.valid_combos.length ? (this.state.schedule_no + 1) : 0} out of {this.state.valid_combos.length ? this.state.valid_combos.length : 0}</td>
                                <td id="npbutton" className='nextbutton'>
                                    <Button onClick={() => this.nextSchedule(1)} color='blue'>Next</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <Schedule schedule_table={this.state.schedule_table} blockCell={(column, row, selected) => { this.blockCell(column, row, selected); this.get_schedules() }} />
                    </div>

                    <div style={{ "textAlign": "center", "margin": "auto", "position": "relative", "left": "0", "bottom": "0", "width": "100%", "padding": "110px 0 10px" }}>
                        Try ctrl-f5 if something doesn't work<br />
                        Do you have suggestions or want to contribute?<br />
                        Send a bug report or pull request: <a href="https://github.com/scarypercentage/bilkent-course-scheduler" title="Github">Github</a><br />
                        This site uses everything Google Analytics offers for fun. <br /> Google Analytic uses your cookies and identifiers. <br /> You may choose to <a href="https://tools.google.com/dlpage/gaoptout/" title="optout">opt-out</a>. For more info see the <Suspense fallback={<div>Loading...</div>}><PolicyDialog /></Suspense><br />
                        Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a><br />
                        Powered by React.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Theme by Semantic-UI
                    </div>
                </div>

            </div>
        )
    }

}



ReactDOM.render(<Main />, document.getElementById('root'));
