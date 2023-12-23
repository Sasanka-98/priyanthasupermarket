package lk.priyanthasupermarket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class PrivilegeController {

    @Autowired // dependency injection
    private PrivilegeDao dao; // create variable privilegedao

/*     @Autowired
    private EmployeeDao empdao; */
    // dependency injection
/*     public PrivilegeController(PrivilegeDao dao, EmployeeDao empdao) {
        this.dao = dao;
        this.empdao = empdao;
    } */

    @RequestMapping(value = "/privilege")
    public ModelAndView privilegeUI() {
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        return privilegeView;
    }

    // create mapping for get all privilege data --> URL [/privilege/findall]
    @RequestMapping(value = "/privilege/findall", produces = "application/json")
    public List<Privilege> getAllData() {
        return dao.findAll();
    }
}
