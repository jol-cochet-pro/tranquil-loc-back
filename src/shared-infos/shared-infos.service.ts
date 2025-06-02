import { Injectable } from '@nestjs/common';
import { OccupantsService } from 'src/occupants/occupants.service';
import { SharesService } from 'src/shares/shares.service';
import { userContactSchema } from 'src/users/entities/user-contact.entity';
import { UsersService } from 'src/users/users.service';
import { WarrantorsService } from 'src/warrantors/warrantors.service';
import { sharedInfosSchema } from './entities/shared-infos.entity';
import { DocumentsService } from 'src/documents/documents.service';

@Injectable()
export class SharedInfosService {
  constructor(
    private usersService: UsersService,
    private occupantsService: OccupantsService,
    private warrantorsService: WarrantorsService,
    private sharesService: SharesService,
    private documentsService: DocumentsService,
  ) { }

  async findOne(shareId: string) {
    const share = await this.sharesService.findOne(shareId);

    const user = await this.usersService.findOne(share.userId).then((user) => userContactSchema.parse(user));

    const occupants = await this.occupantsService.findAll(user.id);
    const warrantors = await this.warrantorsService.findAll(user.id);

    const zipUrl = await this.documentsService.findOneZip(user.id);

    return sharedInfosSchema.parse({ user: user, occupants: occupants, warrantors: warrantors, zipUrl: zipUrl });
  }
}
