import React from 'react';
import Card from './card';

export default () => (<div className="columns">
  <div className="column">
    <Card
      img1280by960="https://placehold.it/1280x960"
      caption1280by960="city"
      img96by96="https://placehold.it/128x128"
      caption96by96="eyes"
      name="Example City"
      username="examplecity"
      summary="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    />
  </div>
  <div className="column">
    <Card
      img1280by960="https://placehold.it/1280x960"
      caption1280by960="city"
      img96by96="https://placehold.it/128x128"
      caption96by96="eyes"
      name="Example City"
      username="examplecity"
      summary="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    />
  </div>
</div>);

