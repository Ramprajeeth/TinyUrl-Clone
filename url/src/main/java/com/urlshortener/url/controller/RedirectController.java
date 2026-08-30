package com.urlshortener.url.controller;

import com.urlshortener.url.entity.ShortUrl;
import com.urlshortener.url.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/s")
public class RedirectController {

    private static final Logger log = LoggerFactory.getLogger(RedirectController.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectToOriginalUrl(@PathVariable String shortCode){
        log.info("Received redirect request for shortCode: {}", shortCode);
        Query query = new Query(Criteria.where("urls.shortCode").is(shortCode));
        User user = mongoTemplate.findOne(query, User.class);

        if (user != null) {
            log.debug("Found user containing shortCode: {} for user: {}", shortCode, user.getUsername());
            for (ShortUrl url : user.getUrls()) {
                if (url.getShortCode().equals(shortCode)) {
                    log.info("Redirecting shortCode: {} to longUrl: {}", shortCode, url.getLongUrl());
                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(url.getLongUrl()))
                            .build();
                }
            }
        }

        log.warn("Short URL not found for shortCode: {}", shortCode);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Short URL not found");

    }
}
