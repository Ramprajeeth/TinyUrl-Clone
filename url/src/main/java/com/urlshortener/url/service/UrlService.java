package com.urlshortener.url.service;

import com.mongodb.BasicDBObject;
import com.mongodb.client.result.UpdateResult;
import com.urlshortener.url.repository.UserRepository;
import com.urlshortener.url.entity.ShortUrl;
import com.urlshortener.url.entity.User;
import com.urlshortener.url.dto.request.DeleteUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UrlService {

    private static final Logger log = LoggerFactory.getLogger(UrlService.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;


    public ShortUrl createShortUrl(String longUrl, String username){
        log.info("Creating short URL for user: {}, longUrl: {}", username, longUrl);
        String shortCode;
        do{
            shortCode = generateShortCode();
        }while(shortCodeExists(shortCode));

        ShortUrl newShortUrl = new ShortUrl(shortCode,longUrl);

        Query query = new Query(Criteria.where("username").is(username));
        Update update = new Update().push("urls",newShortUrl);

        mongoTemplate.updateFirst(query, update,"user_data");
        log.info("Successfully created short URL with code: {} for user: {}", shortCode, username);

        return newShortUrl;
    }

    private String generateShortCode(){
        return UUID.randomUUID().toString().substring(0,6);
    }

    private boolean shortCodeExists(String shortCode) {
        Query query = new Query();
        query.addCriteria(Criteria.where("urls.shortCode").is(shortCode));

        boolean exists = mongoTemplate.exists(query, "user_data");
        log.debug("Checking existence of shortCode {}: {}", shortCode, exists);
        return exists;
    }

    public void deleteUrl(DeleteUrlRequest request){
        log.info("Deleting shortCode: {} for user: {}", request.getShortCode(), request.getUsername());
        Query query = new Query(Criteria.where("username").is(request.getUsername()));
        Update update = new Update();
        update.pull("urls", new BasicDBObject("shortCode",request.getShortCode()));

        UpdateResult result = mongoTemplate.updateFirst(query,update, User.class);

        if(result.getModifiedCount()==0){
            log.warn("Failed to delete shortCode: {} for user: {}. URL not found or already deleted.", request.getShortCode(), request.getUsername());
            throw new RuntimeException("Nothing was deleted");
        }

        log.info("Successfully deleted shortCode: {} for user: {}", request.getShortCode(), request.getUsername());
    }

    public List<ShortUrl> viewUrls(String usernameRequest){
        log.info("Fetching URLs for user: {}", usernameRequest);
        User user = mongoTemplate
                .findOne(new Query(Criteria.where("username").is(usernameRequest)),User.class);
        if(user!=null && user.getUrls()!=null){
            log.debug("Found {} URLs for user: {}", user.getUrls().size(), usernameRequest);
            return user.getUrls();
        }

        else{
            log.warn("User or URLs not found for username: {}", usernameRequest);
            return new ArrayList<>();
        }


    }

}
