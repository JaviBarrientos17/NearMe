package com.nearme.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale.Category;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import com.nearme.mappers.ProductMapper;
import com.nearme.models.dto.ProductDTO;
import com.nearme.models.entities.CategoryEntity;
import com.nearme.models.entities.ProductEntity;
import com.nearme.repositories.CategoryRepository;
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
import java.text.SimpleDateFormat;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Value("${spring.images.products.path}")
	private String imagesPath;
	@Value("${spring.images.products.max-size}")
	private Integer maxSize;

	@Autowired
	CategoryRepository categoryRepository;

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

	@Transactional
	public List<ProductDTO> getProductsByIdSupplier(Integer idSupplier) {
		List<ProductEntity> productsList = productRepository.findByIdSupplier(idSupplier).get();
		if (productsList.isEmpty()) {
			log.info("No products found in the database");
			new Exception("No products found");
		}
		return ProductMapper.INSTANCE.mapEntityToDtoList(productsList);
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

	public ProductEntity updateProduct(ProductDTO product) {
		log.warn("Trying to update product" + product.toString());
		try {
			log.info("Trying to update product with id: " + product.toString());
			ProductEntity productEntity = ProductMapper.INSTANCE.dtoToEntity(product);

			log.warn("trying to instance productEntity with id: " + product.toString());
			log.warn(product.toString());

			ProductEntity actualProductEntity = productRepository.findById(product.getIdProduct()).get();

			log.warn("trying to get actual actualProductEntity with id: " + actualProductEntity.toString());
			actualProductEntity = productEntity;

			log.info("trying to save overwrite productEntity");
			productRepository.save(actualProductEntity);
			log.info("Product updated");
			return actualProductEntity;
		} catch (Exception e) {
			log.error("Error updating product");
			new Exception("Error updating product");
		}
		return null;
	}

	/**
	 * 
	 * 
	 * @param file
	 * @return
	 * @throws IOException
	 */
	@Transactional
	public Boolean uploadImage(MultipartFile file, Integer idProduct) throws IOException {

		ProductEntity productEntity = productRepository.findById(idProduct).get();
		;

		if (!checkImageFile(file)) {
			return false;
		}
		// I want a timestamp to name the image
		String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());

		String fileType = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
		String fileName = StringUtils
				.cleanPath(productEntity.getIdProduct() + "-" + productEntity.getName() + "-"
						+ timestamp + "-" + productEntity.getIdSupplier() + "." +
						fileType);

		Path path = Paths.get(imagesPath + fileName);
		productEntity.setImgUrl(fileName);
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

	/**
	 * Filter products by category, neds two params, subcategory must be negative
	 * if you only want to filter by category
	 * 
	 * @param file image file
	 * @return boolean
	 */
	@Transactional
	public ArrayList<ProductDTO> getProductByCategory(Integer idCategory, Integer subCategory) {
		List<ProductEntity> productsCategory = productRepository.findByCategory(idCategory).get();
		List<ProductEntity> productsSubCategory;
		List<ProductEntity> resultProducts;
		if (productsCategory.isEmpty()) {
			log.info("No products found with category: " + idCategory);
			new Exception("No products found with category: " + idCategory);
		}
		log.info("list of products with category:" + idCategory + "found");
		if (subCategory > 0) {
			productsSubCategory = productRepository.findBySubCategory(subCategory).get();

			if (!productsCategory.isEmpty() && !productsSubCategory.isEmpty()) {
				resultProducts = this.intersect(productsCategory, productsSubCategory);
				return ProductMapper.INSTANCE.mapEntityToDtoList(resultProducts);
			}
		}

		return ProductMapper.INSTANCE.mapEntityToDtoList(productsCategory);
	}

	/**
	 * 
	 * Get products by name filter and category
	 * 
	 * @param file image file
	 * @return list
	 */
	@Transactional
	public List<ProductDTO> getProductsBySearch(String SearchString) {
		log.info("Trying to get products by search");
		log.warn("Search string: " + SearchString);
		List<ProductEntity> findedProducts = new ArrayList<>();
		List<ProductEntity> productsList = new ArrayList<>();
		List<CategoryEntity> categoryList = new ArrayList<>();
		try {
			productsList = productRepository.findByNameContaining(SearchString).get();
		} catch (Exception e) {
			log.error("Error getting products by search");
		}
		try {
			categoryList = categoryRepository.findByNameContaining(SearchString).get();

			for (CategoryEntity categoryEntity : categoryList) {
				List<ProductEntity> productsCategory = productRepository.findByCategory(categoryEntity.getIdCategory())
						.get();
				List<ProductEntity> productsSub = productRepository.findBySubCategory(categoryEntity.getIdCategory())
						.get();
				findedProducts.addAll(productsCategory);
				findedProducts.addAll(productsSub);

			}
		} catch (Exception e) {
			log.error("Error getting products by search");
		}

		if (!productsList.isEmpty() && !categoryList.isEmpty()) {
			findedProducts = this.intersect(productsList, findedProducts);
		} else if (!productsList.isEmpty()) {
			findedProducts.addAll(productsList);
		} else {
			log.info("No products found with search: " + SearchString);
			new Exception("No products found with search: " + SearchString);
		}
		findedProducts = findedProducts.stream().distinct().collect(Collectors.toList());
		log.info("list of products with search:" + SearchString + "found");
		return ProductMapper.INSTANCE.mapEntityToDtoList(findedProducts);
	}

	/**
	 * Intersect two lists
	 * 
	 * @param file image file
	 * @return list
	 */
	private List<ProductEntity> intersect(List<ProductEntity> list1, List<ProductEntity> list2) {
		List<ProductEntity> list = new ArrayList<ProductEntity>();

		for (ProductEntity t : list1) {
			// Contains use equals everwrited method in productEntity
			if (list2.contains(t)) {
				list.add(t);
			}
		}

		return list;
	}
}
