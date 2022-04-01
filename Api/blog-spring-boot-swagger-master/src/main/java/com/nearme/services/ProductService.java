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
		return ProductMapper.INSTANCE.entityToDto(product);
	}
	 
	/**
	 * Gets product by name
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ArrayList<ProductDTO> getProductByName(String productName) {
		List<ProductEntity> products = productRepository.findByName(productName).get();
		return ProductMapper.INSTANCE.mapEntityToDtoList(products);
	}
}
