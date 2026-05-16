package com.amex.wearables.repository;

import com.amex.wearables.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByClientCode(String clientCode);
}