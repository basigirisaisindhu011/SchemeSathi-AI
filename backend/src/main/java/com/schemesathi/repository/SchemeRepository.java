package com.schemesathi.repository;

import com.schemesathi.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Long> {
    
    List<Scheme> findByStatus(String status);
    
    List<Scheme> findByCategoryIdAndStatus(Integer categoryId, String status);
    
    @Query("SELECT s FROM Scheme s WHERE s.status = 'ACTIVE' AND (s.isCentral = true OR s.state.id = :stateId)")
    List<Scheme> findByStateOrCentral(@Param("stateId") Integer stateId);

    @Query("SELECT s FROM Scheme s WHERE s.status = 'ACTIVE' AND (s.isCentral = true OR s.state.id = :stateId) AND s.category.id = :categoryId")
    List<Scheme> findByStateOrCentralAndCategory(@Param("stateId") Integer stateId, @Param("categoryId") Integer categoryId);
}
