import React from 'react';
import ReactDOM from 'react-dom';
//import "bootswatch/dist/darkly/bootstrap.min.css";
import './index.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import course_codes from './course_codes.json';
import 'semantic-ui-css/semantic.min.css';
import {
    Icon, Label, Menu, Table, Button, Sidebar, Grid,
    Header,
    Image,
    Segment,
    SegmentInline
} from 'semantic-ui-react'

const course_prefixes = [{ value: 'ACC', label: 'ACC' }, { value: 'ADA', label: 'ADA' }, { value: 'AMER', label: 'AMER' }, { value: 'ARCH', label: 'ARCH' }, { value: 'BF', label: 'BF' }, { value: 'BIM', label: 'BIM' }, { value: 'BTE', label: 'BTE' }, { value: 'CHEM', label: 'CHEM' }, { value: 'CI', label: 'CI' }, { value: 'CINT', label: 'CINT' }, { value: 'COMD', label: 'COMD' }, { value: 'CS', label: 'CS' }, { value: 'CTE', label: 'CTE' }, { value: 'CTIS', label: 'CTIS' }, { value: 'ECON', label: 'ECON' }, { value: 'EDEB', label: 'EDEB' }, { value: 'EEE', label: 'EEE' }, { value: 'EEPS', label: 'EEPS' }, { value: 'ELIT', label: 'ELIT' }, { value: 'ELS', label: 'ELS' }, { value: 'EMBA', label: 'EMBA' }, { value: 'ENG', label: 'ENG' }, { value: 'ETE', label: 'ETE' }, { value: 'FA', label: 'FA' }, { value: 'FRP', label: 'FRP' }, { value: 'GE', label: 'GE' }, { value: 'GRA', label: 'GRA' }, { value: 'HART', label: 'HART' }, { value: 'HCIV', label: 'HCIV' }, { value: 'HIST', label: 'HIST' }, { value: 'HUM', label: 'HUM' }, { value: 'IAED', label: 'IAED' }, { value: 'IE', label: 'IE' }, { value: 'IELTS', label: 'IELTS' }, { value: 'IR', label: 'IR' }, { value: 'LAUD', label: 'LAUD' }, { value: 'LAW', label: 'LAW' }, { value: 'LNG', label: 'LNG' }, { value: 'MAN', label: 'MAN' }, { value: 'MATH', label: 'MATH' }, { value: 'MBA', label: 'MBA' }, { value: 'MBG', label: 'MBG' }, { value: 'ME', label: 'ME' }, { value: 'MIAPP', label: 'MIAPP' }, { value: 'MSC', label: 'MSC' }, { value: 'MSN', label: 'MSN' }, { value: 'MTE', label: 'MTE' }, { value: 'MUS', label: 'MUS' }, { value: 'NSC', label: 'NSC' }, { value: 'PE', label: 'PE' }, { value: 'PHIL', label: 'PHIL' }, { value: 'PHYS', label: 'PHYS' }, { value: 'POLS', label: 'POLS' }, { value: 'PREP', label: 'PREP' }, { value: 'PSYC', label: 'PSYC' }, { value: 'SFL', label: 'SFL' }, { value: 'SOC', label: 'SOC' }, { value: 'TE', label: 'TE' }, { value: 'TEFL', label: 'TEFL' }, { value: 'THEA', label: 'THEA' }, { value: 'THM', label: 'THM' }, { value: 'THR', label: 'THR' }, { value: 'TOEFL', label: 'TOEFL' }, { value: 'TRIN', label: 'TRIN' }, { value: 'TURK', label: 'TURK' }]
const animatedComponents = makeAnimated();
let selected_courses = []
let old_selection = []
let excluded_instructors, excluded_sections = []


class MoreOptions extends React.Component {


    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    exclude_section() { }

    include_instructor() { }

    exclude_instructor() { }

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
            <div>
                <link rel="stylesheet" type="text/css" href="index.css"></link>
                <Grid columns={1}>
                    <Grid.Column>
                        <Button content='More Options' onClick={() => this.setState({ visible: true })} />
                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            onHide={() => this.setState({ visible: false })}
                            vertical
                            visible={this.state.visible}
                            width='very wide'
                            direction='left'

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
                            <Button content='Cancel' color='red' onClick={() => this.setState({ visible: false })} />
                        </Sidebar>
                    </Grid.Column>
                </Grid>
            </div>);
    }
}


class CourseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix_options: [],
        };
    }

    refresh_course_codes(value) {
        const options = []
        for (let i = 0; i < course_codes[value].length; i++) {
            options.push({ 'value': course_codes[value][i], 'label': course_codes[value][i] })
        }
        this.setState({ prefix_options: options })
    }

    course_prefix_select() {
        return (
            <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                //isMulti
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

    handle_course_codes(keys) {
        const arr = []
        if (keys != null)
            keys.forEach(key => arr.push(key['value']))
        selected_courses = arr
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
                <link rel="stylesheet" type="text/css" href="index.css"></link>
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
            <Table.Cell style={this.state.selected ? { 'backgroundColor': '#737373' } : {}} onClick={() => { this.setState({ selected: !this.state.selected }); this.props.onClick(this.state.selected) }}><label>{this.props.value}</label></Table.Cell>
        )
    }
}


class Schedule extends React.Component {

    renderCell(row, column) {
        return (
            <Cell value={this.props.schedule_table[row * 5 + column]} onClick={(selected) => this.props.blockCell(column, row, selected)}></Cell>
        )
    }

    render() {
        return (
            <div>
                <div class='table'>
                    <link rel="stylesheet" type="text/css" href="index.css"></link>
                    <Table singleLine unstackable color='grey' textAlign='center'>
                        <Table.Header>
                            <Table.Row as='tr'>
                                <Table.HeaderCell ></Table.HeaderCell>
                                <Table.HeaderCell>Mon</Table.HeaderCell>
                                <Table.HeaderCell>Tue</Table.HeaderCell>
                                <Table.HeaderCell>Wed</Table.HeaderCell>
                                <Table.HeaderCell>Thu</Table.HeaderCell>
                                <Table.HeaderCell>Fri</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>8:40-9:30</Table.HeaderCell>
                                {this.renderCell(0, 0)}
                                {this.renderCell(0, 1)}
                                {this.renderCell(0, 2)}
                                {this.renderCell(0, 3)}
                                {this.renderCell(0, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>9:40-10:30</Table.HeaderCell>
                                {this.renderCell(1, 0)}
                                {this.renderCell(1, 1)}
                                {this.renderCell(1, 2)}
                                {this.renderCell(1, 3)}
                                {this.renderCell(1, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>10:40-11:30</Table.HeaderCell>
                                {this.renderCell(2, 0)}
                                {this.renderCell(2, 1)}
                                {this.renderCell(2, 2)}
                                {this.renderCell(2, 3)}
                                {this.renderCell(2, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>11:40-12:30</Table.HeaderCell>
                                {this.renderCell(3, 0)}
                                {this.renderCell(3, 1)}
                                {this.renderCell(3, 2)}
                                {this.renderCell(3, 3)}
                                {this.renderCell(3, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>12:40-13:30</Table.HeaderCell>
                                {this.renderCell(4, 0)}
                                {this.renderCell(4, 1)}
                                {this.renderCell(4, 2)}
                                {this.renderCell(4, 3)}
                                {this.renderCell(4, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>13:40-14:30</Table.HeaderCell>
                                {this.renderCell(5, 0)}
                                {this.renderCell(5, 1)}
                                {this.renderCell(5, 2)}
                                {this.renderCell(5, 3)}
                                {this.renderCell(5, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>14:40-15:30</Table.HeaderCell>
                                {this.renderCell(6, 0)}
                                {this.renderCell(6, 1)}
                                {this.renderCell(6, 2)}
                                {this.renderCell(6, 3)}
                                {this.renderCell(6, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>15:40-16:30</Table.HeaderCell>
                                {this.renderCell(7, 0)}
                                {this.renderCell(7, 1)}
                                {this.renderCell(7, 2)}
                                {this.renderCell(7, 3)}
                                {this.renderCell(7, 4)}
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>16:40-17:30</Table.HeaderCell>
                                {this.renderCell(8, 0)}
                                {this.renderCell(8, 1)}
                                {this.renderCell(8, 2)}
                                {this.renderCell(8, 3)}
                                {this.renderCell(8, 4)}
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
            blocked_cells: { "Mon": [], "Tue": [], "Wed": [], "Thu": [], "Fri": [] },
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
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                for (let k = 0; k < valid_combo.length; k++) {
                    let section_no = valid_combo[k]
                    let course_name = selected_courses[k]
                    let course_hours = this.state.recvd_data[k][section_no][1]
                    if (course_hours[days[j]] && course_hours[days[j]].includes(i)) {
                        current_schedule[i * 5 + j] = course_name + "-" + section_no
                    }
                    else if (!current_schedule[i * 5 + j])
                        current_schedule[i * 5 + j] = ""
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
            await fetch('/api', {
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
            else
                blocked_cells["Fri"].push(row)
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
            else {
                if (blocked_cells["Fri"].indexOf(row) > -1)
                    blocked_cells["Fri"].splice(blocked_cells["Fri"].indexOf(row), 1)
            }
        }
        this.setState({ blocked_cells: blocked_cells })
    }

    render() {
        return (
            <div>
                <CourseSelection onNewCourse={() => this.get_schedules()} />
                <br />
                <center>Combination {this.state.valid_combos.length ? (this.state.schedule_no + 1) : 0} out of {this.state.valid_combos.length ? this.state.valid_combos.length : 0}</center>
                <Schedule schedule_table={this.state.schedule_table} blockCell={(column, row, selected) => { this.blockCell(column, row, selected); this.get_schedules() }} />
                <Button onClick={() => this.nextSchedule(-1)}>Prev</Button>
                <Button onClick={() => this.nextSchedule(1)}>Next</Button>
                <MoreOptions all_sections={this.state.all_sections} all_instructors={this.state.all_instructors} refresh={() => this.get_schedules()} />
            </div>
        )
    }

}



ReactDOM.render(<Main />, document.getElementById('root'));

