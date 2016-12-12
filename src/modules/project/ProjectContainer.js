import React, { Component } from 'react';
import AddProjectContainer from 'modules/project/add-project/AddProjectContainer';
import ProjectList from 'modules/project/components/ProjectList';

class ProjectContainer extends Component { // eslint-disable-line

  render() {
    return (
      <div>
        <AddProjectContainer />
        <ProjectList />
      </div>
    );
  }
}

export default ProjectContainer;
