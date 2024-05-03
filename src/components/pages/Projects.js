import React from 'react'
import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'

import styles from './Projects.module.css'

export default function Projects() {

  const location = useLocation();
  let message ='';
  let type = '';
  if(location.state){
    message = location.state.message
    type = location.state.type
  }
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text={"Criar projeto"} />
      </div>
      
       { message && <Message msg={message} type={type} />}
       <Container customClass="start">
          <p>projetos...</p>
       </Container>
    </div>
  )
}
