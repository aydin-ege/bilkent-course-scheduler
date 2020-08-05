import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/darkly/bootstrap.min.css";
import './index.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import course_codes from './course_codes.json';

const course_prefixes = [{ value: 'ACC', label: 'ACC' }, { value: 'ADA', label: 'ADA' }, { value: 'AMER', label: 'AMER' }, { value: 'ARCH', label: 'ARCH' }, { value: 'BF', label: 'BF' }, { value: 'BIM', label: 'BIM' }, { value: 'BTE', label: 'BTE' }, { value: 'CHEM', label: 'CHEM' }, { value: 'CI', label: 'CI' }, { value: 'CINT', label: 'CINT' }, { value: 'COMD', label: 'COMD' }, { value: 'CS', label: 'CS' }, { value: 'CTE', label: 'CTE' }, { value: 'CTIS', label: 'CTIS' }, { value: 'ECON', label: 'ECON' }, { value: 'EDEB', label: 'EDEB' }, { value: 'EEE', label: 'EEE' }, { value: 'EEPS', label: 'EEPS' }, { value: 'ELIT', label: 'ELIT' }, { value: 'ELS', label: 'ELS' }, { value: 'EMBA', label: 'EMBA' }, { value: 'ENG', label: 'ENG' }, { value: 'ETE', label: 'ETE' }, { value: 'FA', label: 'FA' }, { value: 'FRP', label: 'FRP' }, { value: 'GE', label: 'GE' }, { value: 'GRA', label: 'GRA' }, { value: 'HART', label: 'HART' }, { value: 'HCIV', label: 'HCIV' }, { value: 'HIST', label: 'HIST' }, { value: 'HUM', label: 'HUM' }, { value: 'IAED', label: 'IAED' }, { value: 'IE', label: 'IE' }, { value: 'IELTS', label: 'IELTS' }, { value: 'IR', label: 'IR' }, { value: 'LAUD', label: 'LAUD' }, { value: 'LAW', label: 'LAW' }, { value: 'LNG', label: 'LNG' }, { value: 'MAN', label: 'MAN' }, { value: 'MATH', label: 'MATH' }, { value: 'MBA', label: 'MBA' }, { value: 'MBG', label: 'MBG' }, { value: 'ME', label: 'ME' }, { value: 'MIAPP', label: 'MIAPP' }, { value: 'MSC', label: 'MSC' }, { value: 'MSN', label: 'MSN' }, { value: 'MTE', label: 'MTE' }, { value: 'MUS', label: 'MUS' }, { value: 'NSC', label: 'NSC' }, { value: 'PE', label: 'PE' }, { value: 'PHIL', label: 'PHIL' }, { value: 'PHYS', label: 'PHYS' }, { value: 'POLS', label: 'POLS' }, { value: 'PREP', label: 'PREP' }, { value: 'PSYC', label: 'PSYC' }, { value: 'SFL', label: 'SFL' }, { value: 'SOC', label: 'SOC' }, { value: 'TE', label: 'TE' }, { value: 'TEFL', label: 'TEFL' }, { value: 'THEA', label: 'THEA' }, { value: 'THM', label: 'THM' }, { value: 'THR', label: 'THR' }, { value: 'TOEFL', label: 'TOEFL' }, { value: 'TRIN', label: 'TRIN' }, { value: 'TURK', label: 'TURK' }]

const animatedComponents = makeAnimated();
let selected_courses = []
let recvd_data = []


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
                    borderRadius: 4,
                    colors: {
                        ...theme.colors,
                        primary50: 'hsl(0, 0%, 30%)',
                        primary: '#737373',
                        danger: 'black',
                        primary25: 'grey',
                        neutral0: 'black',
                        neutral50: 'hsl(0, 0%, 70%)',
                        neutral10: 'hsl(0, 0%, 20%)',
                        neutral40: 'hsl(0, 0%, 90%)',
                        neutral80: 'hsl(0, 0%, 70%)'
                    },
                })}
            />
        );
    }

    handle_course_codes(keys) {
        const arr = []
        if (keys != null)
            keys.forEach(key => arr.push(key['value']))
        selected_courses = arr
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
                    borderRadius: 4,
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
            selected: false
        };
    }
    render() {
        return (
            <td style={this.state.selected ? { 'background-color': '#737373' } : {}} onClick={() => { this.props.onClick(); this.setState({ selected: !this.state.selected }) }}>{this.props.value}</td>
        )
    }
}


class Schedule extends React.Component {
    blockCell(column, row) {
        //TODO: discard all with that cell full
    }

    renderCell(column, row) {
        return (
            <Cell value="Random stuff" pos={column * 5 + row} onClick={() => this.blockCell(column, row)}></Cell>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Mon</th>
                                <th scope="col">Tue</th>
                                <th scope="col">Wed</th>
                                <th scope="col">Thu</th>
                                <th scope="col">Fri</th>
                            </tr>
                        </thead>
                        <tbody class="table-dark">
                            <tr>
                                <th scope="row">8:40-9:30</th>
                                {this.renderCell(0, 0)}
                                {this.renderCell(0, 1)}
                                {this.renderCell(0, 2)}
                                {this.renderCell(0, 3)}
                                {this.renderCell(0, 4)}
                            </tr>
                            <tr>
                                <th scope="row">9:40-10:30</th>
                                {this.renderCell(1, 0)}
                                {this.renderCell(1, 1)}
                                {this.renderCell(1, 2)}
                                {this.renderCell(1, 3)}
                                {this.renderCell(1, 4)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function check_time_collision(course_combo) {
    let schedule = {}
    for (let i = 0; i < course_combo.length; i++) {
        let course_times = recvd_data[i][course_combo[i]][1]
        for (var day in course_times) {
            if (!(day in schedule)) {
                schedule[day] = []
            }
            if (course_times[day].some(i => schedule[day].includes(i)))
                return false
            schedule[day].push(...course_times[day])
        }
    }
    return true
}

function product(args) {
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

async function get_schedules() {
    let all_combos = []
    let str = selected_courses.join(",")
    console.log(JSON.stringify({"data": str}))
    await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "data="+str
    })
        .then(res => res.json())
        .then(data => {
            recvd_data = data.data
            let section_list = []
            data.data.forEach(course => {
                section_list.push(Object.keys(course));
            });
            all_combos = product(section_list)
        });

    let valid_combos = []
    all_combos.forEach(combo => {
        if (check_time_collision(combo))
            valid_combos.push(combo)
    })
    console.log(valid_combos)
}
// ========================================


ReactDOM.render(<div><CourseSelection /><Schedule /><button onClick={() => get_schedules()}>Get Schedules</button></div>, document.getElementById('root'));