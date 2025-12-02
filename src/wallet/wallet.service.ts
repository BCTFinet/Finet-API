import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from '../schema/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private walletModel : Model<WalletDocument>
  ) {}

  async findAll(user_id : Types.ObjectId) : Promise<WalletDocument[] | null> {
    const wallets = this.walletModel.find({ user_id }).exec();

    return wallets;
  }

  async findOne(_id: Types.ObjectId, user_id: Types.ObjectId) : Promise<WalletDocument> {
    try {
      const wallet = await this.walletModel.findOne({ _id, user_id });
  
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }
  
      return wallet;
    }
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createWalletDto: CreateWalletDto, user_id: String) : Promise<WalletDocument> {
    try {
      return this.walletModel.create({
          name : createWalletDto.name,
          balance: createWalletDto.balance,
          user_id : user_id
        });
    }
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: Types.ObjectId, updateWalletDto: UpdateWalletDto, user_id: Types.ObjectId) : Promise<WalletDocument> {
    try {
      const wallet = await this.walletModel.findOneAndUpdate(
        { _id : id, user_id },
        {
          name : updateWalletDto.name
        },
        { new : true }
      ); 
      
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      } 

      return wallet;
    }
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(_id: Types.ObjectId, user_id : Types.ObjectId) : Promise<WalletDocument> {
    try {
      const wallet = await this.walletModel.findOneAndDelete({_id, user_id});

      if (!wallet) {
        throw new NotFoundException('Wallet Not Found');
      }
      return wallet;
    }
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
