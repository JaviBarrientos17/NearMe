package com.nearme.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import com.nearme.mappers.ProductMapper;
import com.nearme.models.dto.ProductDTO;
import com.nearme.models.entities.ProductEntity;
import com.nearme.repositories.ProductRepository;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Value("${spring.images.products.path}")
	private String imagesPath;
	@Value("${spring.images.products.max-size}")
	private Integer maxSize;

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

	// i need a function to update the price of a product
	@Transactional
	public void updatePrice(Integer id, Double price) {
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
	public void updateProduct(ProductDTO product) {
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

	/**
	 * Upload profile image
	 * 
	 * @param file
	 * @return
	 * @throws IOException
	 */
	@Transactional
	public Boolean uploadImage(MultipartFile file, Integer idProduct) throws IOException {
		ProductDTO productDTO = getProductById(idProduct);
		ProductEntity productEntity;

		if (!checkImageFile(file)) {
			return false;
		}

		String fileName = StringUtils
				.cleanPath(productDTO.getIdProduct() + "-" + productDTO.getName() + "-" + file.getOriginalFilename());

		Path path = Paths.get(imagesPath + fileName);
		productDTO.setImgUrl(fileName);
		productEntity = ProductMapper.INSTANCE.dtoToEntity(productDTO);
		productRepository.save(productEntity);
		log.info("Product url " + productEntity.getImgUrl() + " has been saved in the db.");
		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		log.info("File " + fileName + " has been saved in the storage and db.");
		log.info("Product url " + productEntity.getImgUrl() + " has been saved in the db.");
		return true;
	}

	/**
	 * Check image file
	 * 
	 * @param file image file
	 * @return boolean
	 */
	private boolean checkImageFile(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		// getting the extension from file name
		String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
		// todo add more formats
		if (!Stream.of("png").anyMatch(x -> x.equals(extension.toLowerCase()))) {
			log.error("This extension is not supported.");
			return false;
		}
		if (file.getSize() >= maxSize) {
			log.error("This file is too big.");
			return false;
		}
		return true;

	}
}
