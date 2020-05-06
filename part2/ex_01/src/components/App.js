import React from 'react';

import Course from './Course';

const App = ({courses}) => (
      <div>
        { courses.map( course => <Course key={course.id} course={course}/> ) }
      </div>
    )
  
  export default App;

