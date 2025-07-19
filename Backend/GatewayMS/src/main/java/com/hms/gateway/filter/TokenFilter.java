package com.hms.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    private static final String SECRET = "9204930917a32235170e9974a77f6170ed85b4b0e89f3ad80b02061210027722823c6592b619e7aa9b93f5a95f73cada42d14d12c60e891a0f49e840332fc624";

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if (path.equals("/api/v1/auth/login") || path.equals("/api/v1/auth/registerUser")) {
                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build());
            }
            HttpHeaders headers = exchange.getRequest().getHeaders();
            if (!headers.containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Authorization Required");
            }
            String authToken = headers.getFirst(HttpHeaders.AUTHORIZATION);
            if (!authToken.startsWith("Bearer ")) {
                throw new RuntimeException("Authorization Header is Invalid");
            }

            String tokenValue = authToken.substring(7);
            try{
                Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(tokenValue).getBody();
                exchange = exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build();
                //exchange.getRequest()
            }
            catch (Exception e){
                throw new RuntimeException("Invalid Token");
            }
            //ServerHttpRequest request = exchange.getRequest();
            return chain.filter(exchange);
        };
    }
    public static class Config{

    }
}
