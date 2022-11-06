import React, { Component } from 'react';
import Generator from './generator/num_generator';
import './generators.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
// import Toast from 'react-bootstrap/Toast';

class Generators extends Component {

  state = {
    generator_id: 0,
    generators: [
      {id: 0, currMax: 10, len: 10}
    ],
  };

  // onClickGenerate = (childData) => {
  //   console.log('clicked generate ' + childData);
  // }

  add_generator = () => {
    var newGen = [...this.state.generators];
    var newGenId = this.state.generator_id + 1;
    newGen.push({id: newGenId, currMax:10, len: 10});
    this.setState({
      generator_id: newGenId,
       generators: newGen});
  }

  handleDelete = (delete_id) => {
    const generators = this.state.generators.filter(item => item.id !== delete_id);
    this.setState({generators});
  }

  render() { 
    return (
        <>
          <div className='generator'>
            <OverlayTrigger placement='right' overlay={<Tooltip>Add a generator </Tooltip>}>
              <Button type='button' className='btn btn-success adder' 
                onClick={this.add_generator}>
                <i className="bi bi-plus-lg add-icon"></i>
              </Button>

            </OverlayTrigger>

            {this.state.generators.map(generator => 
              <Generator key={generator.id} id={generator.id} 
              currMax={generator.currMax} 
              len={generator.len} 
              onDelete={this.handleDelete}>
              </Generator>)
            }
          </div>
        </>
    );
  }
}
 
export default Generators;