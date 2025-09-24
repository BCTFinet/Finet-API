import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { WalletDocument } from 'src/schema/wallet.schema';
import { Types } from 'mongoose';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) : Promise<{ message: string, wallets : WalletDocument[] | null}> {
    const wallets = await this.walletService.findAll(req.user.userId);
    
    return {
      message: "Succesfully Retrieved Wallets",
      wallets
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId, @Req() req)  : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.findOne(id, req.user.userId);
    
    return {
      message: "Succesfully Retrieved Wallet",
      wallet
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto, @Req() req) : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.create(createWalletDto, req.user.userId);

    return {
      message : "Succesfully Created Wallet",
      wallet
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateWalletDto: UpdateWalletDto, @Req() req) : Promise<{ message: string, wallet : WalletDocument}> {
    const wallet = await this.walletService.update(id, updateWalletDto, req.user.userId);

    return {
      message : "Succesfully Updated Wallet",
      wallet
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId, @Req() req) {
    await this.walletService.remove(id, req.user.userId);

    return {
      message : "Succesfully Deleted Wallet"
    }
  }
}
