package com.nearme.services;




import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    @Value("${spring.images.products.path}")
    private String imagesPath;
    @Value("${spring.images.products.max-size}")
    private Integer maxSize;



        
    // // upload multiple images
    // @Transactional
    // public Boolean uploadMultipleImagesProduct(MultipartFile[] files, ProductDTO product) throws IOException {
    //     if (!checkImageFile(files)) {
    //         return false;
    //     }
    //     for (MultipartFile file : files) {
    //         String fileName = StringUtils
    //                 .cleanPath(product.getId_product() + "-" + file.getOriginalFilename());
    //         Path path = Paths.get(fileName);
    //         imageDto.setPath(fileName);
    //         imageDto.setId_reference(product.getId_product());
    //         imageDto.setTable_reference("product");
    //         imageDto.setType("image");
    //         imageEntity = ImageMapper.INSTANCE.dtoToEntity(imageDto);
    //         imageRepository.save(imageEntity);
    //         Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    //         log.info("File " + fileName + " has been saved in the storage and db.");
    //     }
    //     return true;
    // }

    /**
     * Check image file
     * 
     * @param file image file
     * @return boolean
     */
    // private boolean checkImageFile(MultipartFile file) {
    //     String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    //     // getting the extension from file name
    //     String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    //     // todo add more formats
    //     if (!Stream.of("png").anyMatch(x -> x.equals(extension.toLowerCase()))) {
    //         log.error("This extension is not supported.");
    //         return false;
    //     }
    //     if (file.getSize() >= maxSize) {
    //         log.error("This file is too big.");
    //         return false;
    //     }
    //     return true;
    // }

}
