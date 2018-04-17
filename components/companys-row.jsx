import React from 'react';
import Company from './company';

export default () => (<div className="columns">
  <div className="column">
    <Company
      img1280by960="http://lorempixel.com/1280/960/"
      caption1280by960="city"
      img96by96="http://lorempixel.com/96/96/"
      caption96by96="eyes"
      name="Example City"
      username="examplecity"
      summary="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    />
  </div>
  <div className="column">
    <Company
      img1280by960="http://lorempixel.com/1280/960/"
      caption1280by960="city"
      img96by96="http://lorempixel.com/96/96/"
      caption96by96="eyes"
      name="Example City"
      username="examplecity"
      summary="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    />
  </div>
</div>);

