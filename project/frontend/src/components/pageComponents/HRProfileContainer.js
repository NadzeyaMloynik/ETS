import { Container, Image, Button } from "react-bootstrap";
import "../styles/HRConteiner.css"
import UsersForAssignments from "./UsersForAssignments";
import React, { useEffect, useState } from "react";
import UsersAssignments from "./UsersAssignments";

function HRProfileContainer() {
    const [isSetAssignments, setIsSetAssignments ] = useState(true)

    useEffect(() => {

    }, [isSetAssignments])

  return (
    <div className="hr-container">
      <div className="buttons for-buttons">
        <Button onClick={()=>{
            setIsSetAssignments(true)
        }}>Назначить тесты</Button>
        <Button onClick={()=>{
            setIsSetAssignments(false)
        }}> Назначения</Button>
      </div>
      <div className="">
      {
        isSetAssignments? 
        <UsersForAssignments/> : <UsersAssignments/>
      }
      </div>
    </div>
  );
}

export default HRProfileContainer;
