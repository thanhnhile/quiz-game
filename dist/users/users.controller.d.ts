import { UsersService } from './users.service';
import { User } from './user.interface';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(dto: User): Promise<User>;
}
