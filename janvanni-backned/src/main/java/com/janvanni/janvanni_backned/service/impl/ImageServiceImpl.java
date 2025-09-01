package com.janvanni.janvanni_backned.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.janvanni.janvanni_backned.constants.AppConstant;
import com.janvanni.janvanni_backned.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile contactImage, String filename) {
        try {
            byte[] data = new byte[contactImage.getInputStream().available()];
            contactImage.getInputStream().read(data);
            cloudinary.uploader().upload(data, ObjectUtils.asMap(
                    "public_id", filename));

            return this.getUrlFromPublicId(filename);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String getUrlFromPublicId(String publicId) {
        return cloudinary
                .url()
                .transformation(
                        new Transformation<>()
                                .width(AppConstant.CONTACT_IMAGE_WIDTH)
                                .height(AppConstant.CONTACT_IMAGE_HEIGHT)
                                .crop(AppConstant.CONTACT_IMAGE_CROP))
                .generate(publicId);
    }
}
