package com.nearme.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import com.nearme.mappers.CategoryMapper;
import com.nearme.mappers.ProductMapper;
import com.nearme.models.dto.CategoryDTO;
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
public class CategoryServices {

    @Autowired
    CategoryRepository categoryRepository;

    /**
     * Gets Main Categories
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public List<CategoryDTO> getMainCategories() throws Exception {
        List<CategoryEntity> categoriesList = categoryRepository.findByRoot(true);
        if (categoriesList.isEmpty()) {
            log.info("No categories found in the database");
            new Exception("No categories found");
        }
        return CategoryMapper.INSTANCE.mapEntityToDtoList(categoriesList);
    }

    /**
     * Gets Main Categories
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public List<CategoryDTO> getSubCategories() throws Exception {
        List<CategoryEntity> categoriesList = categoryRepository.findByRoot(true);
        if (categoriesList.isEmpty()) {
            log.info("No categories found in the database");
            new Exception("No categories found");
        }
        return CategoryMapper.INSTANCE.mapEntityToDtoList(categoriesList);
    }

    /**
     * Sets A category
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public void setCategory(CategoryDTO category) throws Exception {
        CategoryEntity CatEntity = CategoryMapper.INSTANCE.dtoToEntity(category);
        categoryRepository.save(CatEntity);
        if (CatEntity == null) {
            log.info("No category found with id: " + category.getName());
            new Exception("No category found with id: " + category.getName());
        }
        log.info("Category"+ category.toString() +" saved successfully" );
    }

}