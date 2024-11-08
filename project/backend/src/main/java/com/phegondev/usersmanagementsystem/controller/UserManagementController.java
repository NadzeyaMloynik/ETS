package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.ReqRes;
import com.phegondev.usersmanagementsystem.entity.Users;
import com.phegondev.usersmanagementsystem.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserManagementController {

    @Autowired
    private UsersManagementService usersManagementService;

    @GetMapping("/adminuser/{userId}/photo")
    public ResponseEntity<?> uploadUserPhoto(@PathVariable Integer userId) {
        byte[] image = usersManagementService.getImage(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @PutMapping("/adminuser/{userId}/upload-photo")
    public ReqRes uploadUserPhoto(@PathVariable Integer userId, @RequestParam("photoFile") MultipartFile photoFile) {
        return usersManagementService.uploadPhoto(userId, photoFile);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> regeister(@RequestBody ReqRes reg){
        ReqRes response = usersManagementService.register(reg);
        if (response.getStatusCode() == 400) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (response.getStatusCode() == 500) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @GetMapping("/admin/search-users")
    public ResponseEntity<Page<Users>> searchUsers(@RequestParam(required = false, name = "pageNo") int pageNo, @RequestParam(required = false, name = "keyword") String keyword) {
        return ResponseEntity.ok(usersManagementService.searchUsers(pageNo, keyword));
    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody Users reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }


}
