package lk.priyanthasupermarket;

import org.springframework.data.jpa.repository.JpaRepository;

/* JpaRepository has pre defined methods for CRUD operations. No need to write SQL queries manually */
public interface EmployeeDao extends JpaRepository<Employee, Integer> {
    /* JpaRepository<Employee, Integer> eke Employee kiyanne data access karanna one karana file (mapping file) eka. Integer kiyanne mapping file eke id (primary key) eke data type eka */
}
