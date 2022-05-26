package com.nearme.services;

import java.util.List;
import com.nearme.mappers.CategoryMapper;
import com.nearme.models.dto.CategoryDTO;
import com.nearme.models.entities.CategoryEntity;
import com.nearme.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        List<CategoryEntity> categoriesList = categoryRepository.findByRoot(true).get();

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
        List<CategoryEntity> categoriesList = categoryRepository.findByRoot(false).get();
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
        log.info("Category" + category.toString() + " saved successfully");
    }

}