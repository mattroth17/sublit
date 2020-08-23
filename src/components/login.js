import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Login = (props) => { // sort out the buttons
  return (
    <div className="top-bar">
      <div className="header"> <div id="sublit-title">Sublit</div>
        <div className="flex-btn">

          <NavLink to="/signin" className="navlink">
            <div className="login-btn">Sign In    </div>
          </NavLink>
          <div className="login-btn">
            <NavLink to="/signup" className="navlink">Sign Up</NavLink>
          </div>
        </div>

      </div>
      <div className="middle-section-row">
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image="src/img/house-one.jpg" alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>
        </div>
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image="src/img/house-two.jpeg" alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>
        </div>
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image="src/img/house-three.jpg" alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>

        </div>
      </div>
      <div className="middle-section">
        <div className="middle-oval" id="oval-one">
          <p>
            testing
          </p>
        </div>
        <div className="middle-oval" id="oval-two">
          <p>
            more testing
          </p>
        </div>
        <div className="middle-oval" id="oval-three">
          <p>
            more testing
          </p>
        </div>

      </div>
    </div>
  );
};

export default connect(null, { })(Login);
