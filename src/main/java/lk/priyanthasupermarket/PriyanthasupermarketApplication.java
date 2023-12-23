package lk.priyanthasupermarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class PriyanthasupermarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(PriyanthasupermarketApplication.class, args);
		getSucceedMessage();
	}

	public static void getSucceedMessage() {
		System.out.println("Priyantha Supermarket");
	}

	@RequestMapping(value = "/")
	public String index() {
		return "<h1> Welcome to Priyantha Supermarket </h1>";
	}

	@RequestMapping(value = "/test")
	public ModelAndView priyanthaUI() {
		ModelAndView priyanthaView = new ModelAndView();
		priyanthaView.setViewName("supplier.html");
		return priyanthaView;
	}


}
