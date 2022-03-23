package com.nearme.controllers;

import java.util.List;

import com.nearme.services.ProductService;
import com.nearme.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
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
		return new ResponseEntity<String>("Thats all", HttpStatus.OK);
	}

	
}
