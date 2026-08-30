package com.urlshortener.url.dto.request;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeleteUrlRequest {
    private String shortCode;
    private String username;

}
