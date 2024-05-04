import React, { useState,useEffect } from 'react'
import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'

import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'

export default function Projects() {

  const [projects , setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  const location = useLocation();
  let message ='';
  let type = '';
  if(location.state){
    message = location.state.message
    type = location.state.type
  }

  useEffect(()=>{
    setTimeout(()=>{
      fetch('http://localhost:5000/projects',
      {method:'GET',
        headers:{
        'Content-Type':'application/json',
      },}).then(resp => resp.json())
      .then(data =>{
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      }).catch(err => console.log(err))
  },300)
  },[])
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text={"Criar projeto"} />
      </div>
      
       { message && <Message msg={message} type={type} />}
       <Container customClass="start">
        
        {projects.length >0 && projects.map((p)=>(
          <ProjectCard 
          name={p.name}
          id={p.id}
          budget={p.budget}
          category={p.category.name}
          key={p.id}
          />
        ))}
         {!removeLoading && <Loading />}
         {removeLoading && projects.length === 0 
          &&(
          <p>Não há projetos cadastrados!</p>
         )}
       </Container>
    </div>
  )
}
