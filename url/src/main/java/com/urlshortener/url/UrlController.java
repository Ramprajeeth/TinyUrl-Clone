package com.urlshortener.url;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/url")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<ShortUrl> shortenUrl(@RequestBody Map<String, String> payload){
        String longUrl = payload.get("longUrl");
        String username = payload.get("username");

        ShortUrl shortUrl = urlService.createShortUrl(longUrl,username);

        return  ResponseEntity.status(HttpStatus.CREATED).body(shortUrl);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUrl(@RequestBody DeleteUrlRequest request){
        try{
            urlService.deleteUrl(request);
            return ResponseEntity.status(HttpStatus.OK).body("Shortcode Deleted");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @GetMapping("user-urls/{username}")
    public ResponseEntity<List<ShortUrl>> viewUrls(@PathVariable String username){
        List<ShortUrl> urls = urlService.viewUrls(username);
        return ResponseEntity.status(HttpStatus.OK).body(urls);
    }




}
