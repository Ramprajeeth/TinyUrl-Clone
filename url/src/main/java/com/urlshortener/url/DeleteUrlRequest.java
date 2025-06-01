package com.urlshortener.url;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeleteUrlRequest {
    private String shortCode;

    private String username;

}
