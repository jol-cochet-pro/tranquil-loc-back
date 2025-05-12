import { ProSituation, HomeSituation, User } from 'generated/prisma';

export class Occupant {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    homeSituation: HomeSituation;
    proSituation: ProSituation;
    income: number;
    phone: string;
    userId: string;

    constructor(object: any) {
        Object.assign(this, object);
    }
}
