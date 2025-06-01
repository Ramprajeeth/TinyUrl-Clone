package com.urlshortener.url;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShortUrl {

    private String shortCode;

    private String longUrl;

}
