package com.nearme.controllers;



import com.nearme.services.ProductService;

import java.util.List;
import com.nearme.models.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
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


	@Autowired
	private ProductService productService;

	
	/**
	 * Lists all existing products
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/list")
	public ResponseEntity<List<ProductDTO>> getProdructList() throws Exception {
		log.info("Listing all products");
		return new ResponseEntity<List<ProductDTO>>(this.productService.getProducts(), HttpStatus.OK);
	}

	
}
