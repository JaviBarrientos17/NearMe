package com.nearme.controllers;

import com.nearme.services.ProductService;

import java.util.List;

import com.nearme.models.dto.AuthenticationRequestDTO;
import com.nearme.models.dto.ErrorDTO;
import com.nearme.models.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	/**
	 * Lists all existing products
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/list")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<List<ProductDTO>> getProdructList() throws Exception {
		log.info("Listing all products");
		return new ResponseEntity<List<ProductDTO>>(this.productService.getProducts(), HttpStatus.OK);
	}

	/**
	 * Return a product by id
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer idProduct) throws Exception {
		log.info("Listing a product by id");
		return new ResponseEntity<ProductDTO>(this.productService.getProductById(idProduct), HttpStatus.OK);
	}

	/**
	 * Return a product by name
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/{name}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<List<ProductDTO>> getProductByName(@PathVariable String ProductName) throws Exception {
		log.info("Listing a product by id");
		return new ResponseEntity<List<ProductDTO>>(this.productService.getProductByName(ProductName), HttpStatus.OK);
	}

	/**
	 * Add a new Product to the database
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@PostMapping("/")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> createProduct(@RequestBody ProductDTO data) {
		try {
			this.productService.addProduct(data);
			return new ResponseEntity<Void>( HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}


	/**
	 * Delete a product by id
	 * 
	 * @param idProduct
	 * @return
	 */
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> deleteProduct(@PathVariable Integer idProduct) {
		try {
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Update the stock of a product
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@PutMapping("/stock/{amount}{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updateStock(@PathVariable Integer id, @PathVariable Integer amount) {
		try {
			this.productService.updateStock(id,amount);
			return new ResponseEntity<Void>( HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	/**
	 * Set the price of a product
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@PutMapping("/price/{amount}{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updatePrice(@PathVariable Integer id, @PathVariable Integer amount) {
		try {
			this.productService.updatePrice(id,amount);
			return new ResponseEntity<Void>( HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}


	/**
	 * Update a product
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updateProduct(@RequestBody ProductDTO data) {
		try {
			this.productService.updateProduct(data);
			return new ResponseEntity<Void>( HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
}
