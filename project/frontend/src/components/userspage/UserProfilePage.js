import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { Container, Image, Button } from "react-bootstrap";
import emptyAvatar from "../assets/empty-avatar.avif";

import "../styles/UserProfilePage.css";
import lock from "../assets/padlock.png"
import { PROFILE_UPDATE_ROUTE } from "../../utils/consts";
import WaitingComponent from "../common/WaitingComponent";
import HRProfileContainer from "../pageComponents/HRProfileContainer";
import UserProfileContainer from "../pageComponents/UserProfileContainer";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [userPic, setUserPic] = useState(emptyAvatar);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUserPic();
  }, [user])

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = await UserService.getYourProfile(token);
      setUser(userData.ourUsers);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserPic = async () => {
    try {
      const token = localStorage.getItem("token");
      const pic = await UserService.getUserImage(user.id, token);
      if (pic === null) {
        setUserPic(emptyAvatar);
      } else {
        setUserPic(pic);
      }
    } catch (error) {
      setUserPic();
    }
  };

  return (
    <Container className="profile-page">
      {user ? (
        <div className="profile-container">
          <div className="image-container">
            <div className="image-name">
              <Image src={userPic} className="user-image-profile" />
              <div className="name buttons">
                <h2>{`${user.name != null ? user.name : ""} ${user.lastname != null ? user.lastname : ""}`}</h2>
                <Button
                onClick={() => navigate(PROFILE_UPDATE_ROUTE)}
                > Изменить данные </Button>
              </div>
            </div>
            <div className="user-info-container">
              <p>
                <strong>Email:</strong> 
                <input value={user.email} disabled/>
              </p>
              <p>
                <strong>Должность:</strong>
                <input value={user.position} disabled/>
              </p>
              <p>
                <strong>Город:</strong> 
                <input value={user.city} disabled/>
              </p>
            </div>
          </div>
          {
            user.role === "ADMIN" ? 
            <div className="no-tests-for-user">
              <div className="lock">
                <Image src={lock}/>
              </div>
              <span>Администратор не может проходить или назначать тесты</span>
            </div>
            :
            user.role === "HR" ?
            <>
           <HRProfileContainer/>
            </>
            :
            user.role === "USER" ?
            <>
            <UserProfileContainer/>
            </>
            : <></>
          }
        </div>
      ) : (
        <WaitingComponent/>
      )}
    </Container>
  );
}

export default UserProfilePage;
