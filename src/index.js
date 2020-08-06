import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/darkly/bootstrap.min.css";
import './index.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import course_codes from './course_codes.json';

const course_prefixes = [{ value: 'ACC', label: 'ACC' }, { value: 'ADA', label: 'ADA' }, { value: 'AMER', label: 'AMER' }, { value: 'ARCH', label: 'ARCH' }, { value: 'BF', label: 'BF' }, { value: 'BIM', label: 'BIM' }, { value: 'BTE', label: 'BTE' }, { value: 'CHEM', label: 'CHEM' }, { value: 'CI', label: 'CI' }, { value: 'CINT', label: 'CINT' }, { value: 'COMD', label: 'COMD' }, { value: 'CS', label: 'CS' }, { value: 'CTE', label: 'CTE' }, { value: 'CTIS', label: 'CTIS' }, { value: 'ECON', label: 'ECON' }, { value: 'EDEB', label: 'EDEB' }, { value: 'EEE', label: 'EEE' }, { value: 'EEPS', label: 'EEPS' }, { value: 'ELIT', label: 'ELIT' }, { value: 'ELS', label: 'ELS' }, { value: 'EMBA', label: 'EMBA' }, { value: 'ENG', label: 'ENG' }, { value: 'ETE', label: 'ETE' }, { value: 'FA', label: 'FA' }, { value: 'FRP', label: 'FRP' }, { value: 'GE', label: 'GE' }, { value: 'GRA', label: 'GRA' }, { value: 'HART', label: 'HART' }, { value: 'HCIV', label: 'HCIV' }, { value: 'HIST', label: 'HIST' }, { value: 'HUM', label: 'HUM' }, { value: 'IAED', label: 'IAED' }, { value: 'IE', label: 'IE' }, { value: 'IELTS', label: 'IELTS' }, { value: 'IR', label: 'IR' }, { value: 'LAUD', label: 'LAUD' }, { value: 'LAW', label: 'LAW' }, { value: 'LNG', label: 'LNG' }, { value: 'MAN', label: 'MAN' }, { value: 'MATH', label: 'MATH' }, { value: 'MBA', label: 'MBA' }, { value: 'MBG', label: 'MBG' }, { value: 'ME', label: 'ME' }, { value: 'MIAPP', label: 'MIAPP' }, { value: 'MSC', label: 'MSC' }, { value: 'MSN', label: 'MSN' }, { value: 'MTE', label: 'MTE' }, { value: 'MUS', label: 'MUS' }, { value: 'NSC', label: 'NSC' }, { value: 'PE', label: 'PE' }, { value: 'PHIL', label: 'PHIL' }, { value: 'PHYS', label: 'PHYS' }, { value: 'POLS', label: 'POLS' }, { value: 'PREP', label: 'PREP' }, { value: 'PSYC', label: 'PSYC' }, { value: 'SFL', label: 'SFL' }, { value: 'SOC', label: 'SOC' }, { value: 'TE', label: 'TE' }, { value: 'TEFL', label: 'TEFL' }, { value: 'THEA', label: 'THEA' }, { value: 'THM', label: 'THM' }, { value: 'THR', label: 'THR' }, { value: 'TOEFL', label: 'TOEFL' }, { value: 'TRIN', label: 'TRIN' }, { value: 'TURK', label: 'TURK' }]

const animatedComponents = makeAnimated();




class CourseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix_options: [],
            selected_courses: []
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
        this.setState({ selected_courses: arr })
        //alert(JSON.stringify(arr));
    }


    course_code_select(options) {

        return (
            <Select
                
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[{'value': 'EE102', 'label': 'EE102'}]}
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
            selected: false,
        };
    }
    render() {
        return (
            <td style={this.state.selected?{'background-color':'#737373'}:{}} onClick={() => {this.props.onClick(); this.setState({selected: !this.state.selected})}}>{this.props.value}</td>
        )
    }
}


class Game extends React.Component {
    blockCell(column, row) {
        //TODO: discard all with that cell full
    }

    renderCell(column, row) {
        return (
            <Cell value="Random stuff" pos={column * 5 + row} onClick={() => this.blockCell(column, row)} class="cell"></Cell>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <link rel="stylesheet" type="text/css" href="index.css"></link>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" class="day">Mon</th>
                                <th scope="col" class="day">Tue</th>
                                <th scope="col" class="day">Wed</th>
                                <th scope="col" class="day">Thu</th>
                                <th scope="col" class="day">Fri</th>
                            </tr>
                        </thead>
                        <tbody class="table-dark">
                            <tr>
                                <th scope="row" class="hours">8:40-9:30</th>
                                {this.renderCell(0, 0)}
                                {this.renderCell(0, 1)}
                                {this.renderCell(0, 2)}
                                {this.renderCell(0, 3)}
                                {this.renderCell(0, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">9:40-10:30</th>
                                {this.renderCell(1, 0)}
                                {this.renderCell(1, 1)}
                                {this.renderCell(1, 2)}
                                {this.renderCell(1, 3)}
                                {this.renderCell(1, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">10:40-11:30</th>
                                {this.renderCell(2, 0)}
                                {this.renderCell(2, 1)}
                                {this.renderCell(2, 2)}
                                {this.renderCell(2, 3)}
                                {this.renderCell(2, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">11:40-12:30</th>
                                {this.renderCell(3, 0)}
                                {this.renderCell(3, 1)}
                                {this.renderCell(3, 2)}
                                {this.renderCell(3, 3)}
                                {this.renderCell(3, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">13:40-14:30</th>
                                {this.renderCell(4, 0)}
                                {this.renderCell(4, 1)}
                                {this.renderCell(4, 2)}
                                {this.renderCell(4, 3)}
                                {this.renderCell(4, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">14:40-15:30</th>
                                {this.renderCell(5, 0)}
                                {this.renderCell(5, 1)}
                                {this.renderCell(5, 2)}
                                {this.renderCell(5, 3)}
                                {this.renderCell(5, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">15:40-16:30</th>
                                {this.renderCell(6, 0)}
                                {this.renderCell(6, 1)}
                                {this.renderCell(6, 2)}
                                {this.renderCell(6, 3)}
                                {this.renderCell(6, 4)}
                            </tr>
                            <tr>
                                <th scope="row" class="hours">16:40-17:30</th>
                                {this.renderCell(7, 0)}
                                {this.renderCell(7, 1)}
                                {this.renderCell(7, 2)}
                                {this.renderCell(7, 3)}
                                {this.renderCell(7, 4)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class Test extends React.Component {
    render() {
        return (
            <Select className="mt-4 col-md-8 col-offset-4" />
        );
    }
}

// ========================================


/*
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);*/

ReactDOM.render(<div><CourseSelection /><Game /></div>, document.getElementById('root'));