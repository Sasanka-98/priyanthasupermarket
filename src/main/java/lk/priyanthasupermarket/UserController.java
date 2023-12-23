package lk.priyanthasupermarket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UserController {
    
    @Autowired
    private UserDao dao;

    // define user ui service --> URL [/user]
    @RequestMapping(value = "/user")
    public ModelAndView userUI() {
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        return userView;
    }

    @RequestMapping(value = "/user/findall", produces = "application/json")
    public List<User> getAllData() {
        return dao.findAll();
    }
    
}
