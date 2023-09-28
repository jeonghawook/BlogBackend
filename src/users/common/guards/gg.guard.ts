import { AuthGuard } from '@nestjs/passport';

export class google extends AuthGuard('google') {
    constructor() {
        super();
    }
}
