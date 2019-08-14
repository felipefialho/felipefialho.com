import React from 'react'

import Layout from 'components/Layout'
import Content from 'components/Content';

const IndexPage = () => (
  <Layout> 
    <Content>
      <h1>Hi!</h1>

      <p>My name is Felipe Fialho from Brazil and I've been working as Front-End 
      Developer since 2009.</p>

      <p>Currently, I'm a Developer at <a href="https://cubo.network/jobs" target="_blank" rel="noopener noreferrer" title="Ver">Cubo Itaú</a> and 
      I've created the <a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a> organization on Github. I'm also a founder of Meetup CSS and I helped in organization of 
      Conferência CSS Brasil 2015.</p>

      <p>I've been creating a lot of open-source projects in 
      the last years, like:</p>

      <ul>
        <li><a href="https://github.com/frontendbr" target="_blank" rel="noopener noreferrer" title="Ver">Front-end BR</a></li>
        <li><a href="https://github.com/felipefialho/css-components" target="_blank" rel="noopener noreferrer" title="Ver">CSS Components</a></li> 
        <li><a href="https://github.com/felipefialho/frontend-challenges" target="_blank" rel="noopener noreferrer" title="Ver">Front-end Challenges</a></li> 
        <li><a href="https://github.com/felipefialho/kratos-boilerplate" target="_blank" rel="noopener noreferrer" title="Ver">Kratos Boilerplate</a></li> 
        <li><a href="https://github.com/felipefialho/piano" target="_blank" rel="noopener noreferrer" title="Ver">Piano</a></li> 
        <li><a href="https://github.com/felipefialho/despolitizador" target="_blank" rel="noopener noreferrer" title="Ver">Despolitizador</a></li> 
        <li><a href="https://survey.frontendbr.com.br" target="_blank" rel="noopener noreferrer" title="Ver">Survey</a></li>
      </ul>
    </Content> 
  </Layout>
)

export default IndexPage