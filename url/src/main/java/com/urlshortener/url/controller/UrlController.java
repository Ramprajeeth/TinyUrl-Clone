package com.urlshortener.url.controller;


import com.urlshortener.url.dto.request.ShortenRequest;
import com.urlshortener.url.service.UrlService;
import com.urlshortener.url.entity.ShortUrl;
import com.urlshortener.url.dto.request.DeleteUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


@RestController
@RequestMapping("/url")
public class UrlController {

    private static final Logger log = LoggerFactory.getLogger(UrlController.class);

    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<ShortUrl> shortenUrl(@RequestBody ShortenRequest payload){
        String longUrl = payload.getLongUrl();
        String username = payload.getUsername();
        log.info("Received shorten request for user: {}, longUrl: {}", username, longUrl);

        ShortUrl shortUrl = urlService.createShortUrl(longUrl,username);
        log.info("Short URL created: {} for user: {}", shortUrl.getShortCode(), username);

        return  ResponseEntity.status(HttpStatus.CREATED).body(shortUrl);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUrl(@RequestBody DeleteUrlRequest request){
        log.info("Received delete request for shortCode: {} by user: {}", request.getShortCode(), request.getUsername());
        try{
            urlService.deleteUrl(request);
            log.info("Successfully deleted shortCode: {} for user: {}", request.getShortCode(), request.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body("Shortcode Deleted");
        }
        catch(Exception e){
            log.warn("Delete failed for shortCode: {} by user: {}: {}", request.getShortCode(), request.getUsername(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @GetMapping("user-urls/{username}")
    public ResponseEntity<List<ShortUrl>> viewUrls(@PathVariable String username){
        log.info("Received request to view URLs for user: {}", username);
        List<ShortUrl> urls = urlService.viewUrls(username);
        log.info("Returning {} URLs for user: {}", urls.size(), username);
        return ResponseEntity.status(HttpStatus.OK).body(urls);
    }

}
