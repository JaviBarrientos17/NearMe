package com.nearme.services;

import java.util.ArrayList;
import java.util.List;
import com.nearme.mappers.ProductMapper;
import com.nearme.models.dto.ProductDTO;
import com.nearme.models.entities.ProductEntity;
import com.nearme.repositories.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;

	/**
	 * Gets products list
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public List<ProductDTO> getProducts() throws Exception {
		List<ProductEntity> productsList = productRepository.findAll();
		if (productsList.isEmpty()) {
			log.info("No products found in the database");
			new Exception("No products found");
		}
		return ProductMapper.INSTANCE.mapEntityToDtoList(productsList);
	}

	/**
	 * Gets product by id
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ProductDTO getProductById(Integer idProduct) {
		ProductEntity product = productRepository.findById(idProduct).get();
		if (product == null) {
			log.info("No product found with id: " + idProduct);
			new Exception("No product found with id: " + idProduct);
		}
		return ProductMapper.INSTANCE.entityToDto(product);
	}

	/**
	 * Gets product by name
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public List<ProductDTO> getProductByName(String productName) {
		List<ProductEntity> products = productRepository.findByName(productName).get();
		if (products.isEmpty()) {
			log.info("No products found with name: " + productName);
			new Exception("No products found with name: " + productName);
		}
		return ProductMapper.INSTANCE.mapEntityToDtoList(products);
	}

	@Transactional
	public ArrayList<ProductDTO> getProductByCategory(Integer idCategory) {
		List<ProductEntity> products = productRepository.findByCategory(idCategory).get();
		if (products.isEmpty()) {
			log.info("No products found with category id: " + idCategory);
			new Exception("No products found with category id: " + idCategory);
		}
		return ProductMapper.INSTANCE.mapEntityToDtoList(products);
	}

	@Transactional
	public ArrayList<ProductDTO> getProductByStock(Integer stock) {
		List<ProductEntity> products = productRepository.findByStock(stock).get();
		if (products.isEmpty()) {
			log.info("No products found with stock: " + stock);
			new Exception("No products found with stock: " + stock);
		}
		return ProductMapper.INSTANCE.mapEntityToDtoList(products);

	}

	@Transactional
	public ProductDTO addProduct(ProductDTO product) throws Exception {
		log.info("Trying to add " + product.getName() + " to the database");
		try {
			ProductEntity productEntity = ProductMapper.INSTANCE.dtoToEntity(product);
			productRepository.save(productEntity);
			log.info("Product " + product.getName() + " added to the database");
			return product;
		} catch (Exception e) {
			log.error("Error adding product " + product.getName() + " to the database");
			new Exception("Error adding product " + product.getName() + " to the database");
		}
		return product;
	}

	@Transactional
	public void deleteProduct(Integer idProduct) {
		log.info("Trying to delete product with id: " + idProduct);
		try {
			productRepository.deleteById(idProduct);
			log.info("Product with id: " + idProduct + " deleted");
		} catch (Exception e) {
			log.error("Error deleting product with id: " + idProduct);
			new Exception("Error deleting product with id: " + idProduct);
		}
	}

	@Transactional
	public void updateStock(Integer id, Integer amount) {
		log.info("Trying to update stock");
		try {
			ProductDTO product = getProductById(id);
			product.setStock(product.getStock() + amount);
			ProductEntity productEntity = ProductMapper.INSTANCE.dtoToEntity(product);
			productRepository.save(productEntity);

			log.info("Stock updated");
		} catch (Exception e) {
			log.error("Error updating stock");
			new Exception("Error updating stock");
		}
	}

	//i need a function to update the price of a product
	@Transactional
	public void updatePrice(Integer id, Integer price) {
		log.info("Trying to update price");
		try {
			ProductDTO product = getProductById(id);
			product.setPrice(price);
			ProductEntity productEntity = ProductMapper.INSTANCE.dtoToEntity(product);
			productRepository.save(productEntity);

			log.info("Price updated");
		} catch (Exception e) {
			log.error("Error updating price");
			new Exception("Error updating price");
		}
	}

	
	@Transactional
	public ProductDTO updateProduct(ProductDTO product) {
		log.info("Trying to update product");
		try {
			ProductEntity productEntity = ProductMapper.INSTANCE.dtoToEntity(product);
			productRepository.save(productEntity);

			log.info("Product updated");
		} catch (Exception e) {
			log.error("Error updating product");
			new Exception("Error updating product");
		}
	}

}
