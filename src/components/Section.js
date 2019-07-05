import React from 'react';
//import $ from 'jquery';
import Icon from '@material-ui/core/Icon';
import LazyLoad from 'react-lazy-load';

class Section extends React.Component {
   render() {
    //console.log("this", this.props);

    let imageOrientation = 'left'

    if(this.props.data.align === 'left') {
      imageOrientation = 'right'
    }

    const svgs = this.props.data.svg.map((item, key) =>
        <div key={key} className={"svg-wrapper " + item.name}>
          {/*
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000">
            <g>
              <path className="morph-path3" 
                d={item.path}
                fill={item.fill}
                transform={item.transform}
              />
            </g>
          </svg>
          */}
          <img src={`shapes/${item.file}`} alt="" />
        </div>
    );

    const lazyloadgallery = this.props.data.lazyloadgallery.map((item, key) =>
      <LazyLoad 
        debounce={false}
        key={key}
        className="lazyload-wrapper"
      >
        <img src={item.path} alt="" />
      </LazyLoad>
    );    

    return (
       <div data-type={this.props.data.type} data-start-top={this.props.data.start} data-animation-duration={this.props.data.animationduration} data-index={this.props.index} data-has-video={(this.props.data.video.length > 0 ? 'true' : ' false')} data-show-sm-logo={this.props.data.showsmlogo} data-animation={JSON.stringify(this.props.data.animation)} className={"section js-section " + this.props.data.type + (this.props.data.isfixed ? ' fixed' : ' limited')}>
          <div className="section-wrapper">


            <div className={"text-obj " + this.props.data.align}>

              {this.props.data.subtitle2.length > 0 &&
                <h4>{this.props.data.subtitle2}</h4>
              }              

              {this.props.data.showlglogo === true &&
                <div className="logo-obj">
                  <img className="logoimg" src={`logo/S&N_Logo.svg`} alt="" />
                </div>
              }

              {this.props.data.title.length > 0 &&
                <h2>{this.props.data.title}</h2>
              }     

              {this.props.data.subtitle1.length > 0 &&
                <h3>{this.props.data.subtitle1}</h3>
              }

              {this.props.data.subtitle3.length > 0 &&
                <h5>{this.props.data.subtitle3}</h5>
              }

              {this.props.data.text.length > 0 &&
                <p>{this.props.data.text}</p>
              }

              {this.props.data.jumpto.length > 0 &&
                <div className="icon-obj">
                  <Icon className="icon js-skip-btn" data-jump-pos={this.props.data.jumpto[0].position}>{this.props.data.jumpto[0].icon}</Icon>
                </div>
              }           
            </div>

            
              {this.props.data.svg.length > 0 &&
                <div className={"svg-obj " + imageOrientation + "-position"}>
                  {/*
                  <div className="svg-wrapper snap-top">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 2500 2500">
                      <g>
                        <path className="morph-path1" d="m250.500005,375.437509c63,-81.817685 116.720992,-64.000009 163.499997,-80.000009c46.779005,-16 55.499998,-88.817676 121.499998,3.000009c66,91.817685 -24.720993,138.000008 -114.499998,138.000008c-89.779004,0 -233.499997,20.817677 -170.499997,-61.000008z" fill="#a3d5d3"/>
                      </g>
                    </svg>
                  </div>
                  */}

                  {svgs}
                </div>
              }
            
            <div className="img-obj">
              {this.props.data.image.length > 0 &&
                <img className={imageOrientation + "-position " + this.props.data.image[0].name + " " + this.props.data.type + this.props.index} src={`img/${this.props.data.image[0].path}`} alt=""/>
              }
            </div>

            <div className="threesixty-obj">
              {this.props.data.threesixty.length > 0 &&
                <img className={"threesixty " + imageOrientation + "-position"} src={`img/${this.props.data.threesixty}`} data-count="61" alt="" />
              }
            </div>

            {this.props.data.lazyloadgallery.length > 0 &&
              <div className="lazyload-gallery">
                {lazyloadgallery}
              </div>
            }

            {this.props.data.video.length > 0 &&
              <div className="video-obj">
                <video className="video" playsInline autoPlay={true} muted="muted">
                  <source src={this.props.data.video} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
                <div className="ended-video">
                  <div className="element-wrapper">
                    <button>Watch our brand film</button>
                  </div>
                </div>
              </div>
            }

            {this.props.data.showbrandjsanimation === true &&
              <div className="brand-obj">
                <div className="brand-logo">
                  <img className="plus" src={`logo/S&N_Plus.svg`} alt="" />
                  <img className="smith" src={`logo/S&N_Smith.svg`} alt="" />
                  <img className="nephew" src={`logo/S&N_Nephew.svg`} alt="" />
                </div>
              </div>
            }
          
          </div>
        </div>
    );
   }
}

export default Section;
