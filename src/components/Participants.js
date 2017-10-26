import React, { Component } from 'react';
import edit from './edit.png';
import remove from './remove.png';
import participantsList from './participantsList.json';

class Participants extends Component{
    constructor(props){
    super()
     
    this.state = {
      data: participantsList,
    sort: {
        direction: 'desc'
      }

    };

    this.onSort = this.onSort.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this); 
    this.saveData = this.saveData.bind(this);
  }
    
    originalElementValues = [];
       
    handleSubmit (event){
                        
        event.preventDefault();
        event.stopPropagation();
        var id;
        try{
          this.id = ((this.state.data[this.state.data.length-1].id) + 1);  
        }catch(e){
            this.id=1;   
        }
        var name = event.target.nameInput.value;
        var email = event.target.emailInput.value;
        var phone = event.target.phoneInput.value;
        var nameOk, emailOk, phoneOk = false;
        var arr = {id: id, name: name, email:email, phone: phone};

        if(name==="" || !name.replace(/\s/g, '').length){
         document.getElementsByName("nameInput")[0].style.borderColor = "red";
         nameOk = false;  
        } else {
            nameOk = true;
            document.getElementsByName("nameInput")[0].style.borderColor = "lime";
        }
        
       if(!this.validateEmail(email)){
           document.getElementsByName("emailInput")[0].style.borderColor = "red";
           emailOk = false;
       } else {
           emailOk = true;
           document.getElementsByName("emailInput")[0].style.borderColor = "lime";
       }
        if(phone==="" || !this.validatePhoneNumber(phone)){
            document.getElementsByName("phoneInput")[0].style.borderColor = "red";
            phoneOk = false;   
        } else {
            phoneOk = true; 
            document.getElementsByName("phoneInput")[0].style.borderColor = "lime";
        }
        
        if(nameOk && emailOk && phoneOk){
            this.setState({data: this.state.data.concat([arr])});
            var inputs = document.getElementsByTagName("input");

            for(var i=0; i<inputs.length; i++){
                inputs[i].value="";
                inputs[i].style.borderColor = "#f1f1f1";
            }
        } else {
            return;
        }

    }

    saveData(savedata){
    /*   fetch('/save', {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(savedata)
        }) 
    */
        this.setState({data: savedata});

    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePhoneNumber(phoneNumber){
        var pn = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        return pn.test(phoneNumber);
    }
    
    edit(index){
        var row = document.getElementsByName(index);
        //Ignore the buttons in the loop, handle them separately
        for(var i=0; i<(row.item(0).childNodes.length-1); i++){
            var element = row.item(0).childNodes[i];
            var elementValue = element.innerHTML;
            this.originalElementValues[i] = elementValue;
            element.innerHTML = '<input className="editInput" type="text" />';
            element.childNodes.item(0).value=elementValue;
        }
        
        var buttons = row.item(0).getElementsByTagName("button");
        buttons[0].className = "invisButton";
        buttons[1].className = "invisButton";
        buttons[2].className = "cancelButton";
        buttons[3].className = "saveButton";
        
    }

    remove(id){ 
        var d = this.state.data;
        var filtered = d.filter(function(item){
             console.log(item.id);
            return item.id!==id;
        });
        console.log(filtered);
        this.saveData(filtered);
    }
    
    cancel(index){
        var row = document.getElementsByName(index);
        for(var i=0; i<(row.item(0).childNodes.length-1); i++){
            var element = row.item(0).childNodes[i];
            element.innerHTML = this.originalElementValues[i];           
        }
        this.resetButtons(row)

    }

    save(index){
        var row = document.getElementsByName(index);
        var buttons = row.item(0).getElementsByTagName("button");
        
        var name = row.item(0).childNodes.item(0).childNodes.item(0).value;
        var email = row.item(0).childNodes.item(1).childNodes.item(0).value;
        var phone = row.item(0).childNodes.item(2).childNodes.item(0).value;
        
        this.state.data[index].name = name;
        this.state.data[index].email = email;
        this.state.data[index].phone = phone;
        
        row.item(0).childNodes.item(0).innerHTML = name;
        row.item(0).childNodes.item(1).innerHTML = email;
        row.item(0).childNodes.item(2).innerHTML = phone;
        this.resetButtons(row)
        this.saveData(this.state.data);
    }

    resetButtons(row){
        var buttons = row.item(0).getElementsByTagName("button");
        buttons[0].className = "editButton";
        buttons[1].className = "editButton";
        buttons[2].className = "invisButton";
        buttons[3].className = "invisButton";
    }

    onSort(event, sortKey){
        const data = this.state.data;
        var sorted = data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        if (this.state.sort.direction === 'desc') {
            sorted.reverse();
            this.state.sort.direction = 'asc';
        } else {
            this.state.sort.direction = 'desc';
        }
        this.setState(data);
    }

    render(){
        var newdata = this.state.data;
        var that = this;
    return (
        <div>
            <div className='inputFields'>
                    <form onSubmit={this.handleSubmit}>
                        <input name="nameInput" value={this.state.data.name} type="text" placeholder = "Full Name" />
                        <input name="emailInput" value={this.state.data.email} type="text" placeholder = "E-mail address" />
                        <input name="phoneInput" value={this.state.data.phone} type="text" placeholder = "Phone number" />
                        <input type="submit" value="Add new" id="submitButton" />
                    </form>
            </div>
            <div>
                <table>
                    <thead className='tableHead'>
                        <tr>
	                        <th onClick={e => this.onSort(e, 'name')}>Name</th>
                            <th onClick={e => this.onSort(e, 'email')}>E-mail address</th>
                            <th onClick={e => this.onSort(e, 'phone')}>Phone number</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {newdata.map(function (participant, index){
                            return (
                                <tr name={index} key={index} data-item={participant}>
                                    <td data-title="Name">{participant.name}</td>
                                    <td data-title="Email">{participant.email}</td>
                                    <td data-title="Phone">{participant.phone}</td>
                                    <td className="buttonTd">
                                        <button className='editButton' onClick={(e) => that.edit(index)} ><img src={edit} alt={""}/></button>
                                        <button className='editButton' onClick={(e) => that.remove(participant.id)}><img src={remove} alt={""}/></button>
                                        <button className='invisButton' onClick={(e) => that.cancel(index)}>Cancel</button>
                                        <button className='invisButton' onClick={(e) => that.save(index)}>Save</button>
                                    </td>
                                </tr>
                             );            
                          })}
                    </tbody>
                </table>
            </div>
        </div>
       );
    }
}
           
export default Participants;