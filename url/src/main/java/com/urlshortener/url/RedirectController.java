package com.urlshortener.url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
@RestController
@RequestMapping("/s")
public class RedirectController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectToOriginalUrl(@PathVariable String shortCode){
        Query query = new Query(Criteria.where("urls.shortCode").is(shortCode));
        User user = mongoTemplate.findOne(query, User.class);

        if (user != null) {

            for (ShortUrl url : user.getUrls()) {
                if (url.getShortCode().equals(shortCode)) {
                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(url.getLongUrl()))
                            .build();
                }
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Short URL not found");

    }
}
