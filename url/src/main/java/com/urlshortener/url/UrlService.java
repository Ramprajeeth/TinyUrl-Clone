package com.urlshortener.url;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UrlService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;


    public ShortUrl createShortUrl(String longUrl, String username){
        String shortCode;
        do{
            shortCode = generateShortCode();
        }while(shortCodeExists(shortCode));

        ShortUrl newShortUrl = new ShortUrl(shortCode,longUrl);

        Query query = new Query(Criteria.where("username").is(username));
        Update update = new Update().push("urls",newShortUrl);

        mongoTemplate.updateFirst(query, update,"user_data");

        return newShortUrl;
    }

    private String generateShortCode(){
        return UUID.randomUUID().toString().substring(0,6);
    }

    private boolean shortCodeExists(String shortCode) {
        Query query = new Query();
        query.addCriteria(Criteria.where("urls.shortCode").is(shortCode));

        return mongoTemplate.exists(query, "user_data");
    }

    public void deleteUrl(DeleteUrlRequest request){
        Query query = new Query(Criteria.where("username").is(request.getUsername()));
        Update update = new Update();
        update.pull("urls", new BasicDBObject("shortCode",request.getShortCode()));

        UpdateResult result = mongoTemplate.updateFirst(query,update,User.class);

        if(result.getModifiedCount()==0){
            throw new RuntimeException("Nothing was deleted");
        }

    }

    public List<ShortUrl> viewUrls(String usernameRequest){
        User user = mongoTemplate
                .findOne(new Query(Criteria.where("username").is(usernameRequest)),User.class);
        if(user!=null && user.getUrls()!=null){
            return user.getUrls();
        }

        else{
            return new ArrayList<>();
        }


    }

}
