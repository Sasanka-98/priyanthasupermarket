package lk.priyanthasupermarket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class EmployeeController {
    
    @Autowired
    private EmployeeDao dao;

    @RequestMapping(value = "/employee")
    public ModelAndView employeeUI() {
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        return employeeView;
    }


    // define findall get mapping for get all employee data --> URL [ /employee/findall ]
    @RequestMapping(value = "/employee/findall", produces = "application/json")
    public List<Employee> getAllData() {
        return dao.findAll();
    }
}
