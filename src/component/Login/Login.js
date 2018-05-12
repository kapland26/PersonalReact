import './Login.css'
import React, { Component }  from 'react';
import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types";
import Particles from 'react-particles-js';
require('dotenv').config();
  
class Login extends Component {
    
    render(){

        const {classes} = this.props;
    return(
        <div className="Login">
                <Particles className="particleJs"
                params={{
            		particles: {
            			number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value:  ["#EF5350","#4DB6AC","#EEFF41","#000000"]},
                        shape: {
                            type: "circle",
                            stroke: { width: 0, color: "#000000" },
                            polygon: { nb_sides: 5 },
                            image: { src: "img/github.svg", width: 100, height: 100 }
                        },
                        opacity: {
                            value: 0.9,
                            random: false,
                            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                        },
                        line_linked: {
                            enable: false,
                            distance: 150,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 6,
                            direction: "none",
                            random: false,
                            straight:false,
                            out_mode: "out",
                            bounce: false,
                            attract: { enable: false, rotateX: 600, rotateY: 1200 }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                          onhover: { enable: true, mode: "repulse" },
                          onclick: { enable: true, mode: "push" },
                          resize: true
                        },
                        modes: {
                          grab: { distance: 400, line_linked: { opacity: 1 } },
                          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                          repulse: { distance: 100, duration: 0.4 },
                          push: { particles_nb: 4 },
                          remove: { particles_nb: 2 }
                        }
                      },
                      retina_detect: true
            		}}                
                style={{
                    top: '50px',
                    left: '0px',
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0
                }}
                />
                <div>
                <a href={process.env.REACT_APP_LOGIN}>
                    <Button className={classes.button} size="large" variant="raised">LOGIN</Button>
                </a>
                </div>
        </div>
      )
    }


}

const styles = {
    button: {
      color: "white",
      top: '30vh',
      backgroundColor: "#EF5350",
      fontFamily: 'Montserrat',
      zIndex: 3,
      margin: 'auto'
    }
  }

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);