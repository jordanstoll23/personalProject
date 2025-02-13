import React, {Component} from 'react';
import '../../index.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import reactLogo from '../../assets/reactLogo.jpg';
import nodeLogo from '../../assets/nodejs-new-pantone-white.png';
import sqlLogo from '../../assets/sqlLogo.png';
import { HashLink as Link } from 'react-router-hash-link';

require('colors');

class Review extends Component {
  constructor(props) {
    super(props);
    const { validator, NewsPrice, startDate, endDate } = this.props.steps;
    
  this.state = {
      baseUrl2: '&fields=fiftyTwoWkHigh%2CfiftyTwoWkHighDate%2CfiftyTwoWkLow%2CfiftyTwoWkLowDate&mode=I&jerq=false',
      baseUrl: 'https://marketdata.websol.barchart.com/getQuote.json?apikey=8943685f2b7e5247a714155c2c17308e&symbols=',
      validator: this.props.steps.validator,
      NewsPrice: this.props.steps.NewsPrice,
      startDate: this.props.steps.startDate,
      endDate: this.props.steps.endDate,
      stockInfo: {}
    };
  }

    componentDidMount() {
      var urlUpdater= this.state.baseUrl + this.props.steps.validator.value + this.state.baseUrl2;
      console.log(urlUpdater);
      axios.get(urlUpdater)
      .then((response) => { 
          console.log(response.data.results[0].name);
        this.setState({
            stockInfo: response.data
        }, () => {
          console.log(this.state.stockInfo)
        })
        });
    };

  
    render() {
      
      return (
        <div style={{ width: '100%' }}>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Company Name</td>
                {this.state.stockInfo.results?<td>{this.state.stockInfo.results[0].name}</td>:null}
              </tr>
              <tr>
                <td>Ask price</td>
                {this.state.stockInfo.results?<td>{this.state.stockInfo.results[0].lastPrice}</td>:null}
              </tr>
              <tr>
                <td>percent Change</td>
                {this.state.stockInfo.results?<td>{this.state.stockInfo.results[0].percentChange}</td>:null}
              </tr>
              <tr>
                <td>52 Week High</td>
                {this.state.stockInfo.results?<td>{this.state.stockInfo.results[0].fiftyTwoWkHigh}</td>:null}
              </tr>
              <tr>
                <td>52 Week Low</td>
                {this.state.stockInfo.results?<td>{this.state.stockInfo.results[0].fiftyTwoWkLow}</td>:null}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  Review.propTypes = {
    steps: PropTypes.object,
  };
  
  Review.defaultProps = {
    steps: undefined,
  };
 


  class SimpleForm extends Component {

    render() {
      return (
        <div id="top">
        <nav className="topnav" id="myTopnav">
        <div>
        <Link to="home#top">Home</Link>
        <Link to="home#tech">Technology Used</Link>
        <Link to="home#stocks">Common Stocks</Link>
        <a href="#Profile">Profile</a>
        </div>
        <div className='contact'>
        <a href="mailto:jordanstoll88@gmail.com"> <i className="fa fa-envelope-o" aria-hidden="true"></i></a>
        <a href="https://www.linkedin.com/in/jordan-stoll" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
        <a href="https://github.com/jordanstoll23" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
        </div>
      </nav>
  
    <div>
      <div className="pimg1">
        <div className="ptext">
          <span className="border">
            Stock Market Assistant
          </span>
        </div>
      </div>
      
      <section className="section section-light">
        <h2>Check how your stocks are doing</h2>
        
        <div className='chatBot'>
        <div className="StockExplanation">
        ASK: is the price a seller states they will accept.
        The seller may qualify the stated asking price as firm or negotiable. 
        <br/><br/>
        PERCENTAGE CHANGE: the amount of gain or loss from a single day 
        from open to when you search.
        <br/><br/>
        </div>
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'Before we get started, Please enter your name so I can get to know you a little better.',
              trigger: '1-2'
            },
            {
              id:'1-2',
              user:true,
              trigger: '2'
            },
            {
              id: '2',
              message: 'Hello {previousValue}, Please enter the stock abbreviation you would like to search. If you want to look at a list of Popular companies, Look below the Chat.',
              trigger: 'validator',
            },
            {
              id:'2-1',
              message:'Please enter the stock abbreviation you would like to search. If you want to look at a list of Popular companies, Look below the Chat.',
              trigger: 'validator',
            },
            {
              id:'validator',
              user: true,
              trigger: '3',
              validator: (value) => {
                if (value === 'Todd') {
                  return 'Todd(QuestionMark?)';
                } else if (value === 'your stupid') {
                  return "you're* Do I have to keep going? ";
                } else if (value === 'damn') {
                  return 'Todd would not approve of that language..';
                } else
  
                return true;
              },
            },
            {
              id: '3',
              message: 'Great! Check out your summary',
              trigger: 'review',
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'update',
            },
            {
              id: 'update',
              message: 'Is there another stock I can search for you?',
              trigger: 'secondStock',
            },
            {
              id: 'secondStock',
              options: [
                { value: 'yes', label: 'Yes', trigger: '2-1' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'end-message',
              message: 'Thanks! Hope to see you again soon',
              end: true,
            },
          ]}
        />
        </div>
      </section>
      
      <div className="pimg2" id='stocks'>
        <div className="ptext">
          <span className="border">
            Common Stocks
          </span>
        </div>
      </div>

      <section className="section section-dark">
        <h2>These are the top 20 most traded stocks</h2>
          <div> 
            <ul>
              <li>Bank of America (BAC)</li>	
              <li>Rite Aid (RAD)</li>
              <li>Oracle (ORCL)</li>	
              <li>Enterprise Products (EPD)</li>
              <li>General Electric (GE)</li>	
              <li>Ambev ADR (ABEV)</li>
        	    <li>Ford Motor (F)</li>	
        	    <li>Sterling Bancorp (STL)</li>	
        	    <li>Vale ADR (VALE)</li>
              <li>Chesapeake Energy (CHK)</li>	
              <li>AT&T (T)</li>	
              <li>Snap (SNAP)</li>
              <li>Wells Fargo (WFC)</li>	
              <li>Transocean (RIG)</li>	
              <li>Freeport-McMoRan (FCX)</li>	
              <li>Calpine (CPN)</li>
              <li>Pfizer (PFE)</li>
              <li>Weatherford (WFT)</li>
              <li>ENSCO (ESV)</li>
              <li>Marathon Oil (MRO)</li>
            </ul>
          </div>
      </section>

      <div className="pimg3" id='tech'>
        <div className="ptext">
          <span className="border">
          Built using the latest technologies
          </span>
        </div>
      </div>

      <section className="section section-dark">
        <h2>Built using the latest technologies</h2>
       
          <div className='techExplanation'>
          <img src={reactLogo} className='reactLogo' alt='react logo'/>
          <div className="techText1">
            This app was built using the new Javascript Framework, React. this allows me to easily creating a stunning website with its advantages such as components and easy setup. 
            React is known as a up and coming technology and is widely regarded as one of the future frameworks of javascript.
          </div>
          </div>
          <br/>
          <div className='techExplanation'>
            <br />
          <img src={nodeLogo} className='nodeLogo' alt='node logo'/>
          <div className="techText2">
            NODE.JS while  React is the framework I built this app on, 
            I also used Node.js in partnership with Axios and Massive, to help me 
            communicate between not only my front and backend, but also the Yahoo! 
            Finance API I used to gather the stocks after user input in the ChatBot.
          </div>
          </div>
          <br/>
          <div className='techExplanation'>
          <img src={sqlLogo} className='sqlLogo' alt='sql logo'/>
          <div className="techText3">
            SQL-to handle the saving of peoples recently searched stocks, I have chosen SQL as my database language to 
            prepare myself for the job force, as many companies rely on SQL to communicate with thier database. when someone authenticates using Auth0, the are generated a 
            unique UserID and the stocks they choose to save are then associated with their UserId by way of two tables and a foreign key.
          </div>
          </div>
          <br/>
          <div className='techExplanation'>
            <br/>
            <div className="techText4">
            Other Technologies also used in this project: bootstrap, Parralax, Redux, Auth0, Sessions, digital ocean hosting, PostgreSQL.  
          </div>  
          </div>                                                                 
      </section>
      
      <div className="pimg1">
        <div className="ptext">
          <span className="border">
          STOCK MARKET ASSISTANT
          </span>
        </div>
      </div>
    </div>
  </div>
      );
    }
  }

function mapStateToProps(state){
    return {
 
    }
}

export default connect(mapStateToProps)(SimpleForm)