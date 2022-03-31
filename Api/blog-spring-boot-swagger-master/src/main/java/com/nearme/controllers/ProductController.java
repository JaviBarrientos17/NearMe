package com.nearme.controllers;




import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController{
	/**
	 * Lists all existing products
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/list")
	public ResponseEntity<String> getUsersList() throws Exception {
		log.info("Get All podruct List");
		return new ResponseEntity<String>("AGUANALOVEU", HttpStatus.OK);
	}

	
}
