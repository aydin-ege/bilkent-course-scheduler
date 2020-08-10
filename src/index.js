import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/darkly/bootstrap.min.css";
import './index.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import course_codes from './course_codes.json';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Label, Menu, Table, Button, Sidebar, Grid,
    Header,
    Image,
    Segment,
    SegmentInline} from 'semantic-ui-react'

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
                className= "select"/>
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
                className = "select"
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
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>9:40-10:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>10:40-11:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>11:40-12:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>12:40-13:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>13:40-14:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>14:40-15:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>15:40-16:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>16:40-17:30</Table.HeaderCell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                                <Table.Cell><Label>Random Stuff</Label></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        </Table>
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

class MoreOptions extends React.Component{

    
    constructor(props){
        super(props);
        this.state = {visible: false};
    }

    include_section(){}

    exclude_section(){}

    include_instructor(){}

    exclude_instructor(){}

    show_menu(){
        this.setState({visible: true});
    }

    hide_menu(){
        this.setState({visible: false});
    }

    render(){
        return (    
                <div>    
                    <link rel="stylesheet" type="text/css" href="index.css"></link>      
                    <Grid columns={1}>
                        <Grid.Column>
                        <Button content='More Options' onClick={() => this.show_menu()}/>   
                            <Sidebar 
                                as={Menu}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                onHide={() => this.hide_menu()}
                                vertical
                                visible={this.state.visible}
                                width='very wide'
                                direction='left'
                                
                            >
                                <Menu.Item as='a'>
                                    <div>
                                        <Label content='Include Section' color='blue'/>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[{'value': 'EE102', 'label': 'EE102'}]}
                                            isMulti
                                            //options={options}
                                            //onChange={e => { this.handle_course_codes(e) }}
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
                                            className = "select"
                                        />
                                    </div>
                                </Menu.Item>

                                <Menu.Item as='a'>
                                <div>
                                        <Label content='Exclude Section' color='blue'/>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[{'value': 'EE102', 'label': 'EE102'}]}
                                            isMulti
                                            //options={options}
                                            //onChange={e => { this.handle_course_codes(e) }}
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
                                            className = "select"
                                        />
                                    </div>
                                </Menu.Item>

                                <Menu.Item as='a'>
                                <div>
                                        <Label content='Include Instructor' color='blue'/>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[{'value': 'EE102', 'label': 'EE102'}]}
                                            isMulti
                                            //options={options}
                                            //onChange={e => { this.handle_course_codes(e) }}
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
                                            className = "select"
                                        />
                                    </div>
                                </Menu.Item>

                                <Menu.Item as='a'>
                                <div>
                                        <Label content='Exclude Instructor' color='blue'/>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[{'value': 'EE102', 'label': 'EE102'}]}
                                            isMulti
                                            //options={options}
                                            //onChange={e => { this.handle_course_codes(e) }}
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
                                            className = "select"
                                        />
                                    </div>
                                </Menu.Item>
                                <Button content='Cancel' color='red' onClick={() => this.hide_menu()} />
                            </Sidebar>
                        </Grid.Column>
                    </Grid>
                </div>);    
        }   
    }


// ========================================


/*
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);*/

ReactDOM.render(<div><MoreOptions /><CourseSelection /><Game /></div>, document.getElementById('root'));