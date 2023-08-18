package com.bank.web.repository;

import com.bank.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdminRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM users_tb WHERE user_type = 1", nativeQuery = true)
    List<User> findUsersByUserType(@Param("userType") int userType);

    @Query(value = "SELECT * FROM users_tb WHERE user_type = 0", nativeQuery = true)
    List<User> findUsersByUserRequest(@Param("userType") int userType);
}
