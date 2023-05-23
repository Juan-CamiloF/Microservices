package co.libertadores.apigateway.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    public String secret;

    @Value("${jwt.expiration}")
    public int expiration;

    public final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    public String generateToken(Authentication auth) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        long hours = 24;
        return Jwts.builder().setIssuedAt(new Date()).setSubject(userDetails.getUsername()).setExpiration(new Date(new Date().getTime() + expiration * hours)).signWith(key).claim("authorities", userDetails.getAuthorities()).compact();
    }

    public String getUsernameFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getSubject();

    }

    public boolean validateToken(String token) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Token mal formado {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token no soportado {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token expirado {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Token vacio {}", e.getMessage());
        }
        return false;
    }
}
