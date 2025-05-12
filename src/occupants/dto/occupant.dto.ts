import { ProSituation, HomeSituation } from 'generated/prisma';

export class OccupantDto {
    firstname: string;
    lastname: string;
    email: string;
    homeSituation: HomeSituation;
    proSituation: ProSituation;
    income: number;
    phone: string;

    constructor(object: any) {
        Object.assign(this, object);
    }
}
