import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './generator.css';

export default class Generator extends Component {

    state = {
      currMax: this.props.currMax,
      len: this.props.len,
      refresh_interval: 2,
      numbers: [],
      changedParam: false,
      removing: false,
      canGenerate: false,
      remaining: 2
    };

    num_generator() {

      if (this.state.currMax < this.state.len) {
        return;
      }
      let l = new Set();
      const max_num = this.state.currMax;
      for (var i = 0; i < this.state.len; i++){
        let random_num = Math.floor(Math.random()*max_num);
        while (l.has(random_num)) {
          random_num = Math.floor(Math.random()*max_num);
        }
        l.add(random_num); 
      }
      return Array.from(l);
    }

    reset = () => {
      clearInterval(this.interval);
      this.setState({
        currMax: this.props.currMax,
        len: this.props.len,
        refresh_interval: 2,
        numbers: [],
        canGenerate: false,
        changedParam: false,
        remaining: 2
      });
    }

    handleDelete = () => {
      let removing = true;
      this.setState({removing});
      setTimeout(() => {
        this.props.onDelete(this.props.id);
      }, 180);

    }
    
    generate = () => {
      if (!this.state.canGenerate) {
        this.setState({numbers: this.num_generator()})
        this.interval = setInterval(() => {this.setState({numbers: this.num_generator()})}, this.state.refresh_interval*1000);
        this.setState({
          canGenerate: true,
          changedParam: true});
      } else {
        clearInterval(this.interval);
        this.setState({canGenerate: false});

      }
    }

    updateCurrMax = (val) => {
      if (val < this.state.len) {
        this.setState({currMax: Number(val), len: Number(val), changedParam: true});
      } else {
        this.setState({currMax: Number(val), changedParam: true});
      }
    }

    updateCurrLen = (val) => {
      if (val > this.state.currMax) {
        this.setState({currMax: Number(val), len: Number(val), changedParam: true});
      } else {
        this.setState({len: Number(val), changedParam: true});
      }
    }

    updateInterval = (val) => {
      clearInterval(this.interval);
      console.log(val)
      this.setState({refresh_interval: val, changedParam: true})
      if (this.state.canGenerate) {
        this.interval = setInterval(() => {this.setState({numbers: this.num_generator()})}, val*1000);
      }
    }

    getContainerClass() {
      let classes = 'container mt-3 mb-5 item-fade-';
      classes += this.state.removing ?  'out' :  'in';
      return classes;
    }
    
    genGenerateBtnClass() {
      let classes = 'btn m-4 btn-';
      classes += this.state.canGenerate ? 'warning' : 'success';
      return classes;
    }

    render() {
			return (
        <>
          <div className={this.getContainerClass()}>
            <i className="bi bi-x-circle-fill delete-btn" onClick={this.handleDelete}></i>
            <div className='param'> <div className='title'>Max:</div> <div className='badge bg-secondary m-2'>{this.state.currMax}</div> </div>
            <input type="range" className="form-range" min="0" max="1000" value={this.state.currMax} step="1" onChange={(e) => this.updateCurrMax(e.target.value)}></input>

            <div className='param'> <div className='title'>Length:</div> <div className='badge m-2 bg-primary'>{this.state.len}</div> </div>
            <input type="range" className="form-range" min="0" max="1000" value={this.state.len} step="1" onChange={(e) => this.updateCurrLen(e.target.value)}></input>

            <div className='param'> <div className='title'>Refresh Interval:</div> <div className='badge m-2 bg-primary'>{this.state.refresh_interval} Seconds</div> </div>
            <input type="range" className="form-range" min="2" max="120" value={this.state.refresh_interval} step="1" onChange={(e) => this.updateInterval(e.target.value)}></input>
            {/* {this.state.currMax < this.state.len && 
              <div className="alert alert-danger mt-3" role="alert">
                Cannot generate more numbers than the <strong>current max</strong>. Adjust your <strong>length</strong> to be less than the <strong>current max</strong>.
              </div> 
            } */}
            <button type="button" className={this.genGenerateBtnClass()} onClick={ this.generate } >{this.state.canGenerate ? 'Pause' : 'Generate'}</button>
            <button type="button" className='btn btn-danger m-2' onClick={this.reset} disabled={!this.state.changedParam}>Reset</button>
            
            {this.state.numbers.length > 0 &&
              <div className='number-container mt-4' id='number-container'>
                {this.state.numbers.map((num, i) => <div key={i} className='badge m-1 bg-secondary' >{num}</div>)}
              </div>
            }
          </div>
        </>
      );
  }
}
