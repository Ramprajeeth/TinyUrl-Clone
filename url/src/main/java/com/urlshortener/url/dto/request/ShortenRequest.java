package com.urlshortener.url.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShortenRequest {
    private String username;
    private String longUrl;
}
