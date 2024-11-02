import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import { Container, Button, Form } from "react-bootstrap";

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
            setProfilePhotoUrl(response.ourUsers.photoUrl); // Подразумевается, что photoUrl возвращается сервером
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handlePhotoChange = (e) => {
        setSelectedPhoto(e.target.files[0]);
    };

    const uploadProfilePhoto = async () => {
        try {
            if (!selectedPhoto) {
                alert("Please select a photo to upload.");
                return;
            }
            const token = localStorage.getItem('token');
            await UserService.updateUserPhoto(profileInfo.id, selectedPhoto, token);
            alert("Photo uploaded successfully!");
            fetchProfileInfo();
        } catch (error) {
            console.error("Error uploading profile photo:", error);
        }
    };

    return (
        <Container fluid className="profile-page-container">
            <h2>Profile Information</h2>
            {profilePhotoUrl && (
                <div className="profile-photo">
                    <img src={profilePhotoUrl} alt="Profile" width="150" height="150" />
                </div>
            )}
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>City: {profileInfo.city}</p>
            
            {profileInfo.role === "ADMIN" && (
                <>
                    <button>
                        <Link to={`/update-user/${profileInfo.id}`}>
                            Update This Profile
                        </Link>
                    </button>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Profile Photo</Form.Label>
                        <Form.Control type="file" onChange={handlePhotoChange} />
                    </Form.Group>
                    <Button onClick={uploadProfilePhoto}>Upload Photo</Button>
                </>
            )}
        </Container>
    );
}

export default ProfilePage;
