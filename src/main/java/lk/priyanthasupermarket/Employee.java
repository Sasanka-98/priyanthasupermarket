package lk.priyanthasupermarket;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // convert into persistence entity
@Table(name = "employee") // to map with employee db table

@Data // to generate getters and setters toString ... etc functions
@NoArgsConstructor // default constructor
@AllArgsConstructor // all arguments constructor
public class Employee {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    
    @Column(name = "id", unique = true)
    private Integer id;
    
    @Column(name = "empno", unique = true)
    private String empno; 
    
    @Column(name = "fullname")
    private String fullname; 
    
    @Column(name = "callingname")
    private String callingname; 
    
    @Column(name = "nic", unique = true)
    private String nic; 
    
    @Column(name = "gender")
    private String gender; 
    
    @Column(name = "dob")
    private LocalDate dob; 
    
    @Column(name = "mobile")
    private String mobile; 
    
    @Column(name = "landno")
    private String landno; 
    
    @Column(name = "address")
    private String address; 
    
    @Column(name = "email", unique = true)
    private String email; 
    
    @Column(name = "note")
    private String note;
    
    @Column(name = "civilstatus")
    private String civilstatus; 
    
    @ManyToOne // employee --> designation table relationship many to one
    @JoinColumn(name = "designation_id", referencedColumnName = "id")
    private Designation designation_id; // foriegn key --> another table PK
    
    @ManyToOne // employee --> employeestatus table relationship many to one
    @JoinColumn(name = "employeestatus_id", referencedColumnName = "id")
    private EmployeeStatus employeestatus_id; // foriegn key --> another table PK
}
