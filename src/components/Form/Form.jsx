import { Component } from "react";
import { Form, Label, Input, BtnSubmit } from "./Form.styled";
import propTypes from 'prop-types'
import {nanoid} from 'nanoid'

export class Form extends Component{
    state = {
        name:'',
        number:'',
    }

    formChange = evt => {
        const {name,value} = evt.target;
        this.setState({[name]:value})
    };

    formSubmit = evt =>{
        evt.preventDefault();
        const {name,number} = this.state;
        const contact = {name,number,id:nanoid()};
        this.props.onSubmit(contact);
        this.props.clear();
    }

    clear = () => {
        this.setState({
            name:'',
            number:'',
        })
    };

    render(){
        const {name,number} = this.state;
        return(
            <Form onSubmit={this.formSubmit}>
                <Label>Name
                    <Input
                    type="text"
                    name="name"
                    id="input-name"
                    value={name}
                    required
                    onChange={this.formChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    />
                </Label>
                <Label>
                    Number
                    <Input
                    type="tel"
                    name="phone"
                    id="input-phone"
                    required
                    onChange={this.formChange}
                    value={number}
                    pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                    />
                </Label>
                <BtnSubmit
                type="submit"
                >Add Contact</BtnSubmit>
            </Form>
        )
    }
}


Form.propTypes = {
    onSubmit: propTypes.func.isRequired,
}