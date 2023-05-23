package co.libertadores.apigateway.security.service;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.service.IUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final IUserService bogotaUserService;

    private final IUserService medellinUserService;

    private final IUserService caliUserService;

    public UserDetailsServiceImpl(@Qualifier("bogota") IUserService bogotaUserService,
                                  @Qualifier("medellin") IUserService medellinUserService,
                                  @Qualifier("cali") IUserService caliUserService) {
        this.bogotaUserService = bogotaUserService;
        this.medellinUserService = medellinUserService;
        this.caliUserService = caliUserService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = null;
        if (bogotaUserService.existsByEmail(email)) {
            user = bogotaUserService.findByEmail(email);
        } else if (medellinUserService.existsByEmail(email)) {
            user = medellinUserService.findByEmail(email);
        } else if (caliUserService.existsByEmail(email)) {
            user = caliUserService.findByEmail(email);
        }
        return UserDetailsImpl.build(user);
    }
}
